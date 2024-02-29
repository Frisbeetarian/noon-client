import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { SearchIcon, ArrowUpIcon } from '@chakra-ui/icons'

import SearchController from './SearchController'
import {
  getSearchQuery,
  setSearchLoading,
  setSearchQuery,
} from '../store/search'
import {
  setSearchComponent,
  getSearchComponentState,
  setChatContainerHeight,
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
      className="flex-col px-3 w-full py-5 md:py-0 bg-black"
      style={{
        position: searchComponentState.containerDisplay,
        height: searchComponentState.containerHeight,
        transition: 'all .5s',
        marginTop: '+0.5px',
        zIndex: '200',
      }}
    >
      <Flex className="flex-col px-3 justify-start  h-full w-full ">
        <Flex className="flex-col items-start justify-start">
          {searchComponentState.searchActive ? (
            <p className="text-xl ">Search Results</p>
          ) : null}
        </Flex>

        <Flex className="relative mt-4">
          <InputGroup className="mb-10">
            <InputRightElement
              children={<SearchIcon color="#921A1C" />}
              pointerEvents="none"
            />

            <Input
              autoFocus
              type="text"
              className="m-0 bg-transparent pl-2 text-white"
              placeholder="Search..."
              size="md"
              border={0}
              borderBottom="1px solid #921A1C"
              style={{
                padding: searchComponentState.inputPadding,
                transition: 'all .5s',
                position: searchComponentState.containerDisplay,
                right: 0,
              }}
              _focus={{
                borderBottom: '1px solid white !important',
              }}
              sx={{
                '::placeholder': {
                  color: 'white',
                },
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if ((e.target as HTMLInputElement).value !== searchQuery) {
                    dispatch(setSearchQuery(null))
                    setSearchInput(null)
                    dispatch(
                      setSearchQuery((e.target as HTMLInputElement).value)
                    )
                    setSearchInput(
                      (e.target as any).value as React.SetStateAction<null>
                    )
                    dispatch(setSearchLoading(true))
                  }
                }
              }}
            />
          </InputGroup>
          {/*<InputGroup>*/}
          {/*  <InputRightElement*/}
          {/*    children={<SearchIcon color="green.500" />}*/}
          {/*    pointerEvents="none"*/}
          {/*  />*/}

          {/*  <Input*/}
          {/*    type="text"*/}
          {/*    className="m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800"*/}
          {/*    placeholder="Search"*/}
          {/*    size="md"*/}
          {/*    // rightIcon={<SearchIcon color="gray.300" />}*/}
          {/*    onClick={() => {*/}
          {/*      dispatch(setChatContainerHeight('52.5vh'))*/}
          {/*      dispatch(*/}
          {/*        setSearchComponent({*/}
          {/*          searchActive: true,*/}
          {/*          containerDisplay: 'relative',*/}
          {/*          containerHeight: '40vh',*/}
          {/*          inputPadding: '10px',*/}
          {/*        })*/}
          {/*      )*/}
          {/*    }}*/}
          {/*    style={{*/}
          {/*      padding: searchComponentState.inputPadding,*/}
          {/*      transition: 'all .5s',*/}
          {/*      position: searchComponentState.containerDisplay,*/}
          {/*      right: 0,*/}
          {/*    }}*/}
          {/*    onKeyDown={(e) => {*/}
          {/*      if (e.key === 'Enter' || e.keyCode === 13 || e.key === '13') {*/}
          {/*        if ((e.target as HTMLInputElement).value !== searchQuery) {*/}
          {/*          dispatch(setSearchQuery(null))*/}
          {/*          setSearchInput(null)*/}
          {/*          dispatch(*/}
          {/*            setSearchQuery((e.target as HTMLInputElement).value)*/}
          {/*          )*/}
          {/*          setSearchInput(*/}
          {/*            (e.target as any).value as React.SetStateAction<null>*/}
          {/*          )*/}
          {/*        }*/}
          {/*      }*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</InputGroup>*/}
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
