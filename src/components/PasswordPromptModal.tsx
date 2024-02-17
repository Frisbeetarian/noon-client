import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

const PasswordPromptModal = ({ isOpen, onSubmit, isLoading }) => {
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onSubmit(password)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Password Required</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="password">
              Enter your password to continue:
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSubmit} isLoading={isLoading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PasswordPromptModal
