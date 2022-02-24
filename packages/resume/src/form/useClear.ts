import { useWatch } from 'react-hook-form';
import { useFormContext } from './context';

export default function useClear(id: string) {
  const { resetField } = useFormContext();
  const value = useWatch({ name: id });

  const clearable = !!value;

  const handleClear = () => resetField(id);

  return { clearable, handleClear };
}
