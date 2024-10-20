// Adjusted Chat.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, useToast } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';
import Messages from './Messages';
import Video from './Video';
import ChatControlsAndSearch from './ChatControlsAndSearch';

import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../store/chat';
import { getLoggedInUser, getFriendPublicKeyByUuid } from '../store/users';
import { getIsMobile } from '../store/ui';
import { getVideoFrameOpenState } from '../store/video';

import MessageManagement from '../utils/MessageManagement';
import axiosInstance from '../utils/axiosInstance';

function Chat() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);
  const isMobile = useSelector(getIsMobile);
  const [innerHeight, setInnerHeight] = useState(0);

  const activeConversation = useSelector(getActiveConversation);
  const videoFrameOpenState = useSelector(getVideoFrameOpenState);

  const profile = useSelector(getActiveConversee);

  const toast = useToast();
  const friendPublicKey = useSelector((state) =>
    getFriendPublicKeyByUuid(state, profile?.uuid)
  );

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSendGroupMessage = async (inputMessage) => {
    if (!inputMessage.trim().length) {
      return;
    }

    const publicKeys = activeConversation.profiles
      .map((profile) => ({
        uuid: profile.uuid,
        username: profile.username,
        publicKey: profile.publicKey,
      }))
      .filter((pk) => pk !== null);

    const encryptedPayload = await MessageManagement.encryptMessage(
      publicKeys,
      inputMessage
    );

    try {
      const response = await axiosInstance.post('/api/messages/groupMessages', {
        message: encryptedPayload.encryptedMessage,
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
        encryptedKeys: encryptedPayload.encryptedKeys,
      });

      if (response.status === 200) {
        dispatch(
          addMessageToActiveConversation({
            message: {
              uuid: response.data?.uuid as string,
              content: encryptedPayload.encryptedMessage as string,
              sender: {
                uuid: loggedInUser?.user?.profile?.uuid,
                username: loggedInUser?.user?.profile?.username,
              },
              from: 'me',
              type: 'text',
              src: '',
              deleted: false,
              conversationUuid: activeConversation.uuid,
              encryptedKey: response.data.encryptedKey,
              updatedAt: response.data.updatedAt,
              createdAt: response.data.createdAt,
            },
            loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
          })
        );
      }
    } catch (error) {
      if (error.response?.status !== 429) {
        toast({
          title: `Error sending message.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'error',
          duration: 5000,
        });
      }
    }
  };

  const handleSendMessage = async (inputMessage) => {
    if (!inputMessage.trim().length) {
      return;
    }

    const publicKeys = [
      {
        uuid: loggedInUser.user.profile.uuid,
        publicKey: loggedInUser.user.publicKey,
      },
      {
        uuid: profile.uuid,
        publicKey: friendPublicKey,
      },
    ];

    const encryptedPayload = await MessageManagement.encryptMessage(
      publicKeys,
      inputMessage
    );

    try {
      const response = await axiosInstance.post('/api/messages', {
        message: encryptedPayload.encryptedMessage,
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
        recipientUuid: profile.uuid,
        recipientUsername: profile.username,
        encryptedKeys: encryptedPayload.encryptedKeys,
      });

      if (response.status === 200) {
        dispatch(
          addMessageToActiveConversation({
            message: {
              uuid: response.data.uuid as string,
              content: encryptedPayload.encryptedMessage as string,
              sender: {
                uuid: loggedInUser?.user?.profile?.uuid,
                username: loggedInUser?.user?.profile?.username,
              },
              from: 'me',
              type: 'text',
              src: '',
              deleted: false,
              conversationUuid: activeConversation.uuid,
              encryptedKey: response.data.encryptedKey,
              updatedAt: response.data.updatedAt,
              createdAt: response.data.createdAt,
            },
            loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
          })
        );
      }
    } catch (error) {
      if (error?.response?.status !== 429) {
        toast({
          title: `Error sending message.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'error',
          duration: 5000,
        });
      }
    }
  };

  return (
    <Flex
      className="flex-col bg-red-500 text-white box-content relative z-50 md:z-0 chat-container bg-grid-small-black/[0.5]"
      style={{
        flex: isMobile ? '1' : '0.75',
        height: innerHeight,
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center justify-center border-b border-black box-content"
        style={{ height: isMobile ? '10vh' : '5vh' }}
      >
        <ChatControlsAndSearch />
      </div>

      {activeConversation && activeConversation.type === 'group' ? (
        <Flex
          className="flex-col p-0 box-content"
          style={{
            height: isMobile ? '77.5vh' : '90vh',
            transition: 'all .5s',
          }}
        >
          {!isMobile && <Header />}

          {videoFrameOpenState !== true ? (
            <Messages />
          ) : (
            <></>
            // <Video
            //   conversationUuid={activeConversation.uuid}
            //   profile={loggedInUser.user?.profile}
            //   email={loggedInUser.user?.email}
            // />
          )}
        </Flex>
      ) : null}

      {profile && activeConversation && activeConversation.type === 'pm' ? (
        <Flex
          className="flex-col p-0 box-content"
          style={{
            height: isMobile ? '77.5vh' : '90vh',
            transition: 'all .5s',
          }}
        >
          {!isMobile && <Header />}

          {videoFrameOpenState !== true ? (
            <Messages />
          ) : (
            <></>
            // <Video
            //   conversationUuid={activeConversation.uuid}
            //   profile={loggedInUser.user?.profile}
            //   email={loggedInUser.user?.email}
            // />
          )}
        </Flex>
      ) : null}

      {activeConversation ? (
        <Flex
          w="100%"
          flexDir="column"
          className="justify-center box-content"
          style={{ height: isMobile ? '12.5vh' : '7.7vh' }}
        >
          {activeConversation.type === 'pm' ? (
            <Footer handleSendMessage={handleSendMessage} />
          ) : (
            <Footer handleSendMessage={handleSendGroupMessage} />
          )}
        </Flex>
      ) : null}
    </Flex>
  );
}

export default Chat;
