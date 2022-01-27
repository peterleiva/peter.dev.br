import type { AppProps } from 'next/app';
import React from 'react';
import QueryProvider from 'QueryProvider';
import { Analytics } from 'components';
import { appWithTranslation } from 'next-i18next';
import 'whatwg-fetch';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <React.StrictMode>
      <Analytics />
      <QueryProvider>
        <Component {...pageProps} />;
      </QueryProvider>
    </React.StrictMode>
  );
};

export default appWithTranslation(MyApp);
