import React, { forwardRef, useEffect } from 'react'
import { CloseButton, Flex, useToast } from '@chakra-ui/react'

import AppButton from './AppButton'

interface AppAlertProps {
  id: string
  title?: string
  onAccept?: () => void
  onReject?: () => void
  senderUuid?: string
  senderUsername?: string
  status?: 'success' | 'error' | 'warning' | 'info'
  duration?: number | null | undefined
  customRender?: boolean
}

const AppAlert = forwardRef<HTMLButtonElement, AppAlertProps>(
  ({
    id,
    title,
    onAccept,
    onReject,
    status = 'success',
    duration = null,
    customRender = false,
    senderUuid,
    senderUsername,
  }) => {
    const toast = useToast()

    const customizedRender = () => (
      <Flex
        direction="column"
        color="white"
        p={3}
        bg={status === 'error' ? 'red.500' : '#4B0E10'}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <p>{title}</p>
          <CloseButton size="sm" onClick={() => toast.close(id)} />
        </Flex>
        {onAccept && onReject && (
          <Flex className="justify-end mt-3">
            <AppButton className="mr-3" onClick={onAccept}>
              Accept
            </AppButton>
            <AppButton bg="black" onClick={onReject}>
              Reject
            </AppButton>
          </Flex>
        )}
      </Flex>
    )

    const defaultRender = () => (
      <Flex direction="column" color="white" p={3} bg="#4B0E10">
        <Flex>
          <p>{title}felwkjfbewkjfbew</p>

          <CloseButton
            className="sticky top ml-4 mb-10"
            size="sm"
            onClick={() => {
              toast.close(senderUuid)
            }}
            name="close button"
          />
        </Flex>
      </Flex>
    )

    const showToast = () => {
      toast({
        id,
        title,
        position: 'bottom-right',
        isClosable: true,
        status,
        duration,
        render: customRender ? customizedRender : defaultRender,
      })
    }

    useEffect(() => {
      showToast()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null
  }
)

AppAlert.displayName = 'AppAlert'

export default AppAlert
