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
      <nav>
        <ul></ul>
      </nav>

      <style jsx>{`
        header {
          padding-block: var(--space-md) 0;
          text-align: center;
        }

        .title > h2 {
          margin-left: -20%;
          margin-right: -10%;
        }

        @media print {
          nav {
            display: none;
          }
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

        nav ul {
          display: flex;

          flex-wrap: row nowrap;
          margin: var(--space) 0;
          justify-content: space-evenly;
          gap: var(--space-md);

          list-style: none;
          padding: 0;
        }

        @media screen and (max-width: 470px) {
          nav ul {
            display: flex;
            flex-flow: column;
            align-items: center;
          }
        }

        nav ul li {
          position: relative;
        }

        nav ul li::after {
          content: '';
          display: block;
          border: 2px solid black;
          position: absolute;
          left: 50%;
          bottom: -10%;
          width: var(--space);
          border-radius: 2px;
        }
      `}</style>
    </header>
  );
}
