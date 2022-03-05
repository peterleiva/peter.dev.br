import Link from 'next/link';
import NavBar from './NavBar';

type HeaderProps = {
  name: string;
  jobTitle: string;
};

export default function Header({ name, jobTitle }: HeaderProps) {
  return (
    <header className="md:flex flex-nowrap gap-6 justify-between items-center text-center py-8">
      <section className="title">
        <Link href="/" passHref>
          <a href="dummy">
            <h1 className="font-semibold text-6xl text-slate-800">{name}</h1>
            <h2 className="rounded h3 bg-slate-800 text-stone-50 px-4 py-2 font-bold">
              {jobTitle}
            </h2>
          </a>
        </Link>
      </section>
      <NavBar className="place-self-start print:hidden" />

      <style jsx>{`
        .title h2 {
          margin-left: -20%;
          margin-right: -10%;
        }
      `}</style>
    </header>
  );
}
