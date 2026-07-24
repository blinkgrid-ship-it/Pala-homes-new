/**
 * Central site configuration.
 *
 * `siteMode` is the master switch. In "concept" mode the UI:
 *  - shows Concept-Property labels and the visualisation disclaimer,
 *  - hides MLS fields and any active-listing claims,
 *  - labels prices as illustrative ranges and specs as concept specifications,
 *  - prevents property structured-data (schema.org) from being emitted.
 *
 * Switch to "live" only once verified listings, imagery and licence details
 * are supplied (see CONTENT_REQUIRED.md).
 */
export type SiteMode = 'concept' | 'live';

export const site = {
  mode: 'concept' as SiteMode,

  /** Convenience derived flags — read these in components. */
  get isConcept() {
    return this.mode === 'concept';
  },

  disclaimers: {
    short: 'Architectural visualisation — not an active listing.',
    full:
      'These original architectural visualisations and specifications are presented for design demonstration only. They do not represent active property listings.',
    quickView:
      'This is an original architectural concept used to demonstrate the Pala Homes experience. It is not an active property listing.',
    render:
      'Imagery combines representative reference photography of other real architecture with original vector visualisations. It illustrates the mood of each concept and does not depict a specific real property.',
  },

  /** Feature flags for motion-heavy behaviours. */
  features: {
    autoPreview: true,
    magneticButtons: true,
    grain: true,
  },
} as const;
