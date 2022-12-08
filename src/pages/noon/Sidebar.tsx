import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useLogoutMutation,
  useUnfriendMutation,
  useLeaveGroupMutation,
} from '../../generated/graphql'

import { getLoggedInUser, removeFriendEntry } from '../../store/users'
import { SettingsIcon, HamburgerIcon, EditIcon } from '@chakra-ui/icons'

import {
  Avatar,
  AvatarBadge,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import {
  getSortedConversations,
  removeConversation,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setShouldPauseCheckHasMore,
  getActiveConversation,
  setActiveGroupInStore,
} from '../../store/chat'

import SocketConnector from '../../components/SocketIo/SocketConnector'
import { useRouter } from 'next/router'
import { getSocket } from '../../store/sockets'

import {
  setChatContainerHeight,
  setCreateGroupComponent,
  setSearchComponent,
} from '../../store/ui'

import { setVideoFrameForConversation } from '../../store/video'

function Sidebar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [, unfriend] = useUnfriendMutation()
  const [, leaveGroup] = useLeaveGroupMutation()
  const loggedInUser = useSelector(getLoggedInUser)

  const activeConversation = useSelector(getActiveConversation)
  const getConversationsFromStore = useSelector(getSortedConversations)
  const [profile, setProfile] = useState()

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

    dispatch(setChatContainerHeight('87.5vh'))
  }

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
    <div
      className="flex flex-col bg-neutral text-white box-content scroll-auto"
      style={{ flex: '0.25', height: '100vh' }}
    >
      <Flex
        className="items-center justify-between border-b"
        style={{ flex: '0.05' }}
      >
        <Heading className="w-full px-4">Noon</Heading>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            className="mr-3"
          />

          <MenuList>
            <MenuItem
              icon={<EditIcon />}
              onClick={async () => {
                dispatch(setActiveConversationSet(false))
                dispatch(setActiveConversee(null))
                dispatch(setActiveConversation(null))
                dispatch(setShouldPauseCheckHasMore(false))
                dispatch(setCreateGroupComponent(true))

                dispatch(
                  setSearchComponent({
                    searchActive: false,
                    containerDisplay: 'relative',
                    containerHeight: '5vh',
                    inputPadding: '5px',
                  })
                )
              }}
            >
              Create group
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        className="flex-col pt-3 scroll-auto overflow-auto"
        style={{ flex: '0.875' }}
      >
        {getConversationsFromStore
          ? [...Object.values(getConversationsFromStore)].map(
              (conversation, i) =>
                !conversation ? null : conversation.type === 'pm' ? (
                  <Flex
                    key={conversation.uuid}
                    tabindex="0"
                    className="items-center justify-between p-3 pl-5 border-b border-b-base-300 border-b-amber-100 hover:border-sky-500 focus:outline-none focus:border-sky-700 focus-within:shadow-lg"
                    style={{ transition: 'all .25s ' }}
                  >
                    <Flex
                      className="items-center cursor-pointer flex-1"
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
                            const unfriendResponse = await unfriend({
                              profileUuid: conversation.conversee.uuid,
                              conversationUuid: conversation.uuid,
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
                                  loggedInUser.user?.profile?.username +
                                  ' unfriended you.',
                                from: loggedInUser.user?.profile?.uuid,
                                fromUsername:
                                  loggedInUser.user?.profile?.username,
                                to: conversation.conversee.uuid,
                                toUsername: conversation.conversee.username,
                                conversationUuid: conversation.uuid,
                              })
                            }
                          }}
                        >
                          Unfriend
                        </MenuItem>

                        <MenuItem icon={<EditIcon />}>Block</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                ) : (
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
                        // setActiveConverseeFunction(
                        //   conversation.conversee,
                        //   conversation
                        // )
                        // setProfile(conversation.conversee)
                      }}
                    >
                      <Avatar
                        key={i}
                        name={conversation.name}
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

                            console.log(
                              'leave group response:',
                              leaveGroupResponse
                            )

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
                              let participantsToSend = []

                              conversation.profiles.map((profile) => {
                                if (
                                  profile.uuid !==
                                  loggedInUser.user?.profile?.uuid
                                ) {
                                  participantsToSend.push(profile.uuid)
                                }
                              })

                              socket.emit('left-group', {
                                fromUuid: loggedInUser.user?.profile?.uuid,
                                fromUsername:
                                  loggedInUser.user?.profile?.username,
                                conversationUuid: conversation.uuid,
                                participants: participantsToSend,
                              })
                            }

                            // const unfriendResponse = await unfriend({
                            //   profileUuid: conversation.conversee.uuid,
                            //   conversationUuid: conversation.uuid,
                            // })
                            // dispatch(
                            //   removeFriendEntry({
                            //     profileUuid: conversation.conversee.uuid,
                            //     friends: loggedInUser.user?.friends,
                            //   })
                            // )
                            // dispatch(
                            //   removeConversation({
                            //     conversationUuid: conversation.uuid,
                            //   })
                            // )
                            // if (unfriendResponse) {
                            //   socket.emit('unfriend', {
                            //     content:
                            //       loggedInUser.user?.profile?.username +
                            //       ' unfriended you.',
                            //     from: loggedInUser.user?.profile?.uuid,
                            //     fromUsername:
                            //       loggedInUser.user?.profile?.username,
                            //     to: conversation.conversee.uuid,
                            //     toUsername: conversation.conversee.username,
                            //     conversationUuid: conversation.uuid,
                            //   })
                            // }
                          }}
                        >
                          Leave group
                        </MenuItem>

                        {/* <MenuItem icon={<EditIcon />}>Block</MenuItem> */}
                      </MenuList>
                    </Menu>
                  </Flex>
                )
            )
          : null}
      </Flex>

      <Flex
        className="flex justify-between items-center border-t box-content"
        style={{ flex: '0.075' }}
      >
        <Flex className="items-center px-2 ">
          <Avatar size="md" />
          <p className="ml-2 text-md">{loggedInUser.user?.profile?.username}</p>
          <SocketConnector />
        </Flex>

        <Flex className="px-3 justify-between">
          <Menu>
            <MenuButton>
              <SettingsIcon />
            </MenuButton>

            <MenuList>
              <MenuItem
                onClick={async () => {
                  await logout()
                  router.push('/')
                  // router.reload()
                }}
                // isLoading={fetching}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {/*</div>*/}
    </div>
  )
}

export default Sidebar
