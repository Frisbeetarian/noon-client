// @ts-nocheck
import React, { useState } from 'react'
import {
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  useToast,
} from '@chakra-ui/react'
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'

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
import AppMenuList from './AppComponents/AppMenuList'
import { AiOutlineUser } from 'react-icons/ai'

function PrivateConversationListing({ conversation, i, axios }) {
  const [, setProfile] = useState()
  const toast = useToast()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const isMobile = useSelector(getIsMobile)

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
      className="items-center justify-between p-3 pl-5 border-b border-b-base-300 border-b-red-800 hover:border-b-red-500 focus:outline-none"
      style={{
        transition: 'all .0s',
        ...(activeConversation && activeConversation.uuid === conversation.uuid
          ? {
              backgroundColor: '#921A1C',
              outline: 'none',
              boxShadow: 'none',
              border: 'none',
            }
          : null),
      }}
    >
      {conversation.conversee ? (
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
            className="mr-2 text-white "
            bg="red.500"
            icon={<AiOutlineUser fontSize="1rem" />}
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
      ) : null}

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
            className="bg-black text-black"
            border="none"
            icon={<EditIcon />}
            onClick={async () => {
              await axios
                .post('/api/profiles/unfriend', {
                  profileUuid: conversation.conversee.uuid,
                  conversationUuid: conversation.uuid,
                })
                .then((response) => {
                  if (response.status === 200) {
                    dispatch(
                      removeFriendEntry({
                        profileUuid: conversation.conversee.uuid,
                        friends: loggedInUser.user?.profile?.friends,
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
                  }
                })
                .catch((error) => {
                  console.error(error)

                  toast({
                    title: `Error unfriending profile.`,
                    position: 'bottom-right',
                    isClosable: true,
                    status: 'error',
                    duration: 5000,
                  })
                })
            }}
          >
            Unfriend
          </MenuItem>

          <MenuItem
            bg="black"
            className="bg-red-500 text-black"
            border="none"
            icon={<EditIcon />}
          >
            Block
          </MenuItem>
        </AppMenuList>
      </Menu>
    </Flex>
  )
}

export default PrivateConversationListing
