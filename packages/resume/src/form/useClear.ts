import { useEffect, useState } from 'react';
import { useFormContext } from './context';

export default function useClear(id: string) {
  const { watch, resetField } = useFormContext();
  const [clearable, setClearable] = useState(false);

  useEffect(() => {
    const { unsubscribe } = watch((data, { name, type }) => {
      // when data is reseted
      if (!type && !name) {
        setClearable(false);
      }

      // otherwise only check for id watched
      if (name === id) {
        const value = data[name];
        setClearable(!!value);
      }
    });

    return () => unsubscribe();
  }, [watch, id]);

  const handleClear = () => resetField(id);
  return { clearable, handleClear };
}
