import Link from 'next/link';
import IconLabel from '../IconLabel';
import { BsEnvelope as MailIcon } from 'react-icons/bs';
import { BiHomeAlt as HomeIcon } from 'react-icons/bi';
import { useTranslation } from 'next-i18next';

export default function NavBar(props: JSX.IntrinsicElements['nav']) {
  const { t } = useTranslation('nav');

  return (
    <nav {...props}>
      <ul>
        <li>
          <IconLabel Icon={HomeIcon} color="var(--color-secondary)">
            <Link href="/" passHref>
              <a href="dummy">{t('home')}</a>
            </Link>
          </IconLabel>
        </li>
        <li>
          <IconLabel Icon={MailIcon} color="var(--color-secondary)">
            <Link href="/contact" passHref>
              <a href="dummy">{t('contact_me')}</a>
            </Link>
          </IconLabel>
        </li>
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

        nav ul a {
          color: var(--color-black);
          font-weight: var(--weight-bold);
        }

        nav ul li {
          position: relative;
        }

        nav ul li::after {
          content: '';
          display: block;
          border: 2px solid var(--color-secondary);
          background-color: var(--color-secondary);
          position: absolute;
          right: calc(50% - var(--space));
          bottom: 0;
          width: var(--space);
          border-radius: 2px;
        }
      `}</style>
    </nav>
  );
}
