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
      <h2 id={title} className="text-center mb-8 text-2xl font-semibold">
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
          .link {
            position: relative;
          }

          .text {
            position: relative;
            color: var(--color-primary-1);
          }

          .text::after {
            content: '';
            border-radius: var(--border-radius);
            background-color: var(--color-primary-1);
            height: 2px;
            width: 34px;
            position: absolute;
            bottom: -2px;
            left: -14px;
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
              grid-template-columns: minmax(145px, 1fr) repeat(3, 1fr);
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
