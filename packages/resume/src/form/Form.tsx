import {
  useForm,
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type UnpackNestedValue,
  UseFormReset,
} from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = {
  defaultValues: DefaultValues<TFieldValues>;
  children: React.ReactNode;
  onSubmit: (
    data: UnpackNestedValue<TFieldValues>,
    reset: UseFormReset<TFieldValues>
  ) => void;
} & JSX.IntrinsicElements['form'];

export default function Form<TFieldValues>({
  defaultValues,
  onSubmit,
  children,
  ...htmlProps
}: Props<TFieldValues>) {
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(data => {
          onSubmit(data);
          reset();
        })}
        {...htmlProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}
