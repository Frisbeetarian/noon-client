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
import { getSocket } from '../store/sockets'

import { useLeaveGroupMutation } from '../generated/graphql'
import { setChatContainerHeight, setSearchComponent } from '../store/ui'

function GroupConversationListing({ conversation, i }) {
  const dispatch = useDispatch()
  const [, leaveGroup] = useLeaveGroupMutation()

  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)
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
      tabindex="0"
      className="items-center justify-between p-3 pl-5 border-b border-b-base-300 border-b-amber-100 hover:border-sky-500 focus:outline-none focus:border-sky-700 focus-within:shadow-lg"
      style={{ transition: 'all .25s ' }}
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
        />

        <MenuList>
          <MenuItem
            icon={<EditIcon />}
            onClick={async () => {
              const leaveGroupResponse = await leaveGroup({
                groupUuid: conversation.uuid,
              })

              console.log('leave group response:', leaveGroupResponse)

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

              if (leaveGroupResponse) {
                const participantsToSend: string[] = []

                conversation.profiles.map((profile) => {
                  if (profile.uuid !== loggedInUser.user?.profile?.uuid) {
                    participantsToSend.push(profile.uuid)
                  }
                })

                socket.emit('left-group', {
                  fromUuid: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  conversationUuid: conversation.uuid,
                  participants: participantsToSend,
                })
              }
            }}
          >
            Leave group
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default GroupConversationListing