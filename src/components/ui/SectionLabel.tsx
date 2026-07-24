import './SectionLabel.css';

interface Props {
  index?: string;
  children: React.ReactNode;
}

/** Editorial section eyebrow with an optional monospace index and gold rule. */
export function SectionLabel({ index, children }: Props) {
  return (
    <div className="section-label">
      {index && <span className="section-label__no">{index}</span>}
      <span className="section-label__rule" aria-hidden="true" />
      <span className="section-label__text">{children}</span>
    </div>
  );
}
