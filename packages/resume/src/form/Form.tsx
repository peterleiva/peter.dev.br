import {
  useForm,
  type SubmitHandler,
  type UseFormProps,
  FormProvider,
} from 'react-hook-form';

type Props<T> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  useFormProps?: UseFormProps<T>;
} & Omit<JSX.IntrinsicElements['form'], 'onSubmit'>;

export default function Form<T>({
  useFormProps,
  onSubmit,
  children,
  ...htmlProps
}: Props<T>) {
  const methods = useForm(useFormProps);
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
