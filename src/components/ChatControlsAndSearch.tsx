import {
  Flex,
  // useOutsideClick,
} from '@chakra-ui/react'
import { SearchIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  setSearchComponent,
  getIsMobile,
  setConversationOpen,
  getIsSearchActive,
} from '../store/ui'
import SearchSidebar from './SearchSidebar'

function ChatControlsAndSearch() {
  const dispatch = useDispatch()
  const isMobile = useSelector(getIsMobile)
  const searchActive = useSelector(getIsSearchActive)

  // useOutsideClick({
  //   ref: ref as unknown as RefObject<HTMLElement>,
  //   handler: () => {
  //     dispatch(setSearchQuery(null))
  //     setSearchInput(null)
  //
  //     dispatch(
  //       setSearchComponent({
  //         searchActive: false,
  //         containerDisplay: 'relative',
  //         containerHeight: '5vh',
  //         inputPadding: '5px',
  //       })
  //     )
  //
  //     dispatch(setChatContainerHeight('87.5vh'))
  //   },
  // })

  return (
    <Flex className="flex-col border-b px-3 w-full h-full md:py-0">
      <Flex className="px-3 md:h-full w-full items-center justify-start md:justify-center relative ">
        {searchActive && <SearchSidebar />}

        <SearchIcon
          className=" p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"
          onClick={() => {
            dispatch(
              setSearchComponent({
                searchActive: true,
              })
            )
          }}
        />

        {isMobile && (
          <ArrowLeftIcon
            className=" p-1 absolute top-0 left-0 m-4 text-xl cursor-pointer "
            onClick={() => {
              dispatch(setConversationOpen(false))
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default ChatControlsAndSearch
