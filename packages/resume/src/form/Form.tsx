import {
  useForm,
  type SubmitHandler,
  type DefaultValues,
  type FieldValues,
  FormProvider,
} from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = {
  defaultValues: DefaultValues<TFieldValues>;
  children: React.ReactNode;
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...htmlProps}>
        {children}
      </form>
    </FormProvider>
  );
}
