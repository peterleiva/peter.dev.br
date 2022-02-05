import { IconType } from 'react-icons';
import clsx from 'clsx';
import Input from './Input';
import styles from './Input.module.scss';

type Props = $ElementProps<typeof Input> & {
  id: string;
  label: string;
  Icon?: IconType;
};

export default function Field({
  id,
  label,
  Icon,
  className,
  required,
  ...props
}: Props) {
  return (
    <div className={clsx(styles.control, className)}>
      <Input Icon={Icon} id={id} required={required} {...props} />
      <label
        htmlFor={id}
        className={clsx(styles.label, { [styles.required]: required })}
      >
        {label}
      </label>
    </div>
  );
}
