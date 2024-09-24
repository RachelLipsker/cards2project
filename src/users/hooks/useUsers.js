import { useCallback, useState } from "react";
import { useCurrentUser } from "../providers/UserProvider";
import { editUser, getUserProfile, login, signup } from "../services/usersApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeUser from "../helpers/normalization/normalizeUser";
import useAxios from "../../hooks/useAxios";
import normalizeUpdateUser from "../helpers/normalization/normalizeUpdateUser";

export default function useUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [profile, setProfile] = useState();
  const { setUser, setToken } = useCurrentUser();
  const navigate = useNavigate();
  const setSnack = useSnack();

  useAxios();

  const handleLogin = useCallback(async (userLogin) => {
    try {
      const token = await login(userLogin);
      setTokenInLocalStorage(token);
      setToken(token);
      setUser(getUser());
      setSnack("success", "you logged in successfully");
      navigate(ROUTES.CARDS);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setSnack("error", err.message);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [])

  const handleSignup = useCallback(async (user) => {
    try {
      const serverUser = normalizeUser(user);
      const response = await signup(serverUser);
      setSnack("success", "you signed up successfully");
      await handleLogin({ email: user.email, password: user.password });
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    }
    setIsLoading(false);
  }, [])

  const getUserById = useCallback(async (id) => {
    try {
      const userProfile = await getUserProfile(id);
      setProfile(userProfile);
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    }
    setIsLoading(false);
  }, [])


  const handleUpdateUser = useCallback(
    async (userId, userFromClient) => {
      setIsLoading(true);
      try {
        const userProfile = await editUser(userId, normalizeUpdateUser(userFromClient));
        setProfile(userProfile);
        setSnack("success", "The profile has been successfully updated");
        setTimeout(() => {
          navigate(ROUTES.USER_PROFILE);
        }, 300);
      } catch (err) {
        setError(err.message);
        setSnack("error", err.message);
      }
      setIsLoading(false);
    },
    [setSnack, navigate]
  );

  return {
    isLoading,
    error,
    profile,
    handleLogin,
    handleLogout,
    handleSignup,
    getUserById,
    handleUpdateUser
  };
}
