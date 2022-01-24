import React, { SyntheticEvent } from 'react';
import { QueryObserverBaseResult } from 'react-query';

type ErrorProps = {
  refetch?: QueryObserverBaseResult['refetch'];
};

export default function Error({ refetch }: ErrorProps) {
  const tryAgain = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    refetch?.();
  };

  return (
    <p className="text-error">
      Error fetching skills. Please,{' '}
      <a href="" onClick={tryAgain}>
        try again
      </a>
      . If persist contact me at{' '}
      <a href="mailto:contact@peter.dev.br">contact@peter.dev.br</a>
      <style jsx>{`
        p {
          margin-top: var(--space);
        }
      `}</style>
    </p>
  );
}
