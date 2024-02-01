import { useDispatch, useSelector } from 'react-redux'
import { getSearchQuery } from '../store/search'

import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { getLoggedInUser } from '../store/users'
import { addProfiles, getProfiles } from '../store/profiles'
import Profile from './Profile'
import SocketManager from './SocketIo/SocketManager'
import { getSocketAuthObject } from '../store/sockets'
import withAxios from '../utils/withAxios'

function SearchController({ axios }) {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(getLoggedInUser)
  const searchQuery = useSelector(getSearchQuery)
  const profilesFromStore = useSelector(getProfiles)
  const socketAuthObject = useSelector(getSocketAuthObject)

  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()

  async function searchProfiles(searchQuery) {
    await axios.post('/api/search', { query: searchQuery })
  }

  useEffect(() => {
    if (searchQuery !== '' && searchQuery !== null) {
      searchProfiles(searchQuery)
    }

    if (socket) {
      socket.on('search-results', (profiles) => {
        dispatch(
          addProfiles({
            profiles: profiles,
            loggedInUser: loggedInUser.user,
          })
        )
      })
    }

    return () => {
      // dispatch(
      //   addProfiles({
      //     profiles: [],
      //     loggedInUser: loggedInUser.user,
      //   })
      // )
      // if (socket) socket.off('search-results')
    }
  }, [socket, loggedInUser, searchQuery])

  return (
    <Flex className="w-full flex-col">
      {profilesFromStore
        ? [...Object.values(profilesFromStore)].map((profile, i) =>
            !profile ? null : (
              <Profile key={i} profile={profile} axios={axios} />
            )
          )
        : null}
    </Flex>
  )
}

export default withAxios(SearchController)
