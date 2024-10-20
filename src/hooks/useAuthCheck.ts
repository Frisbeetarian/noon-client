// useAuthCheck.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../store/users';
import { useGetMeQuery } from '../store/api/usersApiSlice';
import { getIsRegistering } from '../store/ui';

export const useAuthCheck = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const dispatch = useDispatch();
  const isRegistering = useSelector(getIsRegistering);

  useEffect(() => {
    if (!isLoading && !isRegistering && user?.username) {
      dispatch(setLoggedInUser(user));
    }
  }, [user, isLoading, dispatch, isRegistering]);

  return { user, isLoading };
};
