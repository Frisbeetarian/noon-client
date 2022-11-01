import { Button, Flex } from '@chakra-ui/react'
import { SearchIcon, ArrowUpIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveConversee } from '../../store/chat'
import SearchController from './SearchController'
import { getSearchQuery, setSearchQuery } from '../../store/search'
import { setSearchComponent, getSearchComponentState } from '../../store/ui'

function ChatControlsAndSearch() {
  const dispatch = useDispatch()
  const profile = useSelector(getActiveConversee)

  const searchQuery = useSelector(getSearchQuery)
  const searchComponentState = useSelector(getSearchComponentState)
  // let containerHeight = '0.05'

  // let [searchActive, setSearchActive] = useState(false)
  // let [containerHeight, setContainerHeight] = useState('5vh')
  // let [containerDisplay, setContainerDisplay] = useState('relative')
  // let [inputPadding, setInputPadding] = useState('5px')
  let [searchInput, setSearchInput] = useState(null)

  // const [{ data: searchResults }, executeQuery] = useQuery({
  //   query: useSearchForProfileByUsernameQuery(),
  //   pause: true,
  // })

  // const [{ data, error, loading }, refetchCurrent] = useLazyQuery({
  //   query: GraphQLAPI.queries.GetActivityStatsUser,
  //   requestPolicy: 'network-only',
  // })

  useEffect(() => {
    // return () => {
    //   effect;
    // };
  }, [searchComponentState])

  return (
    <Flex
      className="flex-col border-b px-3 w-full"
      style={{
        position: searchComponentState.containerDisplay,
        // flex: containerHeight,
        height: searchComponentState.containerHeight,
        transition: 'all .5s',
        marginTop: '+0.5px',
      }}
    >
      {/*<p className="m-0 p-0">{profile?.username}</p>*/}

      <Flex className="px-3 justify-center h-full w-full ">
        <Flex
          className="flex-col items-start justify-start "
          style={{ flex: '0.7' }}
        >
          {searchComponentState.searchActive ? (
            <p className="text-xl mt-4 mb-10">Search Results</p>
          ) : null}

          {searchInput ? (
            <Flex className="w-full" style={{ flex: '1' }}>
              <SearchController />
            </Flex>
          ) : null}
        </Flex>

        <Flex className="items-center relative" style={{ flex: '0.3' }}>
          <input
            type="text"
            className="m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800 pl-2"
            // disabled={searchActive}
            placeholder="Search"
            onClick={() => {
              // setSearchActive(true)
              // setContainerDisplay('absolute')
              // setContainerHeight('40vh')
              // setInputPadding('10px')

              dispatch(
                setSearchComponent({
                  searchActive: true,
                  containerDisplay: 'absolute',
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
          {searchComponentState.searchActive ? (
            <SearchIcon className="absolute right-5" />
          ) : (
            <SearchIcon className="absolute right-5" />
          )}
        </Flex>
        {searchComponentState.containerDisplay === 'absolute' ? (
          <ArrowUpIcon
            className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"
            onClick={() => {
              // setSearchActive(false)
              dispatch(setSearchQuery(null))
              setSearchInput(null)
              // setContainerDisplay('relative')
              // setContainerHeight('5vh')
              // setInputPadding('5px')

              dispatch(
                setSearchComponent({
                  searchActive: false,
                  containerDisplay: 'relative',
                  containerHeight: '5vh',
                  inputPadding: '5px',
                })
              )
            }}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default ChatControlsAndSearch
