import { Flex, IconButton, Menu, MenuButton, MenuItem } from '@chakra-ui/react'
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
}) => (
  <Flex
    className="relative"
    alignSelf={isMine ? 'flex-end' : 'flex-start'}
    justifyContent={isMine ? 'flex-end' : 'flex-start'}
    minW="100px"
    maxW="350px"
    my="1"
    p="0"
    bg={isDeleted ? 'gray.100' : 'transparent'}
  >
    {!isDeleted ? (
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      </div>
    ) : (
      <p>
        <i className="text-gray-400">{content}</i>
      </p>
    )}

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

export default ImageMessage
