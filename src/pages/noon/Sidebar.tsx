import React, { useState } from 'react'
import SidebarChannel from './SidebarChannel'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import {
  SmallAddIcon,
  AddIcon,
  SettingsIcon,
  BellIcon,
  CheckIcon,
  ChatIcon,
  CloseIcon,
  ArrowDownIcon,
  InfoIcon,
  PhoneIcon,
} from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Flex, Heading, Icon } from '@chakra-ui/react'
import { ImMic, ImHeadphones } from 'react-icons/all'
import {
  getSortedConversations,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
} from '../../store/chat'
import SocketConnector from '../../components/SocketIo/SocketConnector'

function Sidebar() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const getConversationsFromStore = useSelector(getSortedConversations)
  const [profile, setProfile] = useState()

  function setActiveConverseeFunction(profile, conversation) {
    dispatch(setActiveConversationSet(true))
    dispatch(setActiveConversee(profile))
    dispatch(
      setActiveConversation({
        conversation: conversation,
        loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
      })
    )
  }

  return (
    <div
      className="flex flex-col bg-neutral text-white box-content"
      style={{ flex: '0.25', height: '100vh' }}
    >
      {/*<div className="w-full h-full text-white px-4 py-2">*/}
      <Flex className="items-center border-b pb-0.5" style={{ flex: '0.05' }}>
        {/*<p className="text-xl"></p>*/}
        <Heading className=" w-full px-4">Noon</Heading>
        {/*<ArrowDownIcon />*/}
        {/*<ExpandMoreIcon />*/}
      </Flex>

      <Flex className="flex-col pt-3" style={{ flex: '0.9' }}>
        {/*<ExpandMoreIcon />*/}
        {/*<h4>Channels</h4>*/}

        {getConversationsFromStore
          ? [...Object.values(getConversationsFromStore)].map(
              (conversation, i) =>
                !conversation ? null : (
                  <Flex
                    key={conversation.uuid}
                    className="items-center p-3 pl-5 border-b border-b-base-300 border-b-amber-100 cursor-pointer"
                    onClick={() => {
                      setActiveConverseeFunction(
                        conversation.conversee,
                        conversation
                      )
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
                          <p className="text-xs">
                            {conversation.unreadMessages}
                          </p>
                        </AvatarBadge>
                      ) : null}
                    </Avatar>

                    <p>{conversation.conversee.username}</p>
                  </Flex>
                )
            )
          : null}
      </Flex>

      <Flex
        className="flex justify-between items-center border-t "
        style={{ flex: '0.05' }}
      >
        <Flex className="items-center px-2 py-4">
          <Avatar />
          <p className="ml-2 text-md">{loggedInUser.user?.profile?.username}</p>
          <SocketConnector />
        </Flex>

        <Flex className="px-3 justify-between ">
          {/*<Icon as={ImMic} />*/}
          {/*<Icon as={ImHeadphones} />*/}
          <SettingsIcon />
        </Flex>
      </Flex>
      {/*</div>*/}
    </div>
  )
}

export default Sidebar
