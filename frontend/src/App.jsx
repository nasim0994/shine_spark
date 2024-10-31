import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./hooks/useAuthCheck";
import Spinner from "./components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { useGetFaviconQuery } from "./Redux/favicon/faviconApi";
import { useGetSEOQuery } from "./Redux/seoApi";
import { useEffect } from "react";

export default function App() {
  const authChecked = useAuthCheck();

  const { data: favicon } = useGetFaviconQuery();
  const icon = favicon?.data[0]?.icon;

  const { data } = useGetSEOQuery();
  const seo = data?.data;

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "${seo?.custom?.google_tag_manager}");
    `;

    // Append the script to the head
    if (seo?.custom?.google_tag_manager) document.head.appendChild(script);
  }, [seo]);

  if (!authChecked) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />

        <title>{seo?.basic?.title || "Your Page Title"}</title>
        <meta
          name="description"
          content={seo?.basic?.description || "Your Page Description"}
        />
        <meta
          name="keywords"
          content={seo?.basic?.keywords || "Your Page Keywords"}
        />
        <meta
          name="author"
          content={seo?.basic?.author || "Your Page Author"}
        />
        <meta
          name="designer"
          content={seo?.basic?.designer || "Your Page Designer"}
        />
        <meta
          name="subject"
          content={seo?.basic?.subject || "Your Page Subject"}
        />

        {seo?.basic?.copyright && (
          <meta name="copyright" content={seo?.basic?.copyright} />
        )}
        {seo?.basic?.url && <meta name="url" content={seo?.basic?.url} />}

        {seo?.custom?.facebook_domain_verification && (
          <meta
            name="facebook-domain-verification"
            content={seo?.custom?.facebook_domain_verification}
          />
        )}

        {seo?.custom?.google_site_verification && (
          <meta
            name="google-site-verification"
            content={seo?.custom?.google_site_verificatio}
          />
        )}
      </Helmet>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${seo?.custom?.google_tag_manager}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}
