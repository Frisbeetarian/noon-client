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
import { getSearchQuery, setSearchQuery } from '../store/search'
import withAxios from '../utils/withAxios'

function SearchSidebar() {
  const dispatch = useDispatch()
  const searchComponentState = useSelector(getSearchComponentState)
  const [, setSearchInput] = useState(null)
  const searchQuery = useSelector(getSearchQuery)

  return (
    <div className="search-sidebar bg-black md:w-3/4 xl:w-2/5">
      <Flex
        className="flex-col items-start justify-start"
        style={{ flex: '0.7' }}
      >
        <p className="text-xl mt-4 mb-4">Search for profiles</p>
      </Flex>

      <Flex className="flex-col items-center relative" style={{ flex: '0.3' }}>
        <InputGroup className="mb-10">
          <InputRightElement
            children={<SearchIcon color="#921A1C" />}
            pointerEvents="none"
          />

          <Input
            autoFocus
            type="text"
            className="m-0  bg-transparent  pl-2 text-white"
            placeholder="Search for profiles..."
            size="md"
            border={0}
            borderBottom="1px solid #921A1C"
            style={{
              padding: searchComponentState.inputPadding,
              transition: 'all .5s',
              position: searchComponentState.containerDisplay,
              right: 0,
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
      <CloseButton
        className="bg-black p-1 absolute top-0 right-5 m-4 text-2xl cursor-pointer"
        color="#921A1C"
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
    </div>
  )
}
export default withAxios(SearchSidebar)
