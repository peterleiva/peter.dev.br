import clsx from 'clsx';
import { RefObject, forwardRef } from 'react';
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
  invalid?: boolean;
};

const isInput = (props: FormInputProps): props is InputProps =>
  'type' in props || 'accept' in props;

const iconValidity = (
  invalid: boolean,
  Icon?: IconType,
  Fallback = FallbackIcon
) => {
  return function IconLabel() {
    return (
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
  };
};

export default forwardRef<InputElement, Props>(function Input(
  {
    Icon,
    id,
    className,
    onClear,
    invalid = false,
    showClear = false,
    ...inputProps
  }: Props,
  ref
) {
  const inputCls = clsx(styles.input, className);
  // const [invalid, setInvalid] = useState<boolean>(false);

  // const setValidity = (element?: InputElement | null) =>
  //   setInvalid(!element?.validity?.valid);

  // const handleBlur: FocusEventHandler<InputElement> = (e): void => {
  //   setValidity(e.target);
  // };

  // const handleInvalid = () => setInvalid(true);

  const handleClear = () => {
    onClear?.();
    // setTimeout(() => setValidity(ref?.current), 0);
  };

  const InputIcon = iconValidity(invalid, Icon);

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
          // onBlur={handleBlur}
          // onInvalid={handleInvalid}
          {...inputProps}
        />
        <InputIcon />
      </div>
    );
  }

  const TextareaIcon = iconValidity(invalid, Icon, TextareaFallback);

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
        // onBlur={handleBlur}
        // onInvalid={handleInvalid}
        {...(inputProps as TextareaProps)}
      />
      <TextareaIcon />
    </div>
  );
});
