import type { ReactNode } from 'react';

export type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>

      <style jsx>{`
        section {
          margin-block: var(--space-xl);
        }
      `}</style>
    </section>
  );
}
