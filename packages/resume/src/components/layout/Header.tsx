import NavBar from './NavBar';

type HeaderProps = {
  name: string;
  jobTitle: string;
};

export default function Header({ name, jobTitle }: HeaderProps) {
  return (
    <header className="md:flex flex-nowrap justify-between items-center text-center py-8">
      <section className="title">
        <h1 className="font-semibold text-6xl">{name}</h1>
        <h2 className="rounded bg-neutral-800 text-slate-300 px-4 py-2 font-bold">
          {jobTitle}
        </h2>
      </section>
      <NavBar />

      <style jsx>{`
        .title > h2 {
          margin-left: -20%;
          margin-right: -10%;
        }
      `}</style>
    </header>
  );
}
