import type { IconType } from 'react-icons';
import clsx from 'clsx';
import {
  BiData as FallbackIcon,
  BiMessageSquareDetail as TextareaFallback,
} from 'react-icons/bi';
import { FiAlertOctagon as InvalidIcon } from 'react-icons/fi';
import { GrClose as CloseIcon } from 'react-icons/gr';
import styles from './Input.module.scss';
import { useFormContext } from './context';
import useClear from './useClear';

type Props = {
  id: string;
  Icon?: IconType;
  onClear?: () => void;
  invalid?: boolean;
};

const iconValidity = (
  invalid: boolean,
  Icon?: IconType,
  Fallback = FallbackIcon
) => {
  return function IconLabel() {
    return (
      <span className={styles.icon}>
        {invalid ? (
          <InvalidIcon className="text-red-500" />
        ) : Icon ? (
          <Icon />
        ) : (
          <Fallback />
        )}
      </span>
    );
  };
};

type InputProps = Props & JSX.IntrinsicElements['input'];

export function Input({ Icon, id, className, ...inputProps }: InputProps) {
  const { register, getFieldState } = useFormContext();
  const { clearable: showClose, handleClear } = useClear(id);
  const { invalid } = getFieldState(id);

  const InputIcon = iconValidity(invalid, Icon);

  return (
    <BaseInput
      showClear={showClose}
      renderClose={
        <CloseButton
          className={clsx(styles.right, styles.top)}
          onClear={handleClear}
        />
      }
    >
      <input
        className={clsx(inputClass, styles.input, className)}
        id={id}
        {...inputProps}
        {...register(id)}
      />
      <InputIcon />
    </BaseInput>
  );
}

type CloseButtonProps = Pick<Props, 'onClear'> & {
  className?: string;
};

const CloseButton = ({ onClear, className }: CloseButtonProps) => {
  return (
    <CloseIcon
      className={clsx(
        'absolute cursor-pointer z-50',
        styles.bottom,
        styles.right,
        className
      )}
      onClick={onClear}
    />
  );
};

type BaseInputProps = {
  showClear?: boolean;
  renderClose: JSX.Element | null | undefined;
  children: React.ReactNode;
};

export const BaseInput = ({
  renderClose,
  showClear,
  children,
}: BaseInputProps) => {
  return (
    <div className="relative h-full">
      {showClear && renderClose}
      {children}
    </div>
  );
};

type TextareaProps = JSX.IntrinsicElements['textarea'] & Props;

export function Textarea({
  Icon,
  id,
  className,
  required,
  ...inputProps
}: TextareaProps) {
  const { register, getFieldState } = useFormContext();
  const { clearable: showClear, handleClear } = useClear(id);

  const { invalid: isInvalid } = getFieldState(id);

  const TextareaIcon = iconValidity(isInvalid, Icon, TextareaFallback);

  return (
    <BaseInput
      showClear={showClear}
      renderClose={<CloseButton onClear={handleClear}></CloseButton>}
    >
      <textarea
        id={id}
        className={clsx(
          inputClass,
          styles.input,
          styles.textarea,
          'h-full bg-zinc-200',
          className
        )}
        required
        {...inputProps}
        {...register(id, { required })}
      />
      <TextareaIcon />
    </BaseInput>
  );
}

const inputClass =
  'relative rounded border-2 border-gray-300 outline-none font-semibold w-full focus:border-secondary focus:invalid:border-red-500';
