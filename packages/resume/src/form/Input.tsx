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
import { useEffect, useState } from 'react';

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
  const { register, watch } = useFormContext();
  const { clearable: showClose, handleClear } = useClear(id);
  const [invalid, setInvalid] = useState<boolean>(false);

  const InputIcon = iconValidity(invalid, Icon);

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      if (name) {
        const value = data[name];
        console.log('asdasd', value.error);
        setInvalid(value.error);
      }
    });

    return unsubscribe;
  }, [watch, id]);

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
        className={clsx(styles.input, className)}
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
      className={clsx(styles.clear, styles.bottom, styles.right, className)}
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
  invalid = false,
  Icon,
  id,
  className,
  ...inputProps
}: TextareaProps) {
  const { register } = useFormContext();
  const { clearable: showClear, handleClear } = useClear(id);

  const TextareaIcon = iconValidity(invalid, Icon, TextareaFallback);

  return (
    <BaseInput
      showClear={showClear}
      renderClose={<CloseButton onClear={handleClear}></CloseButton>}
    >
      <textarea
        id={id}
        className={clsx(styles.input, styles.textarea, className)}
        {...inputProps}
        {...register(id)}
      />
      <TextareaIcon />
    </BaseInput>
  );
}
