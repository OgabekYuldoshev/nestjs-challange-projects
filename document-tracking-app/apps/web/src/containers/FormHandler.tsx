/* eslint-disable @typescript-eslint/ban-types */
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { Form, Formik, FormikConfig, FormikHelpers, FormikProps } from "formik"

type FormikPropsType<P extends object> = Pick<FormikConfig<P>, "initialValues" | "validationSchema">
type MutationOptionsType<P extends object, T extends object> = Pick<MutationOptions<T, any, P, any>, "mutationFn" | "onError" | "onSettled" | "onMutate" | "onSuccess">

export interface IFormHandler<P extends object, T extends object>
  extends FormikPropsType<P>, MutationOptionsType<P, T> {
  onSubmit?: (values: P, helper?: FormikHelpers<P>) => void;
  children(props: FormikProps<P>): JSX.Element;
}

function FormHandler<F extends object = {}, T extends object = {}>({ children, onSubmit, ...props }: IFormHandler<F, T>) {
  const { mutate } = useMutation({
    mutationKey: ["FORM_HANDLERS"],
    ...props
  })

  console.count()
  function handleSubmit(values: F, helper: FormikHelpers<F>) {
    props.mutationFn && mutate(values)
    onSubmit && onSubmit(values, helper)
  }

  return (
    <Formik<F>
      {...props}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {
        (formikProps: FormikProps<F>) => <Form>{children(formikProps)}</Form>
      }
    </Formik>
  )
}

export default FormHandler