import Link from 'next/link';
import { RiLink as LinkIcon } from 'react-icons/ri';
import clsx from 'clsx';

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  fill?: boolean;
  className?: string;
};

const layoutClass = (fill: boolean) => (fill ? 'fill' : 'columns');

export default function Section({
  title,
  children,
  className,
  fill = false,
}: SectionProps) {
  return (
    <section className={clsx(layoutClass(fill), className)}>
      <h2
        id={encodeURI(title)}
        className="title text-center mb-8 font-semibold"
      >
        <Link href={`#${encodeURI(title)}`} passHref>
          <a href="passHref" className="link relative">
            <span className="icon">
              <LinkIcon />
            </span>
            <span className="text relative text-slate-800">{title}</span>
          </a>
        </Link>
      </h2>
      <div className="body">{children}</div>
      <style jsx>
        {`
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

          @media print, screen and (min-width: 540px) {
            .columns {
              display: grid;
              grid-template-columns: minmax(145px, 1fr) repeat(3, 1fr);
              gap: var(--space);
            }

            .columns .title {
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
