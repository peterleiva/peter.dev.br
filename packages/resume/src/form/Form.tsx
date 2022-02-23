import {
  useForm,
  type SubmitHandler,
  type DefaultValues,
} from 'react-hook-form';
import { FormContext } from './context';

type Props<TFieldValues> = {
  defaultValues: DefaultValues<TFieldValues>;
  children: React.ReactNode | React.ReactNode[];
  onSubmit: SubmitHandler<TFieldValues>;
} & JSX.IntrinsicElements['form'];

export default function Form<TFieldValues>({
  defaultValues,
  onSubmit,
  children,
  ...htmlProps
}: Props<TFieldValues>) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <FormContext.Provider value={methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...htmlProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
