import { useSelector } from 'react-redux'
import { getSearchQuery } from '../../store/search'
import {
  useSearchForProfileByUsernameQuery,
  useSearchForProfileByUuidQuery,
} from '../../generated/graphql'
import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function SearchController() {
  const searchQuery = useSelector(getSearchQuery)
  // let searchResults = null
  let [searchResults, setSearchResults] = useState(null)
  const [{ data }] = useSearchForProfileByUsernameQuery({
    variables: { username: searchQuery },
  })

  // const [{ data: searchResults }] = useSearchForProfileByUuidQuery({
  //   variables: {
  //     profileUuid: loggedInUser.user?.profile?.uuid,
  //   },
  // })

  // useEffect(() => {
  //   if (data?.searchForProfileByUsername != null) {
  //     setSearchResults(data?.searchForProfileByUsername)
  //   }
  // }, [data])
  console.log('search results:', data?.searchForProfileByUsername)

  return <Flex></Flex>
}
