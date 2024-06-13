import { useDispatch, useSelector } from "react-redux";
import {
  login as loginApi,
  fetchUserProfile,
  register as registerApi,
} from "../api/auth";
import {
  setUser,
  setToken,
  clearAuth,
  selectUser,
  selectToken,
} from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const login = async (credentials, { onSuccess, onError }) => {
    try {
      const { accessToken } = await loginApi(credentials);
      dispatch(setToken(accessToken));
      const userProfile = await fetchUserProfile(accessToken);
      dispatch(setUser(userProfile));
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const register = async (credentials, { onSuccess, onError }) => {
    try {
      await registerApi(credentials);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  return {
    user,
    token,
    login,
    register,
    logout,
  };
};
