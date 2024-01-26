import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../../components/Sidebar'

import {
  useGetConversationForLoggedInUserQuery,
  // useLogoutMutation,
  useMeQuery,
  User,
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
import SocketConnectionProvider from '../../providers/SocketConnectionProvider'
import withAxios from '../../utils/withAxios'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
  description: `Noon – Open source, secure, free communication platform.`,
  image: 'https://noon.tube/static/images/muhammad-banner.png',
  type: 'website',
}
function Noon({ axios }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const isMobile = useSelector(getIsMobile)
  const isConversationOpen = useSelector(getIsConversationOpen)
  const createGroupActive = useSelector(getCreateGroupActive)

  useEffect(() => setMounted(true), [])

  // const { data, loading: meLoading } = useMeQuery({
  //   skip: isServer(),
  //   fetchPolicy: 'network-only',
  // })

  const loggedInUser = useSelector(getLoggedInUser)
  const conversations = useSelector(getConversations)

  // const { data: fetchedConversations } = useGetConversationForLoggedInUserQuery(
  //   { fetchPolicy: 'network-only' }
  // )

  // useEffect(() => {
  //   if (!meLoading) {
  //     if (!data?.me?.username) {
  //       router.replace('/')
  //     } else {
  //       dispatch(setLoggedInUser(data.me as User))
  //     }
  //   }
  // }, [meLoading, data?.me?.username])

  // useEffect(() => {
  //   if (
  //     fetchedConversations?.getConversationForLoggedInUser &&
  //     (conversations === null || conversations.length === 0) &&
  //     loggedInUser?.user?.profile?.uuid
  //   ) {
  //     dispatch(
  //       setConversations({
  //         // @ts-ignore
  //         conversationsToSend:
  //           fetchedConversations?.getConversationForLoggedInUser,
  //         loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
  //       })
  //     )
  //   }
  // }, [fetchedConversations, loggedInUser?.user?.profile?.uuid])

  useEffect(() => {
    setMounted(true)
    if (!isServer()) {
      axios
        .get('/api/users/me')
        .then((response) => {
          if (response.data.username) {
            dispatch(setLoggedInUser(response.data))
          } else {
            router.replace('/')
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error)
          router.replace('/')
        })

      axios
        .get('/api/conversations')
        .then((response) => {
          if (conversations === null && loggedInUser?.user?.profile?.uuid) {
            dispatch(
              setConversations({
                conversationsToSend: response.data,
                loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
              })
            )
          }
        })
        .catch((error) => {
          console.error('Error fetching conversations:', error)
        })
    }
  }, [axios, dispatch, loggedInUser?.user?.profile?.uuid, conversations])

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
        <SocketConnectionProvider>
          <Sidebar />
          {/*{!isMobile && <Chat />}*/}
          {/*{isMobile && isConversationOpen && <Chat />}*/}
          {/*{!isMobile && <SocketControls />}*/}
          {/*{createGroupActive && <CreateGroupSidebar />}*/}
        </SocketConnectionProvider>
      ) : null}
    </div>
  )
}

export default withAxios(Noon)
