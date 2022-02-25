module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],

    domains: [
      {
        domain: 'curriculo.peter.dev.br',
        defaultLocale: 'pt',
      },
    ],

    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};
