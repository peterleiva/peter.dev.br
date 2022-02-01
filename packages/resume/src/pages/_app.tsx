import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import QueryProvider from 'QueryProvider';
import { Analytics, ContactsList, Layout, Section } from 'components';
import 'whatwg-fetch';
import '../styles/globals.scss';
import { Resume } from 'types';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [resume, setResume] = useState<Resume>();

  useEffect(() => {
    setResume(pageProps.resume);
  }, [pageProps]);

  return (
    <React.StrictMode>
      <Analytics />
      <QueryProvider>
        <Layout
          name={resume?.name ?? ''}
          jobTitle={resume?.jobTitle ?? ''}
          Top={
            resume?.bio && (
              <>
                <Section title="Profile" fill>
                  <p>{resume.bio}</p>
                </Section>
                <ContactsList contacts={resume?.contacts ?? []} />
              </>
            )
          }
        >
          <Component {...pageProps} />;
        </Layout>
      </QueryProvider>
    </React.StrictMode>
  );
}

export default MyApp;
