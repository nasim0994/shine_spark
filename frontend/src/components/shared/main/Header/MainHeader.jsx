import { CgMenuLeftAlt } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSidebar from "./CartSidebar";
import IWhatsapp from "@/components/shared/icons/IWhatsapp";
import IUser from "@/components/shared/icons/IUser";
import IHeart from "@/components/shared/icons/IHeart";
import ICart from "@/components/shared/icons/ICart";
import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";

export default function MainHeader() {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  return (
    <section className="py-3 shadow">
      <div className="container">
        <div className="flex w-full items-center justify-between">
          {/* category */}
          <div className="category hidden items-center gap-2 lg:flex lg:w-2/5">
            {categories?.slice(0, 5)?.map((category) => (
              <Link
                key={category?._id}
                to={`/shops?category=${category?.slug}`}
              >
                {category?.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 lg:w-1/5">
            <div className="lg:hidden">
              <button>
                <CgMenuLeftAlt className="text-2xl" />
              </button>
            </div>

            <Link to="/">
              <img
                src="https://www.kalkifashion.com/static/version1739875152/frontend/Aureatelabs/kalki/en_US/images/logo.svg"
                alt="logo"
                width={200}
                height={60}
                className="w-32 lg:w-44"
              />
            </Link>
          </div>

          {/*  */}
          <div className="flex items-center justify-end gap-5 text-neutral-content lg:w-2/5">
            <Search />
            <Link to={`https://wa.me/${`8801706260994`}`} target="_blank">
              <IWhatsapp width={23} height={23} />
            </Link>
            <Link to="/login">
              <IUser width={26} height={26} />
            </Link>
            <Link to="/wishlist">
              <IHeart width={25} height={25} />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button>
                  <ICart width={24} height={24} />
                </button>
              </SheetTrigger>

              <CartSidebar />
            </Sheet>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              name="search"
              placeholder="search for styles, collections & more"
              className="w-full pl-9"
            />
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral opacity-50">
              <BiSearch className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
