/**
 * Cloudflare Worker serving the static site plus two small API routes:
 *
 *  - /auth, /callback   GitHub OAuth proxy for the CMS at /admin. Replaces
 *    Netlify Identity + Git Gateway with a direct GitHub OAuth login,
 *    following the standard Decap/Sveltia CMS "github" backend OAuth
 *    handshake (popup window, postMessage back to the opener).
 *  - /api/contact       Receives the contact form submission and sends it
 *    on via Brevo's transactional email API.
 *
 * Everything else falls through to the built static site (env.ASSETS).
 */

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** The popup page: waits for the CMS window's handshake, then posts the result. */
function renderCallbackHtml(resultMessage) {
  return `<!doctype html>
<html>
<body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(
      ${JSON.stringify(resultMessage)},
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`;
}

async function handleAuth(request, env) {
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/callback`;
  const state = crypto.randomUUID();

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  const headers = new Headers({ Location: authorizeUrl.toString() });
  headers.append(
    'Set-Cookie',
    `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  );
  return new Response(null, { status: 302, headers });
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = getCookie(request, 'oauth_state');

  const fail = (message) =>
    new Response(renderCallbackHtml(`authorization:github:error:${JSON.stringify({ message })}`), {
      headers: { 'Content-Type': 'text/html' },
    });

  if (!code || !state || state !== cookieState) {
    return fail('Invalid or missing OAuth state — please try logging in again.');
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });
  const tokenData = await tokenRes.json();

  if (!tokenRes.ok || tokenData.error || !tokenData.access_token) {
    return fail(tokenData.error_description || 'GitHub did not return an access token.');
  }

  const html = renderCallbackHtml(
    `authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}`,
  );
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}

async function handleContact(request, env) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

    const rows = Object.entries(data)
      .filter(([key]) => key !== 'form-name')
      .map(([key, value]) => `<strong>${key}:</strong> ${String(value).replace(/</g, '&lt;')}`)
      .join('<br/>');

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Pala Homes website', email: env.BREVO_SENDER_EMAIL },
        to: [{ email: env.CONTACT_TO_EMAIL }],
        ...(data.email ? { replyTo: { email: String(data.email), name: String(data.name || '') } } : {}),
        subject: `New enquiry from ${data.name || 'a website visitor'}`,
        htmlContent: `<div>${rows}</div>`,
      }),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      return new Response(JSON.stringify({ ok: false, error: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') return handleAuth(request, env);
    if (url.pathname === '/callback') return handleCallback(request, env);
    if (url.pathname === '/api/contact' && request.method === 'POST') return handleContact(request, env);

    return env.ASSETS.fetch(request);
  },
};
