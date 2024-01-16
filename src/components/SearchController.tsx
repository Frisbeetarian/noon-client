import { useDispatch, useSelector } from 'react-redux'
import { getSearchQuery } from '../store/search'
import { useSearchForProfileByUsernameQuery } from '../generated/graphql'

import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { getLoggedInUser } from '../store/users'
import { addProfiles, getProfiles } from '../store/profiles'
import Profile from './Profile'
import SocketManager from './SocketIo/SocketManager'

export default function SearchController() {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(getLoggedInUser)
  const searchQuery = useSelector(getSearchQuery)
  const profilesFromStore = useSelector(getProfiles)
  const socket = SocketManager.getSocket()

  const { data } = useSearchForProfileByUsernameQuery({
    variables: { username: searchQuery },
    fetchPolicy: 'network-only',
  })

  console.log(
    'data?.searchForProfileByUsername',
    data?.searchForProfileByUsername
  )

  useEffect(() => {
    if (socket) {
      socket.on('search-results', (profiles) => {
        console.log('profile', profiles)
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
      if (socket) socket.off('search-results')
    }
  }, [loggedInUser])

  return (
    <Flex className="w-full flex-col">
      {profilesFromStore
        ? [...Object.values(profilesFromStore)].map((profile, i) =>
            !profile ? null : <Profile key={i} profile={profile} />
          )
        : null}
    </Flex>
  )
}
