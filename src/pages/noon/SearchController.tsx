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

  const [{ data }] = useSearchForProfileByUsernameQuery({
    variables: { username: searchQuery },
  })

  useEffect(() => {
    if (data?.searchForProfileByUsername && loggedInUser.user) {
      dispatch(
        addProfiles({
          profiles: data?.searchForProfileByUsername,
          loggedInUser,
        })
      )
    }

    return () => {
      dispatch(
        addProfiles({
          profiles: null,
          loggedInUser,
        })
      )
    }
  }, [data?.searchForProfileByUsername, loggedInUser])

  console.log('search results:', data?.searchForProfileByUsername)

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
