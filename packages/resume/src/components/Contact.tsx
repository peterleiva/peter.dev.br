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
  icon?: { lib: LibIcon; name: string };
  hideIcon?: boolean;
};

export default function Contact({
  children,
  href,
  label,
  icon,
  hideIcon = false,
  as: Component = 'a',
  external = false,
}: ContactProps) {
  const DynamicIcon = iconLoader(icon);

  return (
    <div>
      {label && <p className="label">{label}</p>}
      <div className="container">
        {!hideIcon && <DynamicIcon />}
        <Link href={href} passHref>
          <Component target="_blank" className="body">
            <span>
              {children}
              {external && <ExternalLink />}
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

        .body span {
          color: var(--color-link);
          gap: var(--space-xs);
        }
      `}</style>
    </div>
  );
}
