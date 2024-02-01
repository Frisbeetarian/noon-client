// @ts-nocheck
import React from 'react'
import {
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { EditIcon, HamburgerIcon } from '@chakra-ui/icons'

import {
  getActiveConversation,
  removeConversation,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setActiveGroupInStore,
  setShouldPauseCheckHasMore,
} from '../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'
import { getSocketAuthObject } from '../store/sockets'

import {
  setChatContainerHeight,
  setConversationOpen,
  setSearchComponent,
} from '../store/ui'
import SocketManager from './SocketIo/SocketManager'
import withAxios from '../utils/withAxios'
import AppMenuList from './AppComponents/AppMenuList'

function GroupConversationListing({ conversation, i, axios }) {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)

  function setActiveGroup(conversation) {
    dispatch(setActiveConversationSet(false))
    dispatch(setActiveConversee(null))
    dispatch(setActiveConversation(null))
    dispatch(setShouldPauseCheckHasMore(false))
    dispatch(setActiveGroupInStore(null))

    dispatch(
      setSearchComponent({
        searchActive: false,
        containerDisplay: 'relative',
        containerHeight: '5vh',
        inputPadding: '5px',
      })
    )

    dispatch(setChatContainerHeight('87.5vh'))
    dispatch(setConversationOpen(true))
    dispatch(
      setActiveGroupInStore({
        conversation,
        loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
      })
    )
  }

  return (
    <Flex
      key={conversation.uuid}
      tabIndex={0}
      className="items-center justify-between p-3 pl-5 border-b border-b-base-300 border-b-amber-100 hover:border-sky-500 focus:outline-none focus:border-sky-700 focus-within:shadow-lg"
      // style={{ transition: 'all .25s ' }}
      style={{
        transition: 'all .25s',
        ...(activeConversation && activeConversation.uuid === conversation.uuid
          ? {
              backgroundColor: '#0F753B',
            }
          : null),
      }}
    >
      <Flex
        className="items-center cursor-pointer flex-1"
        onClick={() => {
          setActiveGroup(conversation)
        }}
      >
        <Avatar key={i} name={conversation.name} size="sm" className="mr-2">
          {conversation.unreadMessages &&
          conversation.unreadMessages !== 0 &&
          conversation.profileThatHasUnreadMessages ===
            loggedInUser.user.profile.uuid ? (
            <AvatarBadge boxSize="1.25em" bg="red.500">
              <p className="text-xs">{conversation.unreadMessages}</p>
            </AvatarBadge>
          ) : null}
        </Avatar>

        <p>{conversation.name}</p>
      </Flex>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          color="black"
          className="mr-3 bg-red-500 text-black"
          border="none"
          borderRadius="0"
          boxSize="1.5em"
        />

        <AppMenuList bg="black">
          <MenuItem
            bg="black"
            className="bg-gray-800 text-black"
            icon={<EditIcon />}
            onClick={async () => {
              // const leaveGroupResponse = await leaveGroup({
              //   variables: {
              //     groupUuid: conversation.uuid,
              //   },
              // })

              dispatch(
                removeConversation({
                  conversationUuid: conversation.uuid,
                })
              )

              if (
                activeConversation &&
                activeConversation.uuid === conversation.uuid
              ) {
                dispatch(setActiveConversationSet(false))
                dispatch(setActiveConversee(null))
                dispatch(setActiveConversation(null))
                dispatch(setShouldPauseCheckHasMore(false))
              }

              // if (leaveGroupResponse) {
              //   const participantsToSend: string[] = []
              //
              //   conversation.profiles.map((profile) => {
              //     if (profile.uuid !== loggedInUser.user?.profile?.uuid) {
              //       participantsToSend.push(profile.uuid)
              //     }
              //   })
              //
              //   socket.emit('left-group', {
              //     fromUuid: loggedInUser.user?.profile?.uuid,
              //     fromUsername: loggedInUser.user?.profile?.username,
              //     conversationUuid: conversation.uuid,
              //     participants: participantsToSend,
              //   })
              // }
            }}
          >
            Leave group
          </MenuItem>
        </AppMenuList>
      </Menu>
    </Flex>
  )
}

export default withAxios(GroupConversationListing)
