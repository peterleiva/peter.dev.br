import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import Analytics from 'src/lib/Analytics';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Analytics />
      <Component {...pageProps} />;
    </React.StrictMode>
  );
}

export default MyApp;
