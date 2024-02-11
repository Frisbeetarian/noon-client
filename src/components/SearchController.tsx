import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Spinner } from '@chakra-ui/react'

import { getLoggedInUser } from '../store/users'
import { addProfiles, getProfiles } from '../store/profiles'
import Profile from './Profile'
import withAxios from '../utils/withAxios'
import {
  getSearchIsLoading,
  getSearchQuery,
  setSearchLoading,
} from '../store/search'

function SearchController({ axios }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const searchQuery = useSelector(getSearchQuery)
  const profilesFromStore = useSelector(getProfiles)
  const searchLoading = useSelector(getSearchIsLoading)

  async function searchProfiles(searchQuery) {
    await axios.post('/api/search', { query: searchQuery })
  }

  useEffect(() => {
    if (searchQuery !== '' && searchQuery !== null) {
      searchProfiles(searchQuery)
    } else {
      dispatch(setSearchLoading(false))
    }

    return () => {
      dispatch(
        addProfiles({
          profiles: [],
          loggedInUser: loggedInUser.user,
        })
      )
    }
  }, [searchQuery])

  return (
    <>
      {searchLoading ? (
        <Flex className="items-center justify-center w-full my-5">
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
