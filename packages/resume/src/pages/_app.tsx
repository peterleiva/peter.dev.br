import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { Resume } from 'types';
import QueryProvider from 'QueryProvider';
import { Analytics, ContactsList, Layout, Section } from 'components';
import 'whatwg-fetch';
import '../styles/globals.scss';

type Props = AppProps<{
  resume?: { name: string; jobTitle: string; bio: string };
}>;

function MyApp({ Component, pageProps }: Props): JSX.Element {
  const [resume, setResume] = useState<Resume>();
  const { t } = useTranslation();

  useEffect(() => {
    setResume(pageProps.resume);
  }, [pageProps]);

  return (
    <React.StrictMode>
      <Analytics />
      <QueryProvider>
        <Layout
          name={resume?.name ?? ''}
          jobTitle={t('job')}
          Top={
            resume?.bio && (
              <>
                <Section
                  title={t('sections.profile')}
                  className="print:hidden"
                  fill
                >
                  <p className="text-justify">{resume.bio}</p>
                </Section>
                <ContactsList contacts={resume?.contacts ?? []} />
              </>
            )
          }
        >
          <Component {...pageProps} />
        </Layout>
      </QueryProvider>
    </React.StrictMode>
  );
}

export default appWithTranslation(MyApp);
