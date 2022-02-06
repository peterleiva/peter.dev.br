import type { ComponentType } from 'react';
import type { IconType } from 'react-icons';
import Button from './Button';

export default function ButtonWithIcon(
  Icon: IconType | ComponentType<{ size: number }>
) {
  return function WithIcon({
    children,
    ...buttonProps
  }: $ElementProps<typeof Button>) {
    return (
      <Button {...buttonProps}>
        <span className="button">
          {children} <Icon size={26} />
        </span>

        <style jsx>{`
          .button {
            display: flex;
            gap: var(--space-sm);
            align-items: center;
          }
        `}</style>
      </Button>
    );
  };
}
