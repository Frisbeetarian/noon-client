import { Button, Flex } from '@chakra-ui/react'
import { SearchIcon, ArrowUpIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveConversee } from '../../store/chat'
import { useSearchForProfileByUsernameQuery } from '../../generated/graphql'
import { useQuery } from 'urql'
import SearchController from './SearchController'
import { getSearchQuery, setProfiles, setSearchQuery } from '../../store/search'

function ChatControlsAndSearch() {
  const dispatch = useDispatch()
  const profile = useSelector(getActiveConversee)
  const searchQuery = useSelector(getSearchQuery)
  // let containerHeight = '0.05'

  let [searchActive, setSearchActive] = useState(false)
  let [containerHeight, setContainerHeight] = useState('0.05')
  let [containerDisplay, setContainerDisplay] = useState('relative')
  let [inputPadding, setInputPadding] = useState('5px')
  let [searchInput, setSearchInput] = useState(null)

  // const [{ data: searchResults }, executeQuery] = useQuery({
  //   query: useSearchForProfileByUsernameQuery(),
  //   pause: true,
  // })

  // const [{ data, error, loading }, refetchCurrent] = useLazyQuery({
  //   query: GraphQLAPI.queries.GetActivityStatsUser,
  //   requestPolicy: 'network-only',
  // })

  return (
    <Flex
      className="border-b px-3"
      style={{
        position: containerDisplay,
        flex: containerHeight,
        transition: 'all .5s ',
      }}
    >
      {/*<p className="m-0 p-0">{profile?.username}</p>*/}

      <Flex className="flex-col items-start pt-4" style={{ flex: '0.7' }}>
        {searchActive ? <p className="text-xl mb-10">Search Results</p> : null}
        {searchInput ? (
          <Flex className="w-full" style={{ flex: '1' }}>
            <SearchController />
          </Flex>
        ) : null}
      </Flex>

      <Flex className="items-center relative" style={{ flex: '0.3' }}>
        <input
          type="text"
          className="m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800"
          // disabled={searchActive}
          onClick={() => {
            setSearchActive(true)
            setContainerDisplay('sticky')
            setContainerHeight('0.5')
            setInputPadding('10px')
          }}
          style={{
            padding: inputPadding,
            transition: 'all .5s',
            position: containerDisplay,
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // alert(e.target.value)
              if (e.target.value !== searchQuery) {
                dispatch(setSearchQuery(null))
                setSearchInput(null)

                dispatch(setSearchQuery(e.target.value))
                setSearchInput(e.target.value)
              }

              // executeQuery({ variables: { username: 'fatima' } })
            }
          }}
        />

        <SearchIcon className="absolute right-6" />

        {containerDisplay === 'sticky' ? (
          <ArrowUpIcon
            className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"
            onClick={() => {
              setSearchActive(false)
              dispatch(setSearchQuery(null))
              setSearchInput(null)
              setContainerDisplay('relative')
              setContainerHeight('0.05')
              setInputPadding('5px')
            }}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default ChatControlsAndSearch
