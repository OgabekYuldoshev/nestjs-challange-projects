import { Field } from "formik"
import React from 'react'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '#/components/ui/input-otp'

export interface IOtp {
  name: string,
  maxLength: number
}

const Otp: React.FC<IOtp> = ({ name, maxLength }) => {
  return (
    <Field {...{ name }}>{({ field }) => (
      <InputOTP {...{ maxLength }} value={field.value} onChange={(val) => field.setValue(val)}>
        <InputOTPGroup>
          {Array.from({ length: maxLength }, (_, k) => k).map((i) => (
            <InputOTPSlot index={i} key={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    )}</Field>
  )
}

export default Otp