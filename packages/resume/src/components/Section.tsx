import type { ReactNode } from 'react';
import Link from 'next/link';
import { RiLink as LinkIcon } from 'react-icons/ri';

export type SectionProps = {
  title: string;
  children: ReactNode;
  fill?: boolean;
};

const layoutClass = (fill: boolean) => (fill ? 'fill' : 'columns');

export default function Section({
  title,
  children,
  fill = false,
}: SectionProps) {
  return (
    <section className={layoutClass(fill)}>
      <h2 id={title}>
        <Link href={`#${title}`} passHref>
          <a href="passHref" className="link">
            <span className="icon">
              <LinkIcon />
            </span>
            <span className="text">{title}</span>
          </a>
        </Link>
      </h2>
      <div className="body">{children}</div>
      <style jsx>
        {`
          h2 {
            text-align: center;
            margin-bottom: var(--space);
          }

          .link {
            position: relative;
          }

          .text {
            color: var(--color-primary-1);
          }

          .link .icon {
            position: absolute;
            left: calc(-1 * var(--space));
            top: 0;
            color: var(--color-link);
            display: none;
          }

          .link:hover .icon {
            display: inline;
          }

          @media screen and (min-width: 540px) {
            .columns {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: var(--gap);
            }

            .columns h2 {
              text-align: left;
              grid-column: 1 / 2;
            }

            .columns .link {
              justify-content: left;
            }

            .columns .body {
              grid-column: 2 / 5;
            }
          }
        `}
      </style>
    </section>
  );
}
