import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react'
import {
  SettingsIcon,
  HamburgerIcon,
  EditIcon,
  SearchIcon,
} from '@chakra-ui/icons'

import { getLoggedInUser } from '../store/users'
import { getSortedConversations, setConversations } from '../store/chat'
import SocketConnector from './SocketIo/SocketConnector'
import {
  getIsConversationOpen,
  getIsMobile,
  getSearchComponentState,
  setChatContainerHeight,
  setCreateGroupComponent,
  setSearchComponent,
  toggleCreateGroupActive,
} from '../store/ui'
import PrivateConversationListing from './PrivateConversationListing'
import GroupConversationListing from './GroupConversationListing'
import ChatControlsAndSearchForMobile from './ChatControlsAndSearchForMobile'
import SocketControls from './SocketIo/SocketControls'
import withAxios from '../utils/withAxios'
import AppMenuList from './AppComponents/AppMenuList'
import { useGetConversationsQuery } from '../store/api/conversationsApiSlice'
import { useLogoutUserMutation } from '../store/api/usersApiSlice'
import { AiOutlineUser } from 'react-icons/ai'

function Sidebar({ axios }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const isMobile: number = useSelector(getIsMobile)
  const searchComponentState = useSelector(getSearchComponentState)
  const [innerHeight, setInnerHeight] = useState(0)
  const { data: conversations, isLoading } = useGetConversationsQuery(undefined)
  const [logoutUser] = useLogoutUserMutation(undefined)

  const loggedInUser = useSelector(getLoggedInUser)
  const isConversationOpen = useSelector(getIsConversationOpen)
  const getConversationsFromStore = useSelector(getSortedConversations)

  useEffect(() => {
    if (conversations && loggedInUser.user.username) {
      dispatch(
        setConversations({
          conversationsToSend: conversations,
          loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
        })
      )
    }
  }, [conversations, dispatch])

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
        className="items-center flex-col md:flex-row justify-between border-b border-red-500"
        style={{ flex: '0.051' }}
      >
        <Flex className="w-full items-center">
          <Heading className="w-full px-4 py-4 md:py-0 text-red-500">
            NOON
          </Heading>

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
              color="black"
              className="mr-3 bg-red-500 text-black"
              border="none"
              borderRadius="0"
            />

            <AppMenuList
              bg="black"
              className="bg-red-500 text-black"
              border="none"
              borderRadius="0"
            >
              <MenuItem
                bg="black"
                className="bg-red-500 text-black"
                border="none"
                icon={<EditIcon />}
                onClick={async () => {
                  // dispatch(setActiveConversationSet(false))
                  // dispatch(setActiveConversee(null))
                  // dispatch(setActiveConversation(null))
                  // dispatch(setShouldPauseCheckHasMore(false))
                  dispatch(setCreateGroupComponent(true))

                  dispatch(
                    setSearchComponent({
                      searchActive: false,
                      containerDisplay: 'relative',
                      containerHeight: '5vh',
                      inputPadding: '5px',
                    })
                  )

                  dispatch(toggleCreateGroupActive(true))
                }}
              >
                Create group
              </MenuItem>
            </AppMenuList>
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
        {isLoading ? (
          <Flex className="items-center justify-center">
            <Spinner />
          </Flex>
        ) : getConversationsFromStore &&
          getConversationsFromStore.length !== 0 ? (
          [...Object.values(getConversationsFromStore)].map((conversation, i) =>
            !conversation ? null : (conversation as any).type === 'pm' ? (
              <PrivateConversationListing
                key={i}
                conversation={conversation}
                i={i}
                axios={axios}
              />
            ) : (
              <GroupConversationListing
                conversation={conversation}
                i={i}
                key={i}
              />
            )
          )
        ) : (
          <p className="w-3/4 p-5">
            No conversations yet. Use the search component to look for people to
            send friend requests to. Click on the search icon to search for
            profiles. Once you find the profile you want to befriend, send them
            a friend request. Once they accept the friend request, you will
            become friends and a conversation will be visible on this dashboard.
          </p>
        )}
      </Flex>

      <Flex
        className="flex justify-between items-center border-t border-red-500 box-content py-4 md:py-0 px-4 md:px-0"
        style={{ flex: '0.075' }}
      >
        <Flex className="items-center px-2">
          <Avatar
            size="md"
            bg="red.500"
            icon={<AiOutlineUser fontSize="1.5rem" />}
          />
          <p className="ml-2 text-lg text-white">
            {loggedInUser.user?.profile?.username}
          </p>
          <SocketConnector />
        </Flex>

        <Flex className="px-3 justify-between">
          <Menu>
            <MenuButton>
              <SettingsIcon color="#921A1C" />
            </MenuButton>

            <MenuList className="bg-black" bg="bg-black" border="none">
              <MenuItem
                bg="bg-black"
                className="bg-black"
                border="none"
                onClick={async () => {
                  try {
                    await logoutUser(undefined).unwrap()
                    router.replace('/')
                  } catch (error) {
                    console.error('Error logging out:', error)
                  }
                }}
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

export default withAxios(Sidebar)
