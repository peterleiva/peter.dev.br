import type { Job } from 'types';
import Experience from './Experience';

type TimelineProps = {
  jobs: Job[];
};

export default function Timeline({ jobs }: TimelineProps) {
  return (
    <div className="timeline flex flex-col">
      {jobs.map(job => (
        <Experience key={job.company.name} {...job} />
      ))}

      <style jsx>{`
        .timeline {
          margin-top: calc(-1 * var(--space));
        }
      `}</style>
    </div>
  );
}
