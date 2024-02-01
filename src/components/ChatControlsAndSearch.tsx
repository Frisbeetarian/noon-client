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
import Header from './Header'
import withAxios from '../utils/withAxios'

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
    <Flex
      className={
        isMobile
          ? 'justify-between items-center px-3 w-full md:py-0  h-1/2'
          : 'justify-end items-center px-3 w-full md:py-0  h-1/2'
      }
    >
      {searchActive && <SearchSidebar />}

      {isMobile && (
        <Flex className="items-center">
          <ArrowLeftIcon
            className=" p-1 m-4 text-xl cursor-pointer "
            onClick={() => {
              dispatch(setConversationOpen(false))
            }}
          />
          <Header></Header>
        </Flex>
      )}

      <SearchIcon
        color="black"
        className="p-1 m-4 text-2xl cursor-pointer"
        onClick={() => {
          dispatch(
            setSearchComponent({
              searchActive: true,
            })
          )
        }}
      />
    </Flex>
  )
}

export default withAxios(ChatControlsAndSearch)
