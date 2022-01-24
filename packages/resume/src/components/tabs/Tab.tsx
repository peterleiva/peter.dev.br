import React, { useContext } from 'react';
import { TabContext } from './Tabs';

type TabItemProps<T> = {
  id: T;
  children?: React.ReactNode | ((activated: boolean) => React.ReactNode);
  as?: keyof JSX.IntrinsicElements;
};

export default function Tab<T>({
  id,
  children,
  as: Item = 'div',
}: TabItemProps<T>) {
  const tab = useContext(TabContext);

  return (
    <Item onClick={() => tab?.activate(id)}>
      {typeof children === 'function'
        ? children?.(tab?.isActivated?.(id) ?? false)
        : children}
    </Item>
  );
}
