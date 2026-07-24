import { site } from '@/config/site';
import type { ConceptStatus } from '@/types/property';
import './ConceptBadge.css';

interface Props {
  status?: ConceptStatus;
  /** Compact variant omits the "Concept Property" prefix. */
  compact?: boolean;
}

/**
 * The honesty marker shown on every property. Status is communicated with an
 * icon + text (never colour alone). Only rendered meaningfully in concept mode.
 */
export function ConceptBadge({ status, compact }: Props) {
  if (!site.isConcept) return null;
  return (
    <span className="concept-badge" title={site.disclaimers.short}>
      <svg className="concept-badge__mark" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 13 L8 3 L14 13 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="5" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span>
        {compact ? 'Concept' : 'Concept Property'}
        {status && !compact ? ` · ${status}` : ''}
      </span>
    </span>
  );
}
