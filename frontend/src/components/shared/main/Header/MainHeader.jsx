import { CgMenuLeftAlt } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSidebar from "./CartSidebar";
import IWhatsapp from "@/components/shared/icons/IWhatsapp";
import IUser from "@/components/shared/icons/IUser";
import IHeart from "@/components/shared/icons/IHeart";
import ICart from "@/components/shared/icons/ICart";
import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";
import { useSelector } from "react-redux";

export default function MainHeader() {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;
  const navigate = useNavigate();

  const { carts } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    if (search) {
      navigate(`/shops?search=${search}`);
      e.target.search.value = "";
    }
  };

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
            <Link to="/wishlist" className="relative">
              <IHeart width={25} height={25} />
              {wishlists.length > 0 && (
                <span className="absolute -right-3 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-base-100">
                  {wishlists?.length}
                </span>
              )}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative -mt-1">
                  <ICart width={24} height={24} />
                  {carts.length > 0 && (
                    <span className="absolute -right-3 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-base-100">
                      {carts?.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>

              <CartSidebar />
            </Sheet>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              name="search"
              placeholder="search for styles, collections & more"
              className="w-full pl-9"
            />
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral opacity-50">
              <BiSearch className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
