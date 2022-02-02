import clsx from 'clsx';
import styles from 'styles/Button.module.scss';

type ButtonProps = JSX.IntrinsicElements['button'];
type AnchorProps = JSX.IntrinsicElements['a'];
type ButtonTypes = ButtonProps | AnchorProps;

type ButtonComponent = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};

const isAnchor = (props: ButtonTypes): props is AnchorProps => 'href' in props;

const Button: ButtonComponent = ({ className, ...htmlProps }) => {
  const buttonCls = clsx(styles.button, className);

  if (isAnchor(htmlProps)) {
    return <a className={buttonCls} {...htmlProps} />;
  }

  return <button className={buttonCls} {...htmlProps} />;
};

export default Button;
