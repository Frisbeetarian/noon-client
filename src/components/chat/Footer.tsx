import React from 'react'
import { Flex, Input, Button } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import {
  getActiveConversation,
  setActiveConversation,
  setOngoingCall,
} from '../../store/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedInUser } from '../../store/users'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const dispatch = useDispatch()

  const activeConversation = useSelector(getActiveConversation)
  const loggedInUser = useSelector(getLoggedInUser)

  return (
    <Flex
      // mt="5"
      className="bg-white text-red-500 items-center"
    >
      <Input
        className="py-9 h-52 border border-black"
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage()
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />

      <Button
        className="mr-2"
        bg="green.500"
        _hover={{
          bg: 'black',
          color: 'black',
          border: '1px solid black',
        }}
        onClick={() => {
          dispatch(
            setOngoingCall({
              uuid: activeConversation.uuid,
              initiator: loggedInUser?.user?.profile,
            })
          )
        }}
      >
        <PhoneIcon className="" color="white" />
      </Button>

      <Button
        bg="black"
        color="white"
        // borderRadius="none"
        className="mr-3"
        _hover={{
          bg: 'white',
          color: 'black',
          border: '1px solid black',
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  )
}

export default Footer
