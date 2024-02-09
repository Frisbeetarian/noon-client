import { useDispatch, useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'

import React, { useEffect } from 'react'
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

  async function searchProfiles(searchQuery) {
    await axios.post('/api/search', { query: searchQuery })
  }

  useEffect(() => {
    if (searchQuery !== '' && searchQuery !== null) {
      searchProfiles(searchQuery)
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
    <Flex className="w-full flex-col">
      {profilesFromStore && profilesFromStore.length !== 0 ? (
        [...Object.values(profilesFromStore)].map((profile, i) =>
          !profile ? null : <Profile key={i} profile={profile} axios={axios} />
        )
      ) : (
        <p>fkewjbfoeuwbfeowubfwe</p>
      )}
    </Flex>
  )
}

export default withAxios(SearchController)
