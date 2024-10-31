import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../Redux/user/userSlice";
import { useJwt } from "react-jwt";

export default async function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const token = localStorage?.getItem("token");
  const { isExpired } = useJwt(token);
  if (isExpired) {
    localStorage.removeItem("token");
  }

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            dispatch(
              userLoggedIn({
                token: token,
                data: data,
                loading: false,
              }),
            );
          }
        })
        .finally(() => {
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
      dispatch(
        userLoggedIn({
          token: "",
          data: undefined,
          loading: false,
        }),
      );
    }
  }, [dispatch, setAuthChecked, token]);

  return authChecked;
}
