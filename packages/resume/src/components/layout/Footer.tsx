import { SiNextdotjs as NextIcon } from 'react-icons/si';
import pkg from '../../../package.json';

export default function Footer() {
  return (
    <footer>
      <a
        href="https://nextjs.org"
        target="_blank"
        rel="noreferrer"
        className="built"
      >
        built with
        <NextIcon style={{ color: 'var(--color-black)' }} />
      </a>
      <small>v{pkg.version}</small>

      <style jsx>{`
        footer {
          border-top: 1px solid var(--color-gray-79);
          display: flex;
          justify-content: space-between;
          flex-flow: row wrap;
          margin: 0 var(--space);
          padding: var(--space-sm);
          align-items: center;
        }

        footer > .built {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
      `}</style>
    </footer>
  );
}
