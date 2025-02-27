import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn, userLogout } from "../Redux/user/userSlice";
import { useJwt } from "react-jwt";

export default async function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const { token } = useSelector((state) => state.user);
  const { isExpired } = useJwt(token);
  if (isExpired) dispatch(userLogout());

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
              }),
            );
          }
        })
        .finally(() => {
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
      dispatch(userLogout());
    }
  }, [dispatch, setAuthChecked, token]);

  return authChecked;
}
