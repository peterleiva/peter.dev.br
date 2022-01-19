import type { AppProps } from 'next/app';
import React from 'react';
import Analytics from 'lib/Analytics';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Analytics />
      <Component {...pageProps} />;
    </React.StrictMode>
  );
}

export default MyApp;
