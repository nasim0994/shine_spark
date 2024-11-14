import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageView = (title) => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: {
        url: location.pathname,
        title: title,
      },
    });
  }, [location, title]);
};

export default usePageView;
