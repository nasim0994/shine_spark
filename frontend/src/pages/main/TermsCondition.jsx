import usePageView from "@/hooks/usePageView";
import { useGetTermsConditionQuery } from "@/Redux/termscondition/termsconditionApi";
import parser from "html-react-parser";

export default function TermsCondition() {
  usePageView("Terms & Conditions");
  window.scrollTo(0, 0);
  const { data } = useGetTermsConditionQuery();
  const termsCondition = data?.data;

  return (
    <section className="min-h-[60vh] py-5">
      <div className="container">
        <h2 className="mb-6 text-center text-3xl font-medium text-primary sm:text-4xl">
          Terms & Conditions
        </h2>
        {termsCondition?.description && parser(termsCondition?.description)}
      </div>
    </section>
  );
}
