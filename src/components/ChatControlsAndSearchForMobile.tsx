import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  // useOutsideClick,
} from '@chakra-ui/react'
import { SearchIcon, ArrowUpIcon } from '@chakra-ui/icons'
import React, {
  // RefObject,
  useState,
} from 'react'

import { useDispatch, useSelector } from 'react-redux'
// import { getActiveConversee } from '../../store/chat'
import SearchController from './SearchController'
import { getSearchQuery, setSearchQuery } from '../store/search'

import {
  setSearchComponent,
  getSearchComponentState,
  setChatContainerHeight,
  // getIsMobile,
  // setConversationOpen,
} from '../store/ui'

function ChatControlsAndSearchForMobile() {
  const ref = React.useRef()
  const dispatch = useDispatch()
  // const profile = useSelector(getActiveConversee)
  // const isMobile = useSelector(getIsMobile)

  const searchQuery = useSelector(getSearchQuery)
  const searchComponentState = useSelector(getSearchComponentState)
  const [searchInput, setSearchInput] = useState(null)

  return (
    <Flex
      ref={ref.current}
      className="flex-col px-3 w-full py-5 md:py-0 "
      style={{
        position: searchComponentState.containerDisplay,
        height: searchComponentState.containerHeight,
        transition: 'all .5s',
        marginTop: '+0.5px',
      }}
    >
      <Flex className="flex-col px-3 justify-start  h-full w-full ">
        <Flex className="flex-col items-start justify-start">
          {searchComponentState.searchActive ? (
            <p className="text-xl ">Search Results</p>
          ) : null}
        </Flex>

        <Flex className=" relative mt-4">
          <InputGroup>
            <InputRightElement
              children={<SearchIcon color="green.500" />}
              pointerEvents="none"
            />

            <Input
              type="text"
              className="m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800"
              placeholder="Search"
              size="md"
              // rightIcon={<SearchIcon color="gray.300" />}
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
              style={{
                padding: searchComponentState.inputPadding,
                transition: 'all .5s',
                position: searchComponentState.containerDisplay,
                right: 0,
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.keyCode === 13 || e.key === '13') {
                  if ((e.target as HTMLInputElement).value !== searchQuery) {
                    dispatch(setSearchQuery(null))
                    setSearchInput(null)
                    dispatch(
                      setSearchQuery((e.target as HTMLInputElement).value)
                    )
                    setSearchInput(
                      (e.target as any).value as React.SetStateAction<null>
                    )
                  }
                }
              }}
            />
          </InputGroup>
        </Flex>

        {searchInput && searchComponentState.searchActive ? (
          <Flex className="w-full mt-4" style={{ flex: '1' }}>
            <SearchController />
          </Flex>
        ) : null}
        {searchComponentState.searchActive ? (
          <ArrowUpIcon
            className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"
            onClick={() => {
              dispatch(setSearchQuery(null))
              setSearchInput(null)

              dispatch(
                setSearchComponent({
                  searchActive: false,
                  containerDisplay: 'relative',
                  containerHeight: '5vh',
                  inputPadding: '5px',
                })
              )

              dispatch(setChatContainerHeight('87.5vh'))
            }}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default ChatControlsAndSearchForMobile
