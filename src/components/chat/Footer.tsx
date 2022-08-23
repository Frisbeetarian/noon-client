import React from 'react'
import { Flex, Input, Button } from '@chakra-ui/react'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
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
        bg="black"
        color="white"
        borderRadius="none"
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
