import clsx from 'clsx';
import { FocusEventHandler, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  BiData as FallbackIcon,
  BiMessageSquareDetail as TextareaFallback,
} from 'react-icons/bi';
import { FiAlertOctagon as InvalidIcon } from 'react-icons/fi';
import styles from './Input.module.scss';

type InputProps = JSX.IntrinsicElements['input'];
type TextareaProps = JSX.IntrinsicElements['textarea'];

type FormInputProps = InputProps | TextareaProps;

type Props = FormInputProps & {
  Icon?: IconType;
  id: string;
};

const isInput = (props: FormInputProps): props is InputProps =>
  'type' in props || 'accept' in props;

export default function Input({ Icon, id, className, ...inputProps }: Props) {
  const inputCls = clsx(styles.input, className);
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalid, setInvalid] = useState<boolean>(false);

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e): void => {
    setInvalid(!e.target?.validity?.valid);
  };

  const handleInvalid = () => setInvalid(true);

  const printIcon = (Fallback: IconType = FallbackIcon) => (
    <span className={styles.icon}>
      {invalid ? (
        <InvalidIcon color="var(--color-error)" />
      ) : Icon ? (
        <Icon />
      ) : (
        <Fallback />
      )}
    </span>
  );

  if (isInput(inputProps)) {
    return (
      <>
        <input
          ref={inputRef}
          type="text"
          className={inputCls}
          id={id}
          name={id}
          onBlur={handleBlur}
          onInvalid={handleInvalid}
          {...inputProps}
        />
        {printIcon()}
      </>
    );
  }

  return (
    <>
      <textarea
        name={id}
        id={id}
        className={clsx(inputCls, styles.textarea)}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        {...(inputProps as TextareaProps)}
      />
      {printIcon(TextareaFallback)}
    </>
  );
}
