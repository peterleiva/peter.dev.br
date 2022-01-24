import React, { useEffect } from 'react';
import useTab from './useTab';

type TabProps = {
  children: React.ReactNode;
  onSelect?: (tab: unknown) => void;
  as?: keyof JSX.IntrinsicElements;
};

export const TabContext = React.createContext<ReturnType<typeof useTab> | null>(
  null
);

export default function Tab({ children, onSelect, as: Tab = 'div' }: TabProps) {
  const { tab, ...others } = useTab();

  useEffect(() => {
    onSelect?.(tab);
  }, [tab, onSelect]);

  return (
    <Tab>
      <TabContext.Provider value={{ tab, ...others }}>
        {children}
      </TabContext.Provider>
    </Tab>
  );
}
