import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import { getSearchComponentState, setSearchComponent } from '../store/ui'
import SearchController from './SearchController'
import {
  getSearchQuery,
  setSearchLoading,
  setSearchQuery,
} from '../store/search'
import withAxios from '../utils/withAxios'

function SearchSidebar() {
  const dispatch = useDispatch()
  const searchComponentState = useSelector(getSearchComponentState)
  const [, setSearchInput] = useState(null)
  const searchQuery = useSelector(getSearchQuery)

  return (
    <div className="search-sidebar bg-black md:w-3/4 xl:w-2/5">
      <Flex
        className="justify-center bg-red-500 p-5 mb-5 flex-col border-b border-red-500 border-l border-l-black"
        style={{ height: '5vh' }}
      >
        <h1 className="text-xl text-white border-red-500">
          Search for profiles
        </h1>

        <CloseButton
          className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer text-black"
          onClick={() => {
            dispatch(setSearchQuery(null))
            setSearchInput(null)

            dispatch(
              setSearchComponent({
                searchActive: false,
              })
            )
          }}
        />
      </Flex>

      <Flex
        className="flex-col items-center relative p-5 pt-3"
        style={{ flex: '0.3' }}
      >
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
                  dispatch(setSearchQuery((e.target as HTMLInputElement).value))
                  setSearchInput(
                    (e.target as any).value as React.SetStateAction<null>
                  )
                  dispatch(setSearchLoading(true))
                }
              }
            }}
          />
        </InputGroup>

        <Flex className="w-full " style={{ flex: '1' }}>
          <SearchController />
        </Flex>
      </Flex>

      {/*{searchComponentState.searchActive ? (*/}
    </div>
  )
}
export default withAxios(SearchSidebar)
