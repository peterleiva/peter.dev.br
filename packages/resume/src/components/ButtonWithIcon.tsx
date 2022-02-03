import { IconType } from 'react-icons';
import Button from './Button';

export default function ButtonWithIcon(Icon: IconType) {
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
            alignitems: center;
          }
        `}</style>
      </Button>
    );
  };
}
