import type { AppProps } from 'next/app';
import React from 'react';
import { Analytics } from 'components';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <React.StrictMode>
      <Analytics />
      <Component {...pageProps} />;
    </React.StrictMode>
  );
}

export default MyApp;
