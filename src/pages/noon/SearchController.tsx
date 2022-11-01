import { useDispatch, useSelector } from 'react-redux'
import { getSearchQuery } from '../../store/search'
import {
  useSearchForProfileByUsernameQuery,
  useSearchForProfileByUuidQuery,
} from '../../generated/graphql'

import { Avatar, AvatarBadge, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import { getLoggedInUser } from '../../store/users'
import { setProfiles } from '../../store/search'
import { addProfiles, getProfiles } from '../../store/profiles'

export default function SearchController() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const searchQuery = useSelector(getSearchQuery)
  const profilesFromStore = useSelector(getProfiles)

  // let [searchResults, setSearchResults] = useState(null)
  const [{ data }] = useSearchForProfileByUsernameQuery({
    variables: { username: searchQuery },
  })

  useEffect(() => {
    if (data?.searchForProfileByUsername && loggedInUser.user) {
      // dispatch(
      //   setProfiles({
      //     profiles: data?.searchForProfileByUsername,
      //     loggedInUser,
      //   })
      // )

      dispatch(
        addProfiles({
          profiles: data?.searchForProfileByUsername,
          loggedInUser,
        })
      )
    }

    return () => {
      // dispatch(
      //   setProfiles({
      //     profiles: null,
      //   })
      // )

      dispatch(
        addProfiles({
          profiles: null,
          loggedInUser,
        })
      )
    }
  }, [data?.searchForProfileByUsername, loggedInUser])
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

  // data?.searchForProfileByUsername?.forEach((profile) => {
  //   // let profileObject = { ...profile }

  //   const friendsCheck = loggedInUser.user.friends.find(
  //     (element) => element.uuid == profile.uuid
  //   )
  //
  //   const friendshipRequestCheck = loggedInUser.user.friendshipRequests.find(
  //     (element) => element.uuid == profile.uuid
  //   )
  //
  //   // const reverseFriendshipCheck = profile.friendshipRequests.find()
  //   profile.isAFriend = !!friendsCheck
  //
  //   if (friendshipRequestCheck?.reverse) {
  //     profile.hasFriendshipRequestFromLoggedInProfile = true
  //   } else if (friendshipRequestCheck) {
  //     profile.hasSentFriendshipToProfile = true
  //   }
  //
  //   console.log('PROFILE OBJECT:', profile)
  //   // profilesArray.push(profileObject)
  // })

  return (
    <Flex className="w-full">
      {profilesFromStore
        ? [...Object.values(profilesFromStore)].map((profile, i) =>
            !profile ? null : <Profile key={i} profile={profile} />
          )
        : null}
    </Flex>
  )
}
