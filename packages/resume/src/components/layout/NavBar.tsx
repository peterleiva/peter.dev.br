import Link from 'next/link';
import nav from './navigation.json';

export default function NavBar() {
  return (
    <nav>
      <ul>
        {nav.map(({ name, to }) => (
          <li key={name}>
            <Link href={to} passHref>
              <a href="dummy">{name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @media print {
          nav {
            display: none;
          }
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
    </nav>
  );
}
