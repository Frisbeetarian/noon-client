import {
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuItem,
} from '@chakra-ui/react'
import Image from 'next/image'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AppMenuList from '../AppComponents/AppMenuList'
import React from 'react'

const ImageMessage = ({
  src,
  alt,
  isMine,
  isDeleted,
  content,
  item,
  deleteMessageHandler,
}) => {
  console.log('item:', item)
  return (
    <Flex
      className="relative"
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      justifyContent={isMine ? 'flex-end' : 'flex-start'}
      minW="200px"
      maxW="350px"
      my="1"
      bg={isDeleted ? 'black' : 'transparent'}
      p={isDeleted ? '3' : '0'}
    >
      {!isDeleted ? (
        <Flex style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Image src={src} alt={alt} layout="fill" objectFit="cover" />
        </Flex>
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

export default ImageMessage
