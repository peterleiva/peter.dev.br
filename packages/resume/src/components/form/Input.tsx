import clsx from 'clsx';
import { FocusEventHandler, RefObject, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  BiData as FallbackIcon,
  BiMessageSquareDetail as TextareaFallback,
} from 'react-icons/bi';
import { FiAlertOctagon as InvalidIcon } from 'react-icons/fi';
import { GrClose as CloseIcon } from 'react-icons/gr';
import styles from './Input.module.scss';

type InputProps = JSX.IntrinsicElements['input'];
type TextareaProps = JSX.IntrinsicElements['textarea'];
type InputElement = HTMLInputElement | HTMLTextAreaElement;

type FormInputProps = InputProps | TextareaProps;

type Props = FormInputProps & {
  Icon?: IconType;
  id: string;
  onClear?: () => void;
  showClear?: boolean;
};

const isInput = (props: FormInputProps): props is InputProps =>
  'type' in props || 'accept' in props;

export default function Input({
  Icon,
  id,
  className,
  onClear,
  showClear = false,
  ...inputProps
}: Props) {
  const inputCls = clsx(styles.input, className);
  const [invalid, setInvalid] = useState<boolean>(false);
  const ref = useRef<InputElement>(null);

  const setValidity = (element?: InputElement | null) =>
    setInvalid(!element?.validity?.valid);

  const handleBlur: FocusEventHandler<InputElement> = (e): void => {
    setValidity(e.target);
  };

  const handleInvalid = () => setInvalid(true);

  const handleClear = () => {
    onClear?.();
    setTimeout(() => setValidity(ref?.current), 0);
  };

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
      <div className={styles['input-container']}>
        {showClear && (
          <CloseIcon
            className={clsx(styles.clear, styles.right, styles.top)}
            onClick={handleClear}
          />
        )}
        <input
          ref={ref as RefObject<HTMLInputElement>}
          type="text"
          className={inputCls}
          id={id}
          name={id}
          onBlur={handleBlur}
          onInvalid={handleInvalid}
          {...inputProps}
        />
        {printIcon()}
      </div>
    );
  }

  return (
    <div className={styles['input-container']}>
      {showClear && (
        <CloseIcon
          className={clsx(styles.clear, styles.bottom, styles.right)}
          onClick={onClear}
        />
      )}
      <textarea
        name={id}
        id={id}
        ref={ref as RefObject<HTMLTextAreaElement>}
        className={clsx(inputCls, styles.textarea)}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        {...(inputProps as TextareaProps)}
      />
      {printIcon(TextareaFallback)}
    </div>
  );
}
