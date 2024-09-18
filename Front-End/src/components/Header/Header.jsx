import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FiHeart, FiLogIn, FiMonitor } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";
import { userLogout } from "../../Redux/user/userSlice";
import SearchBox from "./SearchBox";
import { BsSearch } from "react-icons/bs";
import Menu from "./Menu/Menu";

export default function Header() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const { loggedUser } = useSelector((state) => state.user);
  const { data: logo } = useGetMainLogoQuery();

  const [search, setSearch] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".searchBox") && !e.target.closest(".searchBtn")) {
        setSearch(false);
      }
    });
  }, [search]);

  const [profileDropdown, setProfileDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".profileDropdownBtn") &&
        !e.target.closest(".user_info")
      ) {
        setProfileDropdown(false);
      }
    });
  }, []);

  return (
    <>
      <header className="border-b bg-base-100 py-1 text-neutral">
        <div className="container">
          <div className="flex items-center justify-between gap-2">
            <div>
              <Link to="/">
                <img
                  src={
                    logo?.data[0]?.logo === ""
                      ? "/images/logo/logo.png"
                      : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                          logo?.data[0]?.logo
                        }`
                  }
                  alt=""
                  className="w-32 sm:w-40"
                />
              </Link>
            </div>

            <div className="sm:hidden">
              <button
                onClick={() => setSearch(!search)}
                className="searchBtn pr-2"
              >
                <BsSearch className="text-lg" />
              </button>

              {search && (
                <div className="searchBox absolute right-0 top-10 z-40 w-full rounded bg-base-100">
                  <SearchBox />
                </div>
              )}
            </div>

            <div className="hidden sm:block sm:w-1/2 xl:w-3/5">
              <SearchBox />
            </div>

            <div className="hidden items-center gap-3 sm:flex lg:gap-6">
              <Link
                to="/account/wishlist"
                className="flex items-center gap-1 text-neutral duration-300 hover:text-primary"
              >
                <FiHeart className="text-xl lg:text-[17px]" />
                <h1 className="hidden font-medium lg:block">wishlist</h1>
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-2 duration-300 hover:text-primary lg:gap-3"
              >
                <div className="relative">
                  <RiShoppingCartLine className="text-xl lg:text-2xl" />
                  <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-base-100">
                    <span className="mt-px">{carts?.length || 0}</span>
                  </div>
                </div>
                <h1 className="hidden font-medium sm:block">
                  ৳
                  {carts?.reduce(
                    (price, item) =>
                      price +
                      item.quantity *
                        parseInt(
                          item.price - (item.price * item.discount) / 100,
                        ),
                    0,
                  )}
                </h1>
              </Link>

              {loggedUser?.success ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="profileDropdownBtn"
                  >
                    <img
                      src={
                        loggedUser?.data?.image === "" ||
                        loggedUser?.data?.image === null
                          ? "/images/demo_user.jpg"
                          : `${import.meta.env.VITE_BACKEND_URL}/user/${
                              loggedUser?.data?.image
                            }`
                      }
                      alt=""
                      className="h-8 w-8 rounded-full border border-base-100"
                    />
                  </button>

                  {profileDropdown && (
                    <ul className="absolute right-0 top-[130%] z-50 w-max min-w-[220px] overflow-hidden rounded bg-base-100 text-[15px] text-neutral shadow-lg">
                      <li className="user_info border-b px-2 py-1">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              loggedUser?.data?.image === "" ||
                              loggedUser?.data?.image === null
                                ? "/images/demo_user.jpg"
                                : `${import.meta.env.VITE_BACKEND_URL}/user/${
                                    loggedUser?.data?.image
                                  }`
                            }
                            alt=""
                            className="h-9 w-9 rounded-full border border-base-100"
                          />
                          <div>
                            <h1 className="text-[17px]">
                              {loggedUser?.data?.name}
                            </h1>
                            <p className="text-neutral-content text-sm">
                              {loggedUser?.data?.email}
                            </p>
                          </div>
                        </div>
                      </li>

                      {(loggedUser?.data?.role === "admin" ||
                        loggedUser?.data?.role === "superAdmin") && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                          >
                            <RxDashboard className="text-lg" />
                            Dashboard
                          </Link>
                        </li>
                      )}

                      <li>
                        <Link
                          to="/account/profile"
                          className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                        >
                          <FiMonitor className="text-lg" />
                          View Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/account/wishlist"
                          className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                        >
                          <AiOutlineHeart className="text-xl" />
                          My Wishlist
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/account/orders"
                          className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                        >
                          <IoBagCheckOutline className="text-xl" />
                          My Order List
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={() => dispatch(userLogout())}
                          className="flex w-full items-center gap-1 border-t px-3 py-1.5 text-primary duration-200 hover:bg-gray-200"
                        >
                          <BiLogOutCircle className="text-base" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-neutral duration-300 hover:text-primary"
                >
                  <FiLogIn className="text-xl sm:text-[17px]" />
                  <h1 className="hidden font-medium sm:block">Login</h1>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <Menu />
    </>
  );
}
