import React, { forwardRef, useEffect } from 'react'
import { CloseButton, Flex, useToast } from '@chakra-ui/react'

import AppButton from './AppButton'

interface AppAlertProps {
  id: string
  title?: string
  onAccept?: () => void
  onReject?: () => void
  username?: string
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
    customRender,
  }) => {
    const toast = useToast()

    const defaultRender = () => (
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

    const showToast = () => {
      toast({
        id,
        title,
        position: 'bottom-right',
        isClosable: true,
        status,
        duration,
        render: customRender ? defaultRender : null,
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
