import type { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import styles from 'styles/Home.module.scss';

type Props = {
  name: string;
  jobTitle: string;
  children: ReactNode;
  Top?: ReactNode;
};

export default function Layout({ name, children, jobTitle, Top }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{name}&apos;s Résumé</title>
        <meta name="description" content={`${name}'s Resumé`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.top}>
        <Header name={name} jobTitle={jobTitle} />
        {Top && <div className={styles.profile}>{Top}</div>}
      </div>

      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
