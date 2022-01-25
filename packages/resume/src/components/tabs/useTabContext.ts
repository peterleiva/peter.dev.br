import { useContext } from 'react';
import tabContext from './context';

export default function useTabContext() {
  const context = useContext(tabContext);

  if (!context) {
    throw new Error(
      `Tabs compound components cannot be rendered outsite of Tabs Component`
    );
  }

  return context;
}
