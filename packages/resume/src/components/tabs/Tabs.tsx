import React, { useEffect } from 'react';
import useTab from './useTab';
import TabContext from './context';
import Tab from './Tab';
import TabPanel from './TabPanel';

type TabProps<T> = {
  children: React.ReactNode;
  onSelect?: (tab: unknown) => void;
  as?: keyof JSX.IntrinsicElements;
  defaultValue: T;
};

function Tabs<T>({
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

Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
