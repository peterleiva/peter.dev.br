import { forwardRef } from 'react';
import { IconType } from 'react-icons';
import clsx from 'clsx';
import Input from './Input';
import styles from './Input.module.scss';
import Label from './Label';

type Props = $ElementProps<typeof Input> & {
  label: string;
  id?: string;
  Icon?: IconType;
};

export default forwardRef<HTMLInputElement, Props>(function Field(
  { id, label, Icon, className, required, ...props }: Props,
  ref
) {
  return (
    <div className={clsx(styles.control, className)}>
      <Input Icon={Icon} id={id} required={required} ref={ref} {...props} />
      <Label
        id={id}
        required={required}
        label={label}
        className="order-first"
      />
    </div>
  );
});
