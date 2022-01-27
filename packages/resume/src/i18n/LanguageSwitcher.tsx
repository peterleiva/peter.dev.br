import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

type Props = {
  className?: string;
  onSwitch?: (lang: string) => void;
};

const activated = (value: boolean) => (value ? 'activated' : '');

function LanguageSwitcher({ className, onSwitch }: Props) {
  const { i18n, t } = useTranslation();
  const { locales, locale } = useRouter();
  const [language, switcher] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (locale) {
      switcher(locale);
      onSwitch?.(locale);
    }
  }, [locale, onSwitch]);

  if (!locales) return null;

  return (
    <div className={className}>
      {locales.map(lng => (
        <Link key={lng} href="/" locale={lng} passHref>
          <a className={activated(lng === language)}>{t('emoji', { lng })}</a>
        </Link>
      ))}

      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: row;
            gap: var(--space);
            float: right;
          }

          a {
            position: relative;
          }

          a.activated::after {
            content: '⦿';
            color: var(--color-primary-1);
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

export default LanguageSwitcher;
