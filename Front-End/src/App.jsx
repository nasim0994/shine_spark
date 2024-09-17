import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./hooks/useAuthCheck";
import Spinner from "./components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { useGetFaviconQuery } from "./Redux/favicon/faviconApi";
import { useGetBusinessInfoQuery } from "./Redux/businessInfoApi/businessInfoApi";
import { useGetSEOQuery } from "./Redux/seoApi";

export default function App() {
  const authChecked = useAuthCheck();

  const { data: favicon, isLoading } = useGetFaviconQuery();
  const icon = favicon?.data[0]?.icon;

  const { data: business, isLoading: businessIsLoading } =
    useGetBusinessInfoQuery();
  const businessInfo = business?.data[0];

  const { data, isLoading: seoIsLoading } = useGetSEOQuery();
  const seo = data?.data[0];

  if (!authChecked || isLoading || businessIsLoading || seoIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {businessInfo?.companyName && businessInfo?.tagline
            ? businessInfo?.companyName + "-" + businessInfo?.tagline
            : "your title here"}
        </title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />
        <link rel="canonical" href={import.meta.env.VITE_FRONTEND_URL} />

        {/* For Seo */}
        <meta name="description" content={seo?.description} />
        <meta name="keywords" content={seo?.keywords} />
        <meta name="author" content={seo?.author} />
        <meta name="sitemap_link" content={seo?.sitemapLink} />

        {/* -- Open Graph data -- */}
        <meta property="og:title" content={businessInfo?.tagline} />
        <meta property="og:type" content={businessInfo?.companyType} />
        <meta property="og:url" content={import.meta.env.VITE_FRONTEND_URL} />
        <meta property="og:description" content={businessInfo?.bio} />
        <meta property="og:site_name" content={businessInfo?.companyName} />
      </Helmet>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}
