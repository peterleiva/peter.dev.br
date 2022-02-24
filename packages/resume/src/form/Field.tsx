import clsx from 'clsx';
import styles from './Input.module.scss';
import Label from './Label';

type Props = {
  label: string;
  id?: string;
  required?: boolean;
  className?: string;
  renderInput: JSX.Element;
};

export default function Field({
  id,
  label,
  className,
  renderInput: input,
  required,
}: Props) {
  return (
    <div className={clsx(styles.control, className)}>
      {input}
      <Label
        id={id}
        required={required}
        label={label}
        className="order-first"
      />
    </div>
  );
}
