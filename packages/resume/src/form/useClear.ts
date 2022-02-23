import { useEffect, useState } from 'react';
import { useFormContext } from './context';

export default function useClear(id: string) {
  const { watch, resetField } = useFormContext();
  const [clearable, setClearable] = useState(false);

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      if (name === id) {
        const value = data[name];
        setClearable(value);
      }
    });

    return () => unsubscribe();
  }, [watch, id]);

  const handleClear = () => resetField(id);
  return { clearable, handleClear };
}
