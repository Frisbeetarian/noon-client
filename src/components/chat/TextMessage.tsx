import React from 'react'
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AppMenuList from '../AppComponents/AppMenuList'

const TextMessage = ({
  content,
  isMine,
  isDeleted,
  item,
  deleteMessageHandler,
}) => {
  return (
    <Flex
      className="relative"
      bg={isMine ? 'black' : 'gray.100'}
      color={isMine ? 'white' : 'black'}
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      justifyContent={isMine ? 'flex-end' : 'flex-start'}
      maxW="350px"
      my="1"
      p="3"
    >
      <Text>
        {!isDeleted ? content : <i className="text-gray-400">{content}</i>}
      </Text>

      {isMine ? (
        <Menu>
          <MenuButton
            className="bg-black -mt-2 ml-2 -mr-2"
            size="xs"
            as={IconButton}
            aria-label="Options"
            icon={<ChevronDownIcon />}
            variant="none"
          />

          {/*<Portal>*/}
          <AppMenuList
            bg="black"
            className="bg-red-500 text-black"
            border="none"
            borderRadius="0"
          >
            <MenuItem
              // @ts-ignore
              size="xs"
              bg="black"
              className="bg-red-500 text-black text-sm"
              border="none"
              onClick={async () => {
                await deleteMessageHandler(item)
              }}
            >
              Delete message
            </MenuItem>
          </AppMenuList>
          {/*</Portal>*/}
        </Menu>
      ) : null}
    </Flex>
  )
}

export default TextMessage
