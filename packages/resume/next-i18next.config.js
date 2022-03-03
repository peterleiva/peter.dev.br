const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],

    domains: [
      {
        domain: 'curriculo.peter.dev.br',
        locales: ['en', 'pt'],
        defaultLocale: 'pt',
      },
      {
        domain: 'resume.peter.dev.br',
        locales: ['en', 'pt'],
        defaultLocale: 'en',
      },
    ],

    reloadOnPrerender: process.env.NODE_ENV === 'development',

    localePath: path.resolve('./public/locales'),
  },
};
