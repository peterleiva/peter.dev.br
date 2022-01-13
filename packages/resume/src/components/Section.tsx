import type { ReactNode } from 'react';

export type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h1>{title}</h1>
      <div>{children}</div>

      <style jsx>{``}</style>
    </section>
  );
}
