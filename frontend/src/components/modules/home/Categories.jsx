import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="py-2 lg:py-5">
      <div className="container">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Link to="" className="relative">
            <img
              src="https://staticm247.kalkifashion.com/media/wysiwyg/01-mini-mobile-all-country-250x353-11-02-24.jpg?w=225"
              alt=""
              width={400}
              height={400}
              className="h-[280px] w-full object-cover sm:h-[350px] md:h-[400px] lg:h-[450px]"
            />

            <div className="absolute bottom-10 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col gap-2 text-center">
              <h2 className="text-xl text-base-100 md:text-[28px]">
                Category Title
              </h2>
              <p className="-mt-2 text-base-100">On Sale</p>
              <button className="mx-auto w-max border border-primary bg-base-100 px-6 py-1 text-sm text-neutral md:py-1.5 md:text-[17px]">
                Shop Now
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
