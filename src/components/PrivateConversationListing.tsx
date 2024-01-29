import React, { useState } from 'react'
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
import { getLoggedInUser, removeFriendEntry } from '../store/users'
import {
  getActiveConversation,
  removeConversation,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setShouldPauseCheckHasMore,
} from '../store/chat'
import {
  getIsMobile,
  setChatContainerHeight,
  setConversationOpen,
  setSearchComponent,
} from '../store/ui'
import { setVideoFrameForConversation } from '../store/video'
import { useDispatch, useSelector } from 'react-redux'
import { useUnfriendMutation } from '../generated/graphql'
import SocketManager from './SocketIo/SocketManager'
import { getSocketAuthObject } from '../store/sockets'

function PrivateConversationListing({ conversation, i }) {
  const socketAuthObject = useSelector(getSocketAuthObject)

  const [, setProfile] = useState()

  // const router = useRouter()
  const dispatch = useDispatch()

  const loggedInUser = useSelector(getLoggedInUser)
  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()

  const activeConversation = useSelector(getActiveConversation)
  const isMobile = useSelector(getIsMobile)

  // const [
  //   unfriend,
  //   // { loading: unfriendLoading }
  // ] = useUnfriendMutation()

  function setActiveConverseeFunction(profile, conversation) {
    dispatch(
      setSearchComponent({
        searchActive: false,
        containerDisplay: 'relative',
        containerHeight: '5vh',
        inputPadding: '5px',
      })
    )

    if (activeConversation) {
      if (conversation.uuid !== activeConversation.uuid) {
        dispatch(setActiveConversationSet(false))
        dispatch(setActiveConversee(null))
        dispatch(setActiveConversation(null))
        dispatch(setShouldPauseCheckHasMore(false))
        dispatch(setVideoFrameForConversation(false))

        // setTimeout(() => {
        dispatch(setActiveConversationSet(true))
        dispatch(setActiveConversee(profile))
        dispatch(
          setActiveConversation({
            conversation: conversation,
            loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
          })
        )
      }
    } else {
      dispatch(setActiveConversationSet(false))
      dispatch(setActiveConversee(null))
      dispatch(setActiveConversation(null))
      dispatch(setShouldPauseCheckHasMore(false))

      // setTimeout(() => {
      dispatch(setActiveConversationSet(true))
      dispatch(setActiveConversee(profile))
      dispatch(
        setActiveConversation({
          conversation: conversation,
          loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
        })
      )
    }

    dispatch(setConversationOpen(true))
    dispatch(setChatContainerHeight(isMobile ? '82.5vh' : '87.5vh'))
  }

  return (
    <Flex
      key={conversation.uuid}
      tabIndex={0}
      className="items-center justify-between p-3 pl-5 border-b border-b-base-300 border-b-amber-100 hover:border-sky-500 focus:outline-none focus:border-sky-700 focus-within:shadow-lg"
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
          setActiveConverseeFunction(conversation.conversee, conversation)
          setProfile(conversation.conversee)
        }}
      >
        <Avatar
          key={i}
          name={conversation.conversee.username}
          size="sm"
          className="mr-2"
        >
          {conversation.unreadMessages &&
          conversation.unreadMessages !== 0 &&
          conversation.profileThatHasUnreadMessages ===
            loggedInUser.user.profile.uuid ? (
            <AvatarBadge boxSize="1.25em" bg="red.500">
              <p className="text-xs">{conversation.unreadMessages}</p>
            </AvatarBadge>
          ) : null}
        </Avatar>

        <p>{conversation.conversee.username}</p>
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
            className="bg-gray-800"
            bg="bg-gray-800"
            icon={<EditIcon />}
            onClick={async () => {
              const unfriendResponse = await unfriend({
                variables: {
                  profileUuid: conversation.conversee.uuid,
                  conversationUuid: conversation.uuid,
                },
              })

              dispatch(
                removeFriendEntry({
                  profileUuid: conversation.conversee.uuid,
                  friends: loggedInUser.user?.friends,
                })
              )

              dispatch(
                removeConversation({
                  conversationUuid: conversation.uuid,
                })
              )

              dispatch(setActiveConversationSet(false))
              dispatch(setActiveConversee(null))
              dispatch(setActiveConversation(null))
              dispatch(setShouldPauseCheckHasMore(false))

              if (unfriendResponse) {
                socket.emit('unfriend', {
                  content:
                    loggedInUser.user?.profile?.username + ' unfriended you.',
                  from: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  to: conversation.conversee.uuid,
                  toUsername: conversation.conversee.username,
                  conversationUuid: conversation.uuid,
                })
              }
            }}
          >
            Unfriend
          </MenuItem>

          <MenuItem
            bg="bg-gray-800"
            className="bg-gray-800"
            icon={<EditIcon />}
          >
            Block
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default PrivateConversationListing
