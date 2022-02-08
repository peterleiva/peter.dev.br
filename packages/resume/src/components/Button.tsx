import clsx from 'clsx';

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
    'text-white font-medium bg-black px-4 py-2 rounded border-0 cursor-pointer disabled:text-slate-300 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-no-drop',
    className
  );

  if (isAnchor(htmlProps)) {
    return (
      <a
        className={clsx(buttonCls, {
          'text-gray-500 bg-gray-300 cursor-no-drop': disabled,
        })}
        {...htmlProps}
      />
    );
  }

  return (
    <button
      className={buttonCls}
      disabled={disabled}
      {...(htmlProps as ButtonProps)}
    />
  );
}
