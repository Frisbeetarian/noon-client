// @ts-nocheck
import React, { InputHTMLAttributes } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useField } from 'formik'

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string
  label?: string
  type?: string
  size?: string
  placeholder?: string
  border?: string
  borderBottom?: string
  borderRadius?: string
  outline?: number
  bg?: string
  required?: boolean
}

export const AppInput: React.FC<AppInputProps> = ({
  name = 'input',
  label = 'Input',
  type = 'text',
  size = 'md',
  placeholder = 'Type message...',
  border = 'none',
  borderBottom = '1px solid #921A1C',
  borderRadius = 'none',
  outline = 0,
  bg = 'black',
  required = true,
  ...props
}) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        name={name}
        type={type}
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
        <FormErrorMessage color="text-black" className="text-black">
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
