import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  getConversations,
} from '../../store/chat'

import Chat from './Chat'

function Noon() {
  const dispatch = useDispatch()

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
    requestPolicy: 'network-only',
  })

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const loggedInUser = useSelector(getLoggedInUser)
  const conversations = useSelector(getConversations)

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
  }, [data?.me?.username])

  useEffect(() => {
    if (
      fetchedConversations?.getConversationForLoggedInUser &&
      conversations === null
    ) {
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
    <div className="flex" style={{ overflow: 'hidden' }}>
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
