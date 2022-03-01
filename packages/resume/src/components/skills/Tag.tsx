import { FaHashtag as HashtagIcon } from 'react-icons/fa';
import type { Tag } from 'types';
import clsx from 'clsx';
import { useTabContext } from '../tabs';

type TagProps = {
  tag: Tag;
  onClick?: (tag: Tag) => void;
};

const activatedClass = (activated?: boolean) => (activated ? 'activated' : '');

export default function Tag({ tag, onClick }: TagProps) {
  const { isActivated } = useTabContext();

  const activated = isActivated(tag.id);

  return (
    <button
      onClick={() => onClick?.(tag)}
      className={clsx('tag', 'reset-button', activatedClass(activated))}
    >
      <span className="flex flex-row flex-wrap items-center justity-between">
        <HashtagIcon transform="rotate(-15)" />
        <span className="keyword">{tag.name}</span>
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
