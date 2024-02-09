import { useDispatch, useSelector } from 'react-redux'
import { Flex, Spinner } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { getLoggedInUser } from '../store/users'
import { addProfiles, getProfiles } from '../store/profiles'
import Profile from './Profile'
import withAxios from '../utils/withAxios'
import { getSearchQuery } from '../store/search'

function SearchController({ axios }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const searchQuery = useSelector(getSearchQuery)
  const profilesFromStore = useSelector(getProfiles)
  const [isLoading, setIsLoading] = useState(false)

  async function searchProfiles(searchQuery) {
    await axios.post('/api/search', { query: searchQuery })
  }

  useEffect(() => {
    if (profilesFromStore.length !== 0) {
      setIsLoading(false)
    }
  }, [profilesFromStore.length])

  useEffect(() => {
    if (searchQuery !== '' && searchQuery !== null) {
      searchProfiles(searchQuery)
      setIsLoading(true)
    }

    return () => {
      dispatch(
        addProfiles({
          profiles: [],
          loggedInUser: loggedInUser.user,
        })
      )
    }
  }, [loggedInUser, searchQuery])

  return (
    <>
      {isLoading ? (
        <Flex className="items-center justify-center">
          <Spinner />
        </Flex>
      ) : (
        <Flex className="w-full flex-col">
          {profilesFromStore && profilesFromStore.length !== 0 ? (
            [...Object.values(profilesFromStore)].map((profile, i) =>
              !profile ? null : (
                <Profile key={i} profile={profile} axios={axios} />
              )
            )
          ) : (
            <p>No search results</p>
          )}
        </Flex>
      )}
    </>
  )
}

export default withAxios(SearchController)
