import { FaHashtag as HashtagIcon } from 'react-icons/fa';
import type { Tag } from 'types';
import { join } from 'ramda';

type TagProps = {
  activated?: boolean;
  name: Tag;
  onClick?: (tag: Tag) => void;
};

const activatedClass = (activated?: boolean) => (activated ? 'activated' : '');

export default function Tag({ name: tag, activated, onClick }: TagProps) {
  return (
    <button
      onClick={() => onClick?.(tag)}
      className={join(' ', ['tag', 'reset-button', activatedClass(activated)])}
    >
      <span className="container">
        <HashtagIcon transform="rotate(-15)" />
        <span className="keyword">{tag}</span>
      </span>

      <style jsx>{`
        .tag {
          color: var(--color-link);
          display: inline-block;
          margin-right: var(--space-sm);
          padding: var(--space-xs);
          transition: 100ms;
        }

        .activated,
        .tag:hover {
          font-weight: var(--weight-bold);
          color: var(--color-secondary);
        }

        .activated .keyword,
        .tag:hover .keyword {
          color: var(--color-primary-1);
        }

        .container {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </button>
  );
}
