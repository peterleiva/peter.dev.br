import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';

type Props = {
  className?: string;
};

const locales = {
  pt: {
    flag: '🇧🇷',
  },
  en: {
    flag: '🇺🇸',
  },
};

type LangCode = keyof typeof locales;

export default function LanguageSwitcher({ className }: Props) {
  const { i18n } = useTranslation('common', {});
  const { pathname } = useRouter();

  return (
    <ul className={clsx(className, 'flex flex-row flex-nowrap gap-4')}>
      {Object.keys(locales).map(lang => (
        <li key={lang}>
          <Link href={pathname} locale={lang} passHref>
            <a
              href="dummy"
              className={clsx('flex flex-col gap-2 items-center', {
                'border-b-2 border-red-500': i18n.language === lang,
              })}
            >
              {locales[lang as LangCode].flag}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
