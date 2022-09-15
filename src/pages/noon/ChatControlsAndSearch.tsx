import { Button, Flex } from '@chakra-ui/react'
import { SearchIcon, ArrowUpIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getActiveConversee } from '../../store/chat'
import { useSearchForProfileByUsernameQuery } from '../../generated/graphql'
import { useQuery } from 'urql'
function ChatControlsAndSearch() {
  const profile = useSelector(getActiveConversee)
  // let containerHeight = '0.05'

  let [containerHeight, setContainerHeight] = useState('0.05')
  let [containerDisplay, setContainerDisplay] = useState('relative')
  let [inputPadding, setInputPadding] = useState('5px')

  // const [{ data: searchResults }, executeQuery] = useQuery({
  //   query: useSearchForProfileByUsernameQuery(),
  //   pause: true,
  // })

  const [{ data, error, loading }, refetchCurrent] = useLazyQuery({
    query: GraphQLAPI.queries.GetActivityStatsUser,
    requestPolicy: 'network-only',
  })

  return (
    <Flex
      className="items-center justify-between border-b px-3"
      style={{
        position: containerDisplay,
        flex: containerHeight,
        transition: 'all .5s easein',
      }}
    >
      <p className="m-0 p-0">{profile?.username}</p>

      <Flex className="items-center">
        <input
          type="text"
          className="m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800"
          onClick={() => {
            setContainerDisplay('sticky')
            setContainerHeight('0.5')
            setInputPadding('10px')
          }}
          style={{ padding: inputPadding, transition: 'all .5s easein' }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // executeQuery({ variables: { username: 'fatima' } })
            }
          }}
        />

        <SearchIcon className="absolute right-6" />

        {containerDisplay === 'sticky' ? (
          <ArrowUpIcon
            className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"
            onClick={() => {
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
