import useTabContext from './useTabContext';

type TabItemProps<T> = {
  id: T;
  children?: React.ReactNode | ((activated: boolean) => React.ReactNode);
  as?: keyof JSX.IntrinsicElements;
};

export default function Tab<T>({
  id,
  children,
  as: Component = 'div',
}: TabItemProps<T>) {
  const { activate, isActivated } = useTabContext();

  return (
    <Component onClick={() => activate(id)}>
      {typeof children === 'function'
        ? children?.(isActivated?.(id) ?? false)
        : children}
    </Component>
  );
}
