import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Flex, useToast } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

import {
  cancelFriendshipRequestSentOnProfile,
  setFriendFlagOnProfile,
  setFriendshipRequestSentOnProfile,
  unsetHasFriendshipRequestFromLoggedInProfile,
} from '../store/profiles';
import {
  getLoggedInUser,
  addFriendRequestEntry,
  removeFriendRequestEntry,
  addFriendEntry,
} from '../store/users';
import AppButton from './AppComponents/AppButton';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
} from '../utils/friendRequestActions';
import { addConversation } from '../store/chat';
import { getIsMobile } from '../store/ui';
import axiosInstance from '../utils/axiosInstance';

function Profile({ profile }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);
  const toast = useToast();
  const isMobile: number = useSelector(getIsMobile);
  const [isFriendRequestLoading, setIsFriendRequestLoading] = useState(false);
  const [isCancelFriendRequestLoading, setIsCancelFriendRequestLoading] =
    useState(false);
  const [isRejectFriendRequestLoading, setIsRejectFriendRequestLoading] =
    useState(false);
  const [isAcceptFriendRequestLoading, setIsAcceptFriendRequestLoading] =
    useState(false);

  const handleCancelFriendRequest = useCallback(async () => {
    try {
      setIsCancelFriendRequestLoading(true);

      await cancelFriendRequest({
        axios: axiosInstance,
        dispatch,
        friendRequest: {
          uuid: profile.uuid,
          username: profile.username,
        },
        loggedInUser,
        cancelFriendshipRequestSentOnProfile,
        removeFriendRequestEntry,
      });

      setIsCancelFriendRequestLoading(false);
    } catch (error) {
      console.error('Failed to cancel friend request:', error);
      setIsCancelFriendRequestLoading(false);
    } finally {
      setIsCancelFriendRequestLoading(false);
    }
  }, [
    axiosInstance,
    dispatch,
    loggedInUser.user?.friendshipRequests,
    profile.uuid,
  ]);

  const handleRejectFriendRequest = useCallback(async () => {
    try {
      setIsRejectFriendRequestLoading(true);

      await rejectFriendRequest({
        axios: axiosInstance,
        dispatch,
        friendRequest: {
          uuid: profile.uuid,
          username: profile.username,
        },
        loggedInUser,
        unsetHasFriendshipRequestFromLoggedInProfile,
        removeFriendRequestEntry,
      });

      setIsRejectFriendRequestLoading(false);
    } catch (error) {
      console.error('Failed to cancel friend request:', error);
      setIsRejectFriendRequestLoading(false);
    } finally {
      setIsRejectFriendRequestLoading(false);
    }
  }, [
    axiosInstance,
    dispatch,
    loggedInUser.user?.friendshipRequests,
    profile.uuid,
  ]);

  const handleSendFriendRequest = useCallback(async () => {
    try {
      setIsFriendRequestLoading(true);
      const response = await axiosInstance.post(
        '/api/profiles/sendFriendRequest',
        {
          profileUuid: profile.uuid,
        }
      );

      if (response.status === 200) {
        dispatch(
          setFriendshipRequestSentOnProfile({ profileUuid: profile.uuid })
        );
        dispatch(
          addFriendRequestEntry({
            uuid: profile.uuid,
            username: profile.username,
            reverse: false,
            isNew: true,
          })
        );

        setIsFriendRequestLoading(false);
      }
    } catch (error) {
      console.error('Failed to send friend request:', error);
      setIsFriendRequestLoading(false);
    }
  }, [axiosInstance, dispatch, profile.uuid, profile.username]);

  const handleAcceptFriendRequest = useCallback(async () => {
    try {
      setIsAcceptFriendRequestLoading(true);

      await acceptFriendRequest({
        axios: axiosInstance,
        dispatch,
        friendRequest: {
          uuid: profile.uuid,
          username: profile.username,
        },
        loggedInUser,
        setFriendFlagOnProfile,
        removeFriendRequestEntry,
        addFriendEntry,
        addConversation,
      });

      setIsAcceptFriendRequestLoading(false);
    } catch (error) {
      console.error('Failed to accept friend request:', error);
      setIsAcceptFriendRequestLoading(false);
    } finally {
      setIsAcceptFriendRequestLoading(false);
    }
  }, [
    dispatch,
    loggedInUser.user?.friendshipRequests,
    profile.uuid,
    profile.username,
    toast,
  ]);

  return (
    <Flex
      key={profile.uuid}
      alignItems="center"
      justifyContent="space-between"
      className={
        isMobile ? 'w-full h-8 my-3 relative ' : 'w-full h-12 my-5 relative'
      }
    >
      <Flex alignItems="center" className={isMobile ? 'w-1/3  max-w-28' : ''}>
        <Avatar name={profile.username} size="sm" mr={2} bg="red.500" />
        <p className="text-wrap max-w-full">{profile.username}</p>
      </Flex>

      {profile.hasSentFriendshipRequestToProfile ? (
        <Flex position="relative">
          <AppButton disabled={true} size={isMobile ? 'xs' : 'md'}>
            Friend request sent
          </AppButton>
          <AppButton
            onClick={handleCancelFriendRequest}
            isLoading={isCancelFriendRequestLoading}
            size={isMobile ? 'xs' : 'md'}
          >
            Cancel
          </AppButton>
        </Flex>
      ) : profile.hasFriendshipRequestFromLoggedInProfile ? (
        <Flex justifyContent="end" mt={3}>
          <AppButton
            mr={3}
            onClick={handleAcceptFriendRequest}
            isLoading={isAcceptFriendRequestLoading}
          >
            Accept
          </AppButton>

          <AppButton
            bg="black"
            onClick={handleRejectFriendRequest}
            isLoading={isRejectFriendRequestLoading}
          >
            Reject
          </AppButton>
        </Flex>
      ) : (
        <Box className={isMobile ? 'w-2/3 flex justify-end' : ''}>
          {profile.isAFriend ? (
            <Flex cursor="pointer" w="full" h="full" alignItems="center">
              <ChatIcon mr={3} mt={1} />
            </Flex>
          ) : (
            <AppButton
              onClick={handleSendFriendRequest}
              isLoading={isFriendRequestLoading}
              size={isMobile ? 'xs' : 'md'}
            >
              Send friend request
            </AppButton>
          )}
        </Box>
      )}
    </Flex>
  );
}

export default Profile;
