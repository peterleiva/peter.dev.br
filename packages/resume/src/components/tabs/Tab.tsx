import useTabContext from './useTabContext';

type TabProps<T> = {
  id: T;
  children?: React.ReactNode | ((activated: boolean) => React.ReactNode);
  as?: keyof JSX.IntrinsicElements;
  onSelect?: (tab: T) => void;
};

export default function Tab<T>({
  id,
  children,
  onSelect,
  as: Component = 'div',
}: TabProps<T>) {
  const { activate, isActivated } = useTabContext();

  const select = () => {
    activate(id);
    onSelect?.(id);
  };

  return (
    <Component onClick={() => select()}>
      {typeof children === 'function'
        ? children?.(isActivated?.(id) ?? false)
        : children}
    </Component>
  );
}
