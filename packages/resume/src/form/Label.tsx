import clsx from 'clsx';

type Props = {
  label: string;
  id?: string;
  required?: boolean;
  className?: string;
};

export default function Label({ id, label, required, className }: Props) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'font-semibold',
        {
          "after:content-['*'] after:text-red-500": required,
        },
        className
      )}
    >
      {label}
    </label>
  );
}
