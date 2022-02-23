import { useContext, createContext } from 'react';
import { type useForm } from 'react-hook-form';

export const FormContext = createContext<ReturnType<typeof useForm> | null>(
  null
);

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('you must define FormContext to useFormContext');
  }

  return context;
};
