import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { login, logout } from './authSlice';
import { RootState } from '../store/store';

const useAuthStatus = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.userStatus);
  const dispatch = useDispatch();

  useEffect(() => {

    // GET COOKIE
    const jsCookie = Cookies.get();
    const session = jsCookie['tta-session'];

    if (session && !isAuthenticated) {
      dispatch(login());
    } else if (!session && isAuthenticated) {
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated;
};

export default useAuthStatus;
