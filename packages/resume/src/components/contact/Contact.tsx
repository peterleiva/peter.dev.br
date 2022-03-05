import Link from 'next/link';
import React from 'react';
import { FiExternalLink as ExternalLink } from 'react-icons/fi';
import { iconLoader, LibIcon } from 'lib/icon-loader';

type ContactProps = {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  as?: 'button' | 'a';
  label?: string;
  icon?: { lib?: LibIcon; name?: string };
  hideIcon?: boolean;
  className?: string;
};

export default function Contact({
  children,
  href,
  label,
  icon,
  hideIcon = false,
  as: Component = 'a',
  external = false,
  className,
}: ContactProps) {
  const DynamicIcon = iconLoader(icon);

  return (
    <div className={className}>
      {label && <p className="label print:hidden">{label}</p>}
      <div className="container">
        {!hideIcon && <DynamicIcon />}
        <Link href={href} passHref>
          <Component target="_blank" className="body">
            <span className="text-slate-200 gap-4">
              {children}
              {external && <ExternalLink className="print:hidden" />}
            </span>
          </Component>
        </Link>
      </div>

      <style jsx>{`
        .label {
          font-weight: var(--weight-bolder);
          font-style: normal;
        }

        .container,
        .body,
        .body span {
          display: flex;
          color: inherit;
          flex: row nowrap;
          gap: var(--space-sm);
          align-items: center;
          justify-content: flex-start;
        }

        @media screen and (min-width: 500px) {
          .body,
          .body span {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
