import type { Property } from '@/types/property';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PropertyAngleViewer } from './PropertyAngleViewer';
import { ConceptBadge } from './ConceptBadge';
import { site } from '@/config/site';
import { business, whatsappLink } from '@/config/business';
import { formatRange } from '@/content/loader';
import './PropertyQuickView.css';

interface Props {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  onOpenGallery: (p: Property, index: number) => void;
  onDiscuss: (p: Property) => void;
}

/** Refined quick-view: multi-angle viewer + concept detail panel. */
export function PropertyQuickView({ property, open, onClose, onOpenGallery, onDiscuss }: Props) {
  if (!property) return null;

  return (
    <Modal open={open} onClose={onClose} label={`${property.name} details`} panelClass="quickview">
      <button className="quickview__close" onClick={onClose} aria-label="Close details">
        ✕
      </button>
      <div className="quickview__grid">
        <div className="quickview__media">
          <PropertyAngleViewer
            property={property}
            autoPreview={false}
            onOpenGallery={(i) => onOpenGallery(property, i)}
          />
        </div>

        <div className="quickview__info">
          <ConceptBadge status={property.status} />
          <h2 className="quickview__name">{property.name}</h2>
          <p className="quickview__loc">{property.location}</p>

          <div className="quickview__range">
            <span className="quickview__range-k">{site.isConcept ? 'Illustrative range' : 'Price'}</span>
            <span className="quickview__range-v">{formatRange(property.priceRange.low, property.priceRange.high)}</span>
          </div>

          <dl className="quickview__specs">
            <div><dt>Beds</dt><dd>{property.specs.beds}</dd></div>
            <div><dt>Baths</dt><dd>{property.specs.baths}</dd></div>
            <div><dt>Approx.</dt><dd>{property.specs.sqft.toLocaleString()} sqft</dd></div>
          </dl>

          <p className="quickview__narrative">{property.narrative}</p>

          <div className="quickview__block">
            <h3 className="quickview__h3">Material palette</h3>
            <ul className="quickview__chips">
              {property.materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="quickview__block">
            <h3 className="quickview__h3">Key features</h3>
            <ul className="quickview__features">
              {property.specs.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="quickview__actions">
            <Button variant="primary" onClick={() => onOpenGallery(property, 0)}>
              Open full gallery →
            </Button>
            <Button variant="ghost" onClick={() => onDiscuss(property)}>
              Discuss a similar property
            </Button>
            <Button
              as="a"
              variant="quiet"
              href={whatsappLink(`Hi ${business.name}, I'd like to discuss a property similar to the ${property.name} concept.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp enquiry
            </Button>
          </div>

          {site.isConcept && (
            <p className="quickview__note">
              <strong>Concept note.</strong> {site.disclaimers.quickView}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
