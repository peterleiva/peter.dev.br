import { join } from 'ramda';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  onSwitch?: (lang: Language) => void;
};

type Language = {
  nativeName: string;
  emoji: string;
};

const langs: { [lang: string]: Language } = {
  en: { nativeName: 'English', emoji: '🇺🇸' },
  pt: { nativeName: 'Português', emoji: '🇧🇷' },
};

const activated = (value: boolean) => (value ? 'activated' : '');

function LanguageSwitcher({ className, onSwitch }: Props) {
  const { i18n } = useTranslation();
  const [language, switcher] = useState(i18n.resolvedLanguage);

  const handleSwitch = (lang: string) => {
    i18n.changeLanguage(lang);
    switcher(lang);
    onSwitch?.(langs[lang]);
  };

  return (
    <div className={className}>
      {Object.keys(langs).map(lang => (
        <button
          key={lang}
          className={join(' ', ['reset-button', activated(lang === language)])}
          onClick={() => handleSwitch(lang)}
        >
          {langs[lang].emoji}
        </button>
      ))}

      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: row;
            gap: var(--space);
            float: right;
          }

          button {
            position: relative;
          }

          button.activated::after {
            content: '⦿';
            height: 3px;
            width: var(--space-sm);
            color: var(--color-black);
            position: absolute;
            bottom: 0;
            right: 0;
          }
        `}
      </style>
    </div>
  );
}

export default LanguageSwitcher;
