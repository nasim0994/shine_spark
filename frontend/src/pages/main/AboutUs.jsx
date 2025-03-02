import Spinner from "@/components/shared/Spinner/Spinner";
import usePageView from "@/hooks/usePageView";
import { useGetAboutQuery } from "@/Redux/about/aboutApi";
import parser from "html-react-parser";

export default function AboutUs() {
  window.scroll(0, 0);
  usePageView("About Us");
  const { data, isLoading } = useGetAboutQuery();
  const about = data?.data[0];
  const parserDescription = about?.description && parser(about?.description);

  if (isLoading) return <Spinner />;

  return (
    <section className="py-5">
      <div className="container">
        <div className="p-4 shadow-lg lg:mx-auto lg:w-2/3">
          <h2 className="text-xl font-semibold text-black">{about?.title}</h2>
          {parserDescription}
        </div>
      </div>
    </section>
  );
}
