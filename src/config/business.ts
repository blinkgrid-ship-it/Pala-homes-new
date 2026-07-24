/**
 * Business / brand configuration.
 *
 * Contact values are PLACEHOLDERS. They must be replaced with verified details
 * before any public launch — see CONTENT_REQUIRED.md. Placeholders are marked
 * `isPlaceholder: true` so the UI can flag them and avoid implying they are real.
 */
export const business = {
  name: 'Pala Homes',
  tagline: 'Your Florida Team',
  taglineMalayalam: 'നിങ്ങളുടെ ഫ്ലോറിഡ ടീം',
  brandLineMalayalam: 'പാല ഹോംസ്',
  mission:
    'Original Florida living concepts, presented with local insight and personal care.',

  /** All contact details below are placeholders pending verification. */
  isPlaceholder: true,
  contact: {
    email: 'hello@palahomes.example',
    phoneDisplay: '+1 (000) 000‑0000',
    phoneHref: 'tel:+10000000000',
    /** Digits only, international format, no "+" — for wa.me links. */
    whatsapp: '10000000000',
  },

  regions: ['South Florida', 'Orlando'],

  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  },
} as const;

/** Build a WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${business.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
