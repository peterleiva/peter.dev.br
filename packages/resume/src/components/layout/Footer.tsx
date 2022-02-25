import { useTranslation } from 'next-i18next';
import { SiNextdotjs as NextIcon } from 'react-icons/si';
import pkg from '../../../package.json';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-300 flex justify-between mx-8 p-4 items-center">
      <a
        href="https://nextjs.org"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-4"
      >
        {t('footer.built')}
        <NextIcon style={{ color: 'var(--color-black)' }} />
      </a>
      <small>v{pkg.version}</small>
    </footer>
  );
}
