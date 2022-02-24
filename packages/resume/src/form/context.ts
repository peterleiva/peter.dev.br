import { useFormContext as useContext } from 'react-hook-form';

export const useFormContext = () => {
  const context = useContext();

  if (!context) {
    throw new Error('you must define FormContext to useFormContext');
  }

  return context;
};
