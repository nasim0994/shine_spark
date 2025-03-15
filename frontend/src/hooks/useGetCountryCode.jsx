import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default async function useGetCountryCode() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://ip-api.com/json`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          console.log("Country Code:", data);
        }
      });
  }, [dispatch]);

  return useGetCountryCode;
}
