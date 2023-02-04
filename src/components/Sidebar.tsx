import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../generated/graphql'

import { getLoggedInUser } from '../store/users'
import {
  SettingsIcon,
  HamburgerIcon,
  EditIcon,
  SearchIcon,
} from '@chakra-ui/icons'

import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import {
  // getActiveConversation,
  getSortedConversations,
} from '../store/chat'

import SocketConnector from './SocketIo/SocketConnector'
import { useRouter } from 'next/router'

import {
  getIsConversationOpen,
  getIsMobile,
  getSearchComponentState,
  setChatContainerHeight,
  setSearchComponent,
  toggleCreateGroupActive,
} from '../store/ui'

import PrivateConversationListing from './PrivateConversationListing'
import GroupConversationListing from './GroupConversationListing'
import ChatControlsAndSearchForMobile from './ChatControlsAndSearchForMobile'
import SocketControls from './SocketIo/SocketControls'

function Sidebar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const isMobile = useSelector(getIsMobile)
  const searchComponentState = useSelector(getSearchComponentState)
  const [innerHeight, setInnerHeight] = useState(0)

  const [
    logout,
    // { loading: logoutLoading }
  ] = useLogoutMutation()
  const loggedInUser = useSelector(getLoggedInUser)
  const isConversationOpen = useSelector(getIsConversationOpen)
  const getConversationsFromStore = useSelector(getSortedConversations)
  // const activeConversation = useSelector(getActiveConversation)

  useEffect(() => {
    setInnerHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setInnerHeight(window.innerHeight)
    })

    return () => {
      window.removeEventListener('resize', () => {
        console.log('removed')
      })
    }
  })

  return (
    <div
      className={
        isMobile && isConversationOpen
          ? 'absolute z-0 opacity-0'
          : 'flex flex-col bg-neutral text-white box-content scroll-auto relative'
      }
      style={
        isMobile
          ? { flex: '1', height: innerHeight, zIndex: '50' }
          : { flex: '0.25', height: innerHeight }
      }
    >
      <Flex
        className="items-center flex-col md:flex-row justify-between border-b"
        style={{ flex: '0.05' }}
      >
        <Flex className="w-full items-center">
          <Heading className="w-full px-4 py-4 md:py-0">Noon</Heading>

          {isMobile && (
            <IconButton
              bg="transparent"
              className="mr-4 cursor-pointer"
              children={<SearchIcon color="green.500" />}
              aria-label="search icon"
              onClick={() => {
                dispatch(setChatContainerHeight('52.5vh'))
                dispatch(
                  setSearchComponent({
                    searchActive: true,
                    containerDisplay: 'relative',
                    containerHeight: '40vh',
                    inputPadding: '10px',
                  })
                )
              }}
            />
          )}

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
                  // dispatch(setActiveConversationSet(false))
                  // dispatch(setActiveConversee(null))
                  // dispatch(setActiveConversation(null))
                  // dispatch(setShouldPauseCheckHasMore(false))
                  // dispatch(setCreateGroupComponent(true))
                  //
                  // dispatch(
                  //   setSearchComponent({
                  //     searchActive: false,
                  //     containerDisplay: 'relative',
                  //     containerHeight: '5vh',
                  //     inputPadding: '5px',
                  //   })
                  // )

                  dispatch(toggleCreateGroupActive(true))
                }}
              >
                Create group
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {isMobile && searchComponentState.searchActive ? (
          <Flex className="w-full ">
            <ChatControlsAndSearchForMobile />
          </Flex>
        ) : null}
      </Flex>

      <Flex
        className="flex-col pt-3 scroll-auto overflow-auto"
        style={{ flex: '0.875' }}
      >
        {getConversationsFromStore
          ? [...Object.values(getConversationsFromStore)].map(
              (conversation, i) =>
                !conversation ? null : (conversation as any).type === 'pm' ? (
                  <PrivateConversationListing
                    key={i}
                    conversation={conversation}
                    i={i}
                  />
                ) : (
                  <GroupConversationListing
                    conversation={conversation}
                    i={i}
                    key={i}
                  />
                )
            )
          : null}
      </Flex>

      <Flex
        className="flex justify-between items-center border-t box-content py-4 md:py-0 px-4 md:px-0"
        style={{ flex: '0.075' }}
      >
        <Flex className="items-center px-2">
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
                bg="bg-gray-800"
                className="bg-gray-800"
                onClick={async () => {
                  await logout()
                  await router.push('/')
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

      {isMobile && <SocketControls />}
    </div>
  )
}

export default Sidebar
