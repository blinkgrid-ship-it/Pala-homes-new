import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArchScene } from '@/components/ui/ArchScene';
import { conceptProperties } from '@/data/conceptProperties';
import { business, whatsappLink } from '@/config/business';
import { site } from '@/config/site';
import './ContactSection.css';

export interface ContactPrefill {
  area?: string;
  message?: string;
}

interface Props {
  /** External prefill (e.g. from a "discuss similar property" action). */
  prefill?: ContactPrefill;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const AREAS = ['Miami', 'Fort Lauderdale', 'Orlando', 'Palm Beach', 'Tampa', 'Jacksonville', 'Not sure yet'];
const USES = ['Primary residence', 'Holiday home', 'Investment', 'New construction', 'Exploring options'];
const TYPES = ['Condo / apartment', 'Single-family', 'Waterfront villa', 'Estate', 'Open to options'];

export function ContactSection({ prefill }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [area, setArea] = useState('');
  const [message, setMessage] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  // Apply external prefill and bring the section into focus.
  useEffect(() => {
    if (!prefill) return;
    if (prefill.area) setArea(prefill.area);
    if (prefill.message) setMessage(prefill.message);
    setStatus('idle');
  }, [prefill]);

  const validate = (data: FormData): Record<string, string> => {
    const e: Record<string, string> = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const consent = data.get('consent');
    if (name.length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';
    if (!consent) e.consent = 'Please confirm you consent to be contacted.';
    return e;
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const firstField = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      firstField?.focus();
      return;
    }
    // INTEGRATION POINT: no backend is configured. Wire this to a form provider
    // or API endpoint (see README "Form integration"). We do NOT claim delivery.
    setStatus('loading');
    window.setTimeout(() => setStatus('success'), 900);
  };

  const closingHero = conceptProperties[1];

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true">
        <ArchScene property={closingHero} view={{ render: 'evening', time: 'evening' }} className="arch-scene" />
      </div>
      <div className="contact__scrim" />

      <div className="shell contact__inner">
        <div className="contact__lead">
          <p className="eyebrow">Start the conversation</p>
          <h2 id="contact-title" className="contact__title">
            Your Florida property journey starts with one conversation.
          </h2>
          <p className="contact__sub">
            Tell us what you are looking for. Pala Homes will help you understand the next step.
          </p>
          <p className="contact__mal font-mal">{business.taglineMalayalam}.</p>

          <div className="contact__direct">
            <a href={business.contact.phoneHref} className="contact__direct-item">
              <span>Call</span>
              <strong>{business.contact.phoneDisplay}</strong>
            </a>
            <a href={`mailto:${business.contact.email}`} className="contact__direct-item">
              <span>Email</span>
              <strong>{business.contact.email}</strong>
            </a>
            <a
              href={whatsappLink(`Hi ${business.name}, I'd like to talk about a Florida property.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__direct-item"
            >
              <span>WhatsApp</span>
              <strong>Message us →</strong>
            </a>
          </div>
          {business.isPlaceholder && (
            <p className="contact__placeholder-note">
              Contact details shown are placeholders for this concept demonstration.
            </p>
          )}
        </div>

        <div className="contact__form-wrap">
          {status === 'success' ? (
            <div className="contact__success" role="status">
              <div className="contact__success-mark" aria-hidden="true">✓</div>
              <h3>Thank you.</h3>
              <p>
                Your enquiry is ready. As soon as a form backend is connected, messages will reach
                the Pala Homes team directly. For now, please reach us on WhatsApp or email above.
              </p>
              <button className="contact__reset" onClick={() => setStatus('idle')}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="contact__row">
                <Field label="Name" name="name" error={errors.name}>
                  <input ref={nameRef} id="name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} required />
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} required />
                </Field>
              </div>
              <div className="contact__row">
                <Field label="Phone" name="phone">
                  <input id="phone" name="phone" type="tel" autoComplete="tel" />
                </Field>
                <Field label="Preferred Florida area" name="area">
                  <select id="area" name="area" value={area} onChange={(e) => setArea(e.target.value)}>
                    <option value="">Select…</option>
                    {AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="contact__row">
                <Field label="Property type" name="type">
                  <select id="type" name="type" defaultValue="">
                    <option value="">Select…</option>
                    {TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Intended use" name="use">
                  <select id="use" name="use" defaultValue="">
                    <option value="">Select…</option>
                    {USES.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="contact__row">
                <Field label="Approximate budget" name="budget">
                  <input id="budget" name="budget" type="text" inputMode="numeric" placeholder="e.g. $2M–$3M" />
                </Field>
              </div>
              <Field label="Message" name="message">
                <textarea id="message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you looking for?" />
              </Field>

              <label className="contact__check">
                <input type="checkbox" name="whatsapp" value="yes" />
                <span>I'd prefer to be contacted on WhatsApp.</span>
              </label>

              <label className={`contact__check ${errors.consent ? 'has-error' : ''}`}>
                <input type="checkbox" name="consent" value="yes" aria-invalid={!!errors.consent} />
                <span>
                  I consent to Pala Homes contacting me about my enquiry.
                  {errors.consent && <em className="contact__err"> {errors.consent}</em>}
                </span>
              </label>

              <button type="submit" className="contact__submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Book a consultation →'}
              </button>

              <p className="contact__form-note">
                This form is a front-end demonstration. No message is transmitted until a backend is
                configured.
              </p>
            </form>
          )}
        </div>
      </div>

      {site.isConcept && <p className="contact__disclaimer shell">{site.disclaimers.full}</p>}
    </section>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && (
        <span className="field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
