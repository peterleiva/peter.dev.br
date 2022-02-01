import NavBar from './NavBar';

type HeaderProps = {
  name: string;
  jobTitle: string;
};

export default function Header({ name, jobTitle }: HeaderProps) {
  return (
    <header>
      <section className="title">
        <h1>{name}</h1>
        <h2>{jobTitle}</h2>
      </section>
      <NavBar />

      <style jsx>{`
        header {
          padding-block: var(--space-md) 0;
          text-align: center;
        }

        .title > h2 {
          margin-left: -20%;
          margin-right: -10%;
        }

        @media screen and (min-width: 866px) {
          header {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
          }
        }

        h2 {
          color: var(--color-white);
          background: var(--color-black);
          border-radius: var(--border-radius);
          padding: var(--space-xs) var(--space);
          font-variant: small-caps;
        }
      `}</style>
    </header>
  );
}
