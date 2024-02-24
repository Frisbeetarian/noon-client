import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AppMenuList from '../AppComponents/AppMenuList'
import { AiOutlineUser } from 'react-icons/ai'

import MessageManagement from '../../utils/MessageManagement'
import { getLoggedInUser } from '../../store/users'

const TextMessage = ({
  content,
  isMine,
  isDeleted,
  item,
  conversationType,
  deleteMessageHandler,
}) => {
  const loggedInUser = useSelector(getLoggedInUser)
  const [decryptedContent, setDecryptedContent] = useState('')

  useEffect(() => {
    const decryptAndSetContent = async () => {
      if (!isDeleted && content) {
        try {
          const decrypted = await MessageManagement.decryptMessage(
            content,
            item.encryptedKey,
            loggedInUser.user.uuid
          )
          setDecryptedContent(decrypted)
        } catch (error) {
          console.error('Decryption error:', error)
          setDecryptedContent('Failed to decrypt message')
        }
      } else {
        setDecryptedContent(content)
      }
    }

    decryptAndSetContent()
  }, [content, isDeleted])

  return (
    <Flex
      className="relative"
      bg={isMine ? 'black' : 'gray.100'}
      color={isMine ? 'white' : 'black'}
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      justifyContent={isMine ? 'flex-end' : 'flex-start'}
      maxW="350px"
      my={1}
      p={3}
    >
      {conversationType === 'group' && !isMine ? (
        <Flex>
          <Avatar
            className="mr-2"
            size="xs"
            bg="black"
            name={item.sender.username}
            icon={<AiOutlineUser fontSize="1.5rem" />}
          />
          <Text className="bg-gray-100">
            {!isDeleted ? (
              decryptedContent
            ) : (
              <i className="text-gray-400">{decryptedContent}</i>
            )}
          </Text>
        </Flex>
      ) : (
        <Text className=" ">
          {!isDeleted ? (
            decryptedContent
          ) : (
            <i className="text-gray-400">{decryptedContent}</i>
          )}
        </Text>
      )}

      {isMine && !isDeleted ? (
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
