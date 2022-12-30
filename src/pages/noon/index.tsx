import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../../components/Sidebar'

import {
  useGetConversationForLoggedInUserQuery,
  // useLogoutMutation,
  useMeQuery,
} from '../../generated/graphql'

import { isServer } from '../../utils/isServer'
import { getLoggedInUser, setLoggedInUser } from '../../store/users'

import { setConversations, getConversations } from '../../store/chat'

import Chat from '../../components/Chat'
import { withApollo } from '../../utils/withApollo'

function Noon() {
  const dispatch = useDispatch()

  const {
    data,
    // loading: meLoading
  } = useMeQuery({
    skip: isServer(),
    fetchPolicy: 'network-only',
  })

  // const [, logout] = useLogoutMutation()
  const loggedInUser = useSelector(getLoggedInUser)
  const conversations = useSelector(getConversations)

  const {
    data: fetchedConversations,
    // loading: getConversationLoading
  } = useGetConversationForLoggedInUserQuery({ fetchPolicy: 'network-only' })

  useEffect(() => {
    dispatch(setLoggedInUser({ user: data }))
  }, [data?.me?.username])

  useEffect(() => {
    if (
      fetchedConversations?.getConversationForLoggedInUser &&
      conversations === null &&
      loggedInUser?.user?.profile?.uuid
    ) {
      dispatch(
        setConversations({
          conversationsToSend:
            fetchedConversations?.getConversationForLoggedInUser,
          loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
        })
      )
    }
  }, [fetchedConversations, loggedInUser?.user?.profile?.uuid])

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

export default withApollo({ ssr: true })(Noon)
