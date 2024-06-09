import { FormikProps } from 'formik'
import * as yup from "yup"

import FormHandler from '#/containers/FormHandler'

import { Api } from '..'
import { IForm } from '../types'

interface ILoginForm {
  children(props: FormikProps<IForm.LoginForm>): JSX.Element
}

const validationSchema = yup.object().shape({
  email: yup.string(),
  password: yup.string(),
})

export const LoginForm = ({ children }: ILoginForm) => {
  const mutationFn = async (values: IForm.LoginForm) => {
    const { data } = await Api.LoginApi({ values })
    return data
  }

  return (
    <FormHandler<IForm.LoginForm>
      initialValues={{
        email: '',
        password: '',
      }}
      {...{ validationSchema, mutationFn }}
    >{children}</FormHandler>
  )
}
