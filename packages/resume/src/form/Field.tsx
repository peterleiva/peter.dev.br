import { IconType } from 'react-icons';
import clsx from 'clsx';
import Input from './Input';
import styles from './Input.module.scss';
import { forwardRef } from 'react';

type Props = $ElementProps<typeof Input> & {
  id?: string;
  label: string;
  Icon?: IconType;
};

export default forwardRef<HTMLInputElement, Props>(function Field(
  { id, label, Icon, className, required, ...props }: Props,
  ref
) {
  return (
    <div className={clsx(styles.control, className)}>
      <Input Icon={Icon} id={id} required={required} ref={ref} {...props} />
      <label
        htmlFor={id}
        className={clsx(styles.label, { [styles.required]: required })}
      >
        {label}
      </label>
    </div>
  );
});
