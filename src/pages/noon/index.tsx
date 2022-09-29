import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import Sidebar from './Sidebar'
import {
  useGetConversationForLoggedInUserQuery,
  useLogoutMutation,
  useMeQuery,
} from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { getLoggedInUser, setLoggedInUser } from '../../store/users'
import {
  getConversationsThatHaveUnreadMessagesForProfile,
  setConversations,
} from '../../store/chat'
import Chat from './Chat'

function Noon() {
  const dispatch = useDispatch()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()

  const loggedInUser = useSelector(getLoggedInUser)
  const conversationsThatHaveUnreadMessages = useSelector(
    getConversationsThatHaveUnreadMessagesForProfile
  )

  const [
    {
      data: fetchedConversations,
      error: conversationsError,
      fetching: conversationsFetching,
    },
  ] = useGetConversationForLoggedInUserQuery()

  useEffect(() => {
    dispatch(setLoggedInUser({ user: data }))
  }, [data])

  useEffect(() => {
    if (fetchedConversations?.getConversationForLoggedInUser) {
      dispatch(
        setConversations({
          conversationsToSend:
            fetchedConversations?.getConversationForLoggedInUser,
          loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
        })
      )
    }
  }, [fetchedConversations])

  return (
    <div className="flex">
      {loggedInUser.user?.profile ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : null}
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Noon)
