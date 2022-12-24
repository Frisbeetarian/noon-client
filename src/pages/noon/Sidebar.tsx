// @ts-nocheck
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../generated/graphql'

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
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setShouldPauseCheckHasMore,
} from '../../store/chat'

import SocketConnector from '../../components/SocketIo/SocketConnector'
import { useRouter } from 'next/router'
import { getSocket } from '../../store/sockets'

import { setCreateGroupComponent, setSearchComponent } from '../../store/ui'

import PrivateConversationListing from '../../components/PrivateConversationListing'
import GroupConversationListing from '../../components/GroupConversationListing'

function Sidebar() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const loggedInUser = useSelector(getLoggedInUser)
  const getConversationsFromStore = useSelector(getSortedConversations)

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
                  <PrivateConversationListing
                    conversation={conversation}
                    i={i}
                  />
                ) : (
                  <GroupConversationListing conversation={conversation} i={i} />
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
