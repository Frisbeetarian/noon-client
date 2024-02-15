import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  getActiveConversation,
  setActiveConversationHasMoreMessages,
  deleteMessageInStore,
  addMessagesToConversation,
} from '../store/chat'
import { getLoggedInUser } from '../store/users'
import { getIsMobile } from '../store/ui'
import withAxios from '../utils/withAxios'
import { useGetMessagesForConversationQuery } from '../store/api/conversationsApiSlice'
import TextMessage from './chat/TextMessage'
import ImageMessage from './chat/ImageMessage'
import AudioMessage from './chat/AudioMessage'

const Messages = ({ axios }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const isMobile = useSelector(getIsMobile)
  const [cursor, setCursor] = useState(
    activeConversation.messages.length !== 0
      ? new Date(
          activeConversation.messages[
            activeConversation.messages.length - 1
          ].createdAt
        ).getTime()
      : null
  )

  const [hasMore, setHasMore] = useState(true)
  const [fetchMessages, setFetchMessages] = useState(false)

  const { data: messagesResponse } = useGetMessagesForConversationQuery(
    {
      conversationUuid: activeConversation.uuid,
      limit: 10,
      cursor: cursor,
    },
    {
      skip: fetchMessages || !activeConversation?.uuid,
    }
  )

  const loadMoreMessages = () => {
    setFetchMessages(true)
    if (messagesResponse?.hasMore) {
      setCursor(
        new Date(
          messagesResponse.messages[
            messagesResponse.messages.length - 1
          ].createdAt
        ).getTime()
      )
    }

    if (messagesResponse && messagesResponse.messages.length !== 0) {
      dispatch(
        addMessagesToConversation({
          conversationUuid: activeConversation.uuid,
          messages: messagesResponse.messages,
          loggedInProfileUuid: loggedInUser.user.profile.uuid,
        })
      )

      setFetchMessages(false)
    }
  }

  useEffect(() => {
    if (messagesResponse?.hasMore) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }, [messagesResponse])

  async function handleCheckForHasMoreMessages() {
    const hasMore = await axios.get(
      'api/conversations/' + activeConversation.uuid + '/checkMessages'
    )

    setHasMore(hasMore)
    if (hasMore) {
      dispatch(setActiveConversationHasMoreMessages(hasMore.data))
    }
  }

  useEffect(() => {
    if (activeConversation) {
      handleCheckForHasMoreMessages()
    }
  }, [])

  const deleteMessageHandler = async (item) => {
    await axios
      .delete(
        `/api/messages?messageUuid=${item.uuid}&conversationUuid=${activeConversation.uuid}&from=${loggedInUser.user.profile.uuid}&type=${item.type}&src=${item.src}.`,
        {
          conversationUuid: activeConversation.uuid,
          messageUuid: item.uuid,
          from: loggedInUser.user.profile.uuid,
          type: item.type,
          src: item.src,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            deleteMessageInStore({
              uuid: response.data.uuid,
              content: response.data.content,
              deleted: true,
              conversationUuid: activeConversation.uuid,
            })
          )
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Flex
      id="scrollableDiv"
      overflowY="auto"
      overflowX="hidden"
      flexDirection="column-reverse"
      className="w-full top-0 px-2 md:px-4 relative overflow-x-hidden"
      style={isMobile ? { height: '77.5vh' } : { height: '77.5vh' }}
    >
      <InfiniteScroll
        dataLength={activeConversation.messages.length}
        next={loadMoreMessages}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
        className=""
        inverse={true}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        loader={null}
      >
        {activeConversation.messages.map((item, index) => {
          const isMine = item.from === 'me'

          const commonProps = {
            key: index,
            isDeleted: item.deleted,
            isMine,
          }

          if (item.type === 'text') {
            return (
              // eslint-disable-next-line react/jsx-key
              <TextMessage
                {...commonProps}
                content={item.content}
                item={item}
                conversationType={activeConversation.type}
                deleteMessageHandler={deleteMessageHandler}
              />
            )
          } else if (item.type === 'image') {
            return (
              // eslint-disable-next-line react/jsx-key
              <ImageMessage
                {...commonProps}
                src={item.src}
                alt={item.content}
                content={item.content}
                item={item}
                deleteMessageHandler={deleteMessageHandler}
              />
            )
          } else if (item.type === 'audio') {
            return (
              // eslint-disable-next-line react/jsx-key
              <AudioMessage
                {...commonProps}
                src={item.src}
                content={item.content}
                item={item}
                deleteMessageHandler={deleteMessageHandler}
              />
            )
          } else {
            return null
          }
        })}
      </InfiniteScroll>
    </Flex>
  )
}

export default withAxios(Messages)
