const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'en',
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

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(config, sentryWebpackPluginOptions);
