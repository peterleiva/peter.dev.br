/** @type {@import("next-i18next").UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    reloadOnPrerender: true,

    domains: [
      {
        domain: 'resume.peter.dev.br',
        defaultLocale: 'en',
      },
      {
        domain: 'curriculo.peter.dev.br',
        defaultLocale: 'pt',
      },
    ],
  },
};
