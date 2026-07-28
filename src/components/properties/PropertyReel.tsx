import type { Property } from '@/types/property';
import { properties } from '@/content/loader';
import { PropertyScene } from './PropertyScene';

interface Props {
  onExploreAngles: (p: Property) => void;
  onStepInside: (p: Property, index: number) => void;
  onDiscuss: (p: Property) => void;
}

/** The cinematic collection: stacked full-height scenes. */
export function PropertyReel({ onExploreAngles, onStepInside, onDiscuss }: Props) {
  return (
    <section id="collection" aria-label="Concept property collection">
      {properties.map((p) => (
        <PropertyScene
          key={p.id}
          property={p}
          onExploreAngles={onExploreAngles}
          onStepInside={onStepInside}
          onDiscuss={onDiscuss}
        />
      ))}
    </section>
  );
}
