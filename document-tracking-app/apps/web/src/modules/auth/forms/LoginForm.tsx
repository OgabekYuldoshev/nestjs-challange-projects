import { FormikProps } from 'formik'
import { get } from "radash"
import * as yup from "yup"

import FormHandler from '#/containers/FormHandler'

import { Api } from '..'
import { setToken } from '../context/store'
import { IForm } from '../types'

interface ILoginForm {
  children(props: FormikProps<IForm.LoginForm>): JSX.Element
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
})

export const LoginForm = ({ children }: ILoginForm) => {

  const mutationFn = async (values: IForm.LoginForm) => {
    const { data } = await Api.LoginApi({ values })
    return {
      token: get(data, 'data.access_token')
    }
  }

  return (
    <FormHandler<IForm.LoginForm>
      initialValues={{
        email: '',
        password: '',
      }}
      {...{ validationSchema, mutationFn }}
      onSuccess={((data) => setToken(get(data, 'token')))}
    >{children}</FormHandler>
  )
}
