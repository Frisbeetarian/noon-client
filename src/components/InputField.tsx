import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  textarea?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea

  if (textarea) {
    InputOrTextarea = Textarea
  } else {
    // TextareaHTMLAttributes
    InputOrTextarea = Input
  }
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        border="none"
        borderBottom="1px solid"
        borderRadius="0"
      />
      {error ? (
        <FormErrorMessage color="text-black" className="text-black">
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
