import { i18n } from 'next-i18next';

let language: string | undefined;

const locale = {
  setLocale(locale?: string) {
    language = locale;
  },

  getLocale() {
    return language ?? i18n?.language;
  },
};

export default locale;
