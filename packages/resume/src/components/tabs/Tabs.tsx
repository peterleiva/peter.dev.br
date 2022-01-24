import React, { useEffect } from 'react';
import useTab from './useTab';
import TabContext from './context';

type TabProps<T> = {
  children: React.ReactNode;
  onSelect?: (tab: unknown) => void;
  as?: keyof JSX.IntrinsicElements;
  defaultValue: T;
};

export default function Tab<T>({
  children,
  onSelect,
  as: Tab = 'div',
  defaultValue,
}: TabProps<T>) {
  const state = useTab(defaultValue);

  useEffect(() => {
    onSelect?.(state.tab);
  }, [state.tab, onSelect]);

  return (
    <Tab>
      <TabContext.Provider value={state}>{children}</TabContext.Provider>
    </Tab>
  );
}
