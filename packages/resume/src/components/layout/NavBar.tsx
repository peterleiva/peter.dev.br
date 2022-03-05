import Link from 'next/link';
import IconLabel from '../IconLabel';
import {
  BsEnvelope as MailIcon,
  BsPrinter as PrinterIcon,
  BsDownload as DownloadIcon,
} from 'react-icons/bs';
import { useTranslation } from 'next-i18next';

export default function NavBar(props: JSX.IntrinsicElements['nav']) {
  const { t } = useTranslation('nav');

  return (
    <nav className="print:hidden" {...props}>
      <ul className="flex flex-row flex-nowrap justify-evenly mt-6 list-none gap-8 p-0 my-4">
        <li>
          <IconLabel Icon={DownloadIcon} iconColor="var(--color-secondary)">
            <a href="/Currículo de Peter.pdf" download>
              {t('download')}
            </a>
          </IconLabel>
        </li>
        <li>
          <IconLabel Icon={PrinterIcon} iconColor="var(--color-secondary)">
            <button onClick={() => window?.print()}>{t('print')}</button>
          </IconLabel>
        </li>
        <li>
          <IconLabel Icon={MailIcon} iconColor="var(--color-secondary)">
            <Link href="/contact" passHref>
              <a href="dummy">{t('contact_me')}</a>
            </Link>
          </IconLabel>
        </li>
      </ul>

      <style jsx>{`
        @media screen and (max-width: 470px) {
          nav ul {
            display: flex;
            flex-flow: column;
            align-items: center;
          }
        }

        nav ul li,
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
