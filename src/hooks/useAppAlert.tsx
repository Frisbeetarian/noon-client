import { CloseButton, Flex, useToast } from '@chakra-ui/react'
import AppButton from '../components/AppComponents/AppButton'

const useAppAlert = () => {
  const toast = useToast()

  const showAppAlert = ({
    id,
    title,
    description = null,
    onAccept = null,
    onReject = null,
    isClosable = true,
    status = 'success',
    duration = 5000,
    customRender = true,
  }) => {
    const renderProps = {
      id,
      title,
      description,
      status,
      duration,
      position: 'bottom-right',
      isClosable,
    }

    if (customRender) {
      renderProps.render = ({ onClose }) => (
        <Flex
          direction="column"
          color="white"
          p={3}
          bg={status === 'error' ? 'red.500' : '#4B0E10'}
        >
          <Flex className="" justifyContent="space-between">
            <Flex className="flex-col mr-2">
              <p>{title}</p>
              <p>{description}</p>
            </Flex>
            <CloseButton className="-mt-2 -mr-2" size="sm" onClick={onClose} />
          </Flex>
          {(onAccept || onReject) && (
            <Flex className="justify-end mt-3">
              {onAccept && (
                <AppButton
                  className="mr-3"
                  onClick={() => {
                    onAccept()
                    onClose()
                  }}
                >
                  Accept
                </AppButton>
              )}
              {onReject && (
                <AppButton
                  bg="black"
                  onClick={() => {
                    onReject()
                    onClose()
                  }}
                >
                  Reject
                </AppButton>
              )}
            </Flex>
          )}
        </Flex>
      )
    }

    toast(renderProps)
  }

  return showAppAlert
}

export default useAppAlert
