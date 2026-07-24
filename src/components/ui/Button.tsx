import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type Variant = 'primary' | 'ghost' | 'quiet';
type Common = { variant?: Variant; children: ReactNode; className?: string };

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AsAnchor = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

export function Button(props: AsButton | AsAnchor) {
  const { variant = 'primary', className = '', children } = props;
  const cls = `btn btn--${variant} ${className}`.trim();

  if (props.as === 'a') {
    const { as: _as, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={cls} {...rest}>
        {children}
      </a>
    );
  }
  const { as: _as, variant: _v, className: _c, children: _ch, ...rest } = props as AsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
