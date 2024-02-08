import React from 'react'
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import ReactAudioPlayer from 'react-audio-player'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AppMenuList from '../AppComponents/AppMenuList'

const AudioMessage = ({
  src,
  isMine,
  isDeleted,
  content,
  item,
  deleteMessageHandler,
}) => {
  return (
    <Flex
      className="relative"
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      justifyContent={isMine ? 'flex-end' : 'flex-start'}
      my="1"
      bg={isDeleted ? 'black' : 'transparent'}
      p={isDeleted ? '3' : '0'}
      style={{ position: 'relative' }}
    >
      {!isDeleted ? (
        <ReactAudioPlayer src={src} controls />
      ) : (
        <Text className="">
          <i className="text-gray-400">{content}</i>
        </Text>
      )}

      {isMine && !isDeleted ? (
        <Menu>
          <MenuButton
            className="bg-black ml-2"
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

export default AudioMessage
