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
  size?: string
  placeholder?: string
  border?: string
  borderBottom?: string
  borderRadius?: string
  outline?: number
  bg?: string
  required?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size = 'md',
  placeholder = 'Type message...',
  border = 'none',
  borderBottom = '1px solid #921A1C',
  borderRadius = 'none',
  outline = 0,
  bg = 'black',
  required = false,
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
        size={size}
        placeholder={placeholder}
        border={border}
        borderBottom={borderBottom}
        borderRadius={borderRadius}
        outline={outline}
        bg={bg}
        required={required}
        sx={{
          '::placeholder': {
            color: 'white',
          },
        }}
      />
      {error ? (
        <FormErrorMessage color="white" className="text-white">
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
