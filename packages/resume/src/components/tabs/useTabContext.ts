import { useContext } from 'react';
import tabContext from './context';

export default function useTabContext() {
  const context = useContext(tabContext);

  if (!context) {
    throw new Error(`Component must be used within in Tabs component`);
  }

  return context;
}
