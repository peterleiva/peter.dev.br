import { IconType } from 'react-icons';
import Button from './Button';

type ButtonIconProps = Parameters<typeof Button>[0] & {
  Icon: IconType;
};

export default function ButtonIcon({
  children,
  Icon,
  ...buttonProps
}: ButtonIconProps) {
  return (
    <Button {...buttonProps}>
      <span className="button">
        {children} <Icon size={26} />
      </span>

      <style jsx>{`
        .button {
          display: flex;
          gap: var(--space-sm);
          alignitems: center;
        }
      `}</style>
    </Button>
  );
}
