import type { ReactNode } from 'react';

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
      <h2>{title}</h2>
      <div className="body">{children}</div>
      <style jsx>
        {`
          h2 {
            text-align: center;
          }

          .fill > .body {
            text-align: justify;
          }

          section {
            display: flex;
            flex-flow: column;
            gap: var(--space);
          }

          @media screen and (min-width: 560px) {
            .columns {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: var(--gap);
            }

            .columns h2 {
              text-align: left;
              grid-column: 1 / 2;
            }

            .columns div {
              grid-column: 2 / 5;
            }
          }
        `}
      </style>
    </section>
  );
}
