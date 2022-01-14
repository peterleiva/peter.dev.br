import Link from 'next/link';
import React from 'react';
import type { IconType } from 'react-icons';
import { FiExternalLink as ExternalLink } from 'react-icons/fi';
import IconLabel from './IconLabel';

type ContactProps = {
  Icon: IconType;
  children: React.ReactNode;
  href: string;
  external?: boolean;
};

export default function Contact({
  Icon,
  children,
  href,
  external = false,
}: ContactProps) {
  return (
    <Link href={href} passHref>
      <a>
        <IconLabel Icon={Icon}>{children}</IconLabel>
        {external && <ExternalLink />}

        <style jsx>{`
          a {
            display: flex;
            flex: row nowrap;
            gap: var(--space-sm);
            align-items: center;
          }
        `}</style>
      </a>
    </Link>
  );
}
