import { FaHashtag as HashtagIcon } from 'react-icons/fa';
import type { Tag as ITag } from 'types';
import clsx from 'clsx';

type TagProps = {
  activated?: boolean;
  name: ITag;
  onClick?: (tag: ITag) => void;
};

const activatedClass = (activated?: boolean) => (activated ? 'activated' : '');

export default function Tag({ name: tag, activated, onClick }: TagProps) {
  return (
    <button
      onClick={() => onClick?.(tag)}
      className={clsx('tag', 'reset-button', activatedClass(activated))}
    >
      <span className="flex flex-row flex-wrap items-center justity-between">
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
      `}</style>
    </button>
  );
}
