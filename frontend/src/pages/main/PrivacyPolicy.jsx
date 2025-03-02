import usePageView from "@/hooks/usePageView";
import { useGetPrivacyQuery } from "@/Redux/privacy/privacyApi";
import parser from "html-react-parser";

export default function PrivacyPolicy() {
  usePageView("Privacy Policy");
  window.scrollTo(0, 0);
  const { data } = useGetPrivacyQuery();
  const privacy = data?.data;

  return (
    <section className="min-h-[60vh] py-5">
      <div className="container">
        <h2 className="mb-6 text-center text-3xl font-medium text-primary sm:text-4xl">
          Privacy Policy
        </h2>
        {privacy?.description && parser(privacy?.description)}
      </div>
    </section>
  );
}
