import Head from 'next/head'
import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/router'
import {
  getCreateGroupActive,
  getIsConversationOpen,
  getIsMobile,
} from '../../store/ui'
import SocketControls from '../../components/SocketIo/SocketControls'
import CreateGroupSidebar from '../../components/CreateGroupSidebar'
// import { getIsMobile } from '../../store/ui'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
  description: `Noon – Open source, secure, free communication platform.`,
  image: 'https://noon.tube/static/images/muhammad-banner.png',
  type: 'website',
}
function Noon() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const isMobile = useSelector(getIsMobile)
  const isConversationOpen = useSelector(getIsConversationOpen)
  const createGroupActive = useSelector(getCreateGroupActive)

  useEffect(() => setMounted(true), [])

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
    if (!loggedInUser?.user?.profile?.uuid) {
      router.replace('/')
    }

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

  if (!mounted) return null

  return (
    <div className="flex" style={{ overflow: 'hidden' }}>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://noon.tube${router.asPath}`} />
        <link rel="canonical" href={`https://noon.tube${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Noon" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>

      {mounted && loggedInUser.user?.profile ? (
        <>
          <Sidebar />
          {!isMobile && <Chat />}
          {isMobile && isConversationOpen && <Chat />}
          {!isMobile && <SocketControls />}
          {createGroupActive && <CreateGroupSidebar />}
        </>
      ) : null}
    </div>
  )
}

export default withApollo({ ssr: true })(Noon)
