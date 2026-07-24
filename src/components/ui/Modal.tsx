import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import './Modal.css';

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  /** Extra class for the panel. */
  panelClass?: string;
}

/** Accessible dialog: portal, focus trap, Escape-to-close, body scroll lock. */
export function Modal({ open, onClose, label, children, panelClass = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className={`modal__panel ${panelClass}`} role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
