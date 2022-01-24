import { createContext } from 'react';
import useTab from './useTab';

export default createContext<ReturnType<typeof useTab> | null>(null);
