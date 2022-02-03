import clsx from 'clsx';
import styles from 'styles/Button.module.scss';

type ButtonProps = JSX.IntrinsicElements['button'];
type AnchorProps = JSX.IntrinsicElements['a'];
type ButtonTypes = (ButtonProps | AnchorProps) & {
  disabled?: boolean;
};

const isAnchor = (props: ButtonTypes): props is AnchorProps => 'href' in props;

export default function Button({
  className,
  disabled,
  ...htmlProps
}: ButtonTypes): JSX.Element {
  const buttonCls = clsx(
    styles.button,
    { [styles.disabled]: disabled },
    className
  );

  if (isAnchor(htmlProps)) {
    return <a className={buttonCls} {...htmlProps} />;
  }

  return <button className={buttonCls} {...(htmlProps as ButtonProps)} />;
}
