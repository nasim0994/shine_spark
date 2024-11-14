import { useGetAboutQuery } from "../../Redux/about/aboutApi";
import Spinner from "../../components/Spinner/Spinner";
import parcer from "html-react-parser";
import usePageView from "../../hooks/usePageView";

export default function AboutUs() {
  window.scroll(0, 0);
  usePageView("About Us");
  const { data, isLoading } = useGetAboutQuery();
  const about = data?.data[0];
  const parcerDescription = about?.description && parcer(about?.description);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div>
            <div className="w-max border-b-2 border-primary">
              <h2 className="text-5xl font-bold">{about?.title}</h2>
            </div>
            <p className="mt-2 text-lg text-neutral-content">
              {about?.subTitle}
            </p>

            <div className="mt-4 text-[15px] text-neutral-content">
              <p>{parcerDescription}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${
                about?.image
              }`}
              alt={about?.title}
              className="mx-auto w-[80%] rounded"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
