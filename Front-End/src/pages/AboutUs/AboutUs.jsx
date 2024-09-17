import { useGetAboutQuery } from "../../Redux/about/aboutApi";
import Spinner from "../../components/Spinner/Spinner";
import parcer from "html-react-parser";

export default function AboutUs() {
  window.scroll(0, 0);
  const { data, isLoading } = useGetAboutQuery();
  const about = data?.data[0];
  const parcerDescription = about?.description && parcer(about?.description);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="w-max border-b-2 border-primary">
              <h2 className="text-5xl font-bold">{about?.title}</h2>
            </div>
            <p className="text-neutral-content mt-2 text-lg">
              {about?.subTitle}
            </p>

            <div className="mt-4 text-neutral-content text-[15px]">
              <p>{parcerDescription}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${
                about?.image
              }`}
              alt=""
              className="w-[90%] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
