import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  // useOutsideClick,
} from '@chakra-ui/react'
import {
  SearchIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@chakra-ui/icons'
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
  getIsMobile,
  setConversationOpen,
  getIsSearchActive,
} from '../store/ui'
import SearchSidebar from './SearchSidebar'
import { IoOpen, MdOpenInBrowser } from 'react-icons/all'

function ChatControlsAndSearch() {
  const dispatch = useDispatch()
  // const profile = useSelector(getActiveConversee)
  const isMobile = useSelector(getIsMobile)

  const searchQuery = useSelector(getSearchQuery)
  const searchComponentState = useSelector(getSearchComponentState)
  const [searchInput, setSearchInput] = useState(null)
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

        {/*<div*/}
        {/*  className="flex items-center cursor-pointer h-[7.5vh]"*/}
        {/*  onClick={() => {*/}
        {/*    dispatch(setConversationOpen(false))*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {isMobile && `<`}*/}
        {/*</div>*/}

        {/*{!isMobile && (*/}
        {/*  <>*/}
        {/*    <Flex*/}
        {/*      className="flex-col items-start justify-start"*/}
        {/*      style={{ flex: '0.7' }}*/}
        {/*    >*/}
        {/*      {searchComponentState.searchActive ? (*/}
        {/*        <p className="text-xl mt-4 mb-10">Search Results</p>*/}
        {/*      ) : null}*/}

        {/*      {searchInput && searchComponentState.searchActive ? (*/}
        {/*        <Flex className="w-full" style={{ flex: '1' }}>*/}
        {/*          <SearchController />*/}
        {/*        </Flex>*/}
        {/*      ) : null}*/}
        {/*    </Flex>*/}
        {/*    <Flex className="items-center relative" style={{ flex: '0.3' }}>*/}
        {/*      <InputGroup>*/}
        {/*        <InputRightElement*/}
        {/*          children={<SearchIcon color="green.500" />}*/}
        {/*          pointerEvents="none"*/}
        {/*        />*/}

        {/*        <Input*/}
        {/*          type="text"*/}
        {/*          className="m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800 pl-2"*/}
        {/*          placeholder="Search for profiles..."*/}
        {/*          size="md"*/}
        {/*          // rightIcon={<SearchIcon color="gray.300" />}*/}
        {/*          onClick={() => {*/}
        {/*            dispatch(setChatContainerHeight('52.5vh'))*/}
        {/*            dispatch(*/}
        {/*              setSearchComponent({*/}
        {/*                searchActive: true,*/}
        {/*                containerDisplay: 'relative',*/}
        {/*                containerHeight: '40vh',*/}
        {/*                inputPadding: '10px',*/}
        {/*              })*/}
        {/*            )*/}
        {/*          }}*/}
        {/*          style={{*/}
        {/*            padding: searchComponentState.inputPadding,*/}
        {/*            transition: 'all .5s',*/}
        {/*            position: searchComponentState.containerDisplay,*/}
        {/*            right: 0,*/}
        {/*          }}*/}
        {/*          onKeyPress={(e) => {*/}
        {/*            if (e.key === 'Enter') {*/}
        {/*              if (*/}
        {/*                (e.target as HTMLInputElement).value !== searchQuery*/}
        {/*              ) {*/}
        {/*                dispatch(setSearchQuery(null))*/}
        {/*                setSearchInput(null)*/}
        {/*                dispatch(*/}
        {/*                  setSearchQuery((e.target as HTMLInputElement).value)*/}
        {/*                )*/}
        {/*                setSearchInput(*/}
        {/*                  (e.target as any).value as React.SetStateAction<null>*/}
        {/*                )*/}
        {/*              }*/}
        {/*            }*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </InputGroup>*/}
        {/*    </Flex>*/}

        {/*    {searchComponentState.searchActive ? (*/}
        {/*      <ArrowUpIcon*/}
        {/*        className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"*/}
        {/*        onClick={() => {*/}
        {/*          dispatch(setSearchQuery(null))*/}
        {/*          setSearchInput(null)*/}

        {/*          dispatch(*/}
        {/*            setSearchComponent({*/}
        {/*              searchActive: false,*/}
        {/*              containerDisplay: 'relative',*/}
        {/*              containerHeight: '5vh',*/}
        {/*              inputPadding: '5px',*/}
        {/*            })*/}
        {/*          )*/}

        {/*          dispatch(setChatContainerHeight('87.5vh'))*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    ) : null}*/}
        {/*  </>*/}
        {/*)}*/}
      </Flex>
    </Flex>
  )
}

export default ChatControlsAndSearch
