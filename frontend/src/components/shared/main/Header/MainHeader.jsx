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
import { useGetMainLogoQuery } from "@/Redux/logo/logoApi";
import { useGetContactQuery } from "@/Redux/contact/contactApi";
import { useState } from "react";
import HeaderMobileSidebar from "./HeaderMobileSidebar";

export default function MainHeader() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  const { data: logoData, isLoading } = useGetMainLogoQuery();
  const logo = logoData?.data && logoData?.data[0]?.logo;

  const { data: contactData } = useGetContactQuery();
  const whatsapp = contactData?.data[0]?.whatsapp;

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
              <button onClick={() => setShowSidebar(true)}>
                <CgMenuLeftAlt className="text-2xl" />
              </button>

              <HeaderMobileSidebar
                setShowSidebar={setShowSidebar}
                categories={categories}
                showSidebar={showSidebar}
              />
            </div>

            <Link to="/">
              {isLoading ? (
                <img
                  src="/images/logo.png"
                  alt="logo"
                  width={200}
                  height={60}
                  className="w-32 lg:w-44"
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo}`}
                  alt="logo"
                  width={200}
                  height={60}
                  className="w-32 lg:w-44"
                />
              )}
            </Link>
          </div>

          {/* buttons */}
          <div className="flex items-center justify-end gap-3 text-neutral-content sm:gap-5 lg:w-2/5">
            <Search />
            <Link to={`https://wa.me/${whatsapp}`} target="_blank">
              <IWhatsapp width={23} height={23} />
            </Link>
            {loggedUser?.success && loggedUser?.data?.role ? (
              <Link to="/account/profile">
                <img
                  src="/images/demo_user.jpg"
                  alt="user"
                  className="h-7 w-7 rounded-full"
                />
              </Link>
            ) : (
              <Link to="/login">
                <IUser width={26} height={26} />
              </Link>
            )}

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
