import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import AppButton from './AppComponents/AppButton'

const PasswordPromptModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [password, setPassword] = useState('')
  const inputRef = useRef(null)

  // @ts-ignore
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // @ts-ignore
        inputRef.current?.focus()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSubmit = () => {
    onSubmit(password)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="bg-black p-5 text-white">
          Password Required
        </ModalHeader>
        <ModalBody className="bg-black p-5 text-white">
          <FormControl>
            <FormLabel htmlFor="password">
              Enter your password to continue:
            </FormLabel>
            <Input
              ref={inputRef}
              autoFocus={true}
              className="m-0 bg-transparent pl-2 text-white"
              size="md"
              id="password"
              type="password"
              value={password}
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              border={0}
              borderBottom="1px solid #921A1C"
              _focus={{
                borderBottom: '1px solid white !important',
              }}
              sx={{
                '::placeholder': {
                  color: 'white',
                },
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter className="bg-black p-5 text-white">
          <AppButton onClick={handleSubmit} isLoading={isLoading}>
            Submit
          </AppButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PasswordPromptModal
