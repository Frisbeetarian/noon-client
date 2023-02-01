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

function Noon() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const meta = {
    title: 'Noon – Open source, secure, free communication platform.',
    description: `Noon – Open source, secure, free communication platform.`,
    image: 'https://muhammad.me/static/images/muhammad-banner.png',
    type: 'website',
  }

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

  useEffect(() => {
    if (window.innerWidth <= 1000) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      if (window.innerWidth <= 1000) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    })

    return () => {
      window.removeEventListener('resize', (e) => {
        if (window.innerWidth <= 1000) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      })
    }
  })

  if (!mounted) return null

  return (
    <div className="flex" style={{ overflow: 'hidden' }}>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://muhammadsh.io${router.asPath}`}
        />
        <link rel="canonical" href={`https://muhammad.me${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Muhammad Sulayman Haydar" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>

      {mounted && loggedInUser.user?.profile ? (
        <>
          <Sidebar />
          {!isMobile && <Chat />}
        </>
      ) : null}
    </div>
  )
}

export default withApollo({ ssr: true })(Noon)
