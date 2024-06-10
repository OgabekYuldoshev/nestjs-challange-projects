import { Field, FieldProps } from 'formik'
import React from 'react'

import { Input } from '#/components/ui/input'

export interface IText extends React.InputHTMLAttributes<HTMLInputElement> { }

const Text: React.FC<IText> = ({ name, ...props }) => {
  return (
    <Field {...{ name }}>{({ field }:FieldProps) => <Input {...field} {...props} />}</Field>
  )
}

export default Text