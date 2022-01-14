import Contact from './Contact';
import {
  BsDownload as DownloadIcon,
  BsEnvelope as EmailIcon,
  BsPrinter as PrinterIcon,
} from 'react-icons/bs';

export default function Header() {
  return (
    <header>
      <section className="title">
        <h1>Peter</h1>
        <h2>Full Stack Javascript Engineer</h2>
      </section>
      <nav>
        <ul>
          <li>
            <Contact href="/" Icon={DownloadIcon}>
              Download
            </Contact>
          </li>
          <li>
            <Contact href="/" Icon={PrinterIcon}>
              Print
            </Contact>
          </li>
          <li>
            <Contact href="/" Icon={EmailIcon}>
              Contact me
            </Contact>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        header {
          padding-block: var(--space-md) 0;
          text-align: center;
        }

        .title > h2 {
          margin-left: -30%;
          margin-right: 5%;
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