import type { ReactNode } from 'react';
import useTabContext from './useTabContext';

type TabPanelProps<T> = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  id: T;
};

export default function TabPanel<T>({
  as: Panel = 'div',
  children,
  id,
}: TabPanelProps<T>) {
  const { isActivated } = useTabContext();

  if (!isActivated(id)) {
    return null;
  }

  return <Panel>{children}</Panel>;
}
