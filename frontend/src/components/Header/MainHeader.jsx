import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FiMonitor } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";
import { userLogout } from "../../Redux/user/userSlice";

export default function MainHeader() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const { loggedUser } = useSelector((state) => state.user);
  const { data: logo } = useGetMainLogoQuery();
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

  const image =
    !loggedUser?.data?.image ||
    loggedUser?.data?.image === "" ||
    loggedUser?.data?.image === null
      ? "/images/demo_user.jpg"
      : `${import.meta.env.VITE_BACKEND_URL}/user/${loggedUser?.data?.image}`;

  return (
    <header className="sticky top-0 z-40 border-b bg-[#fffbf9] py-2 text-neutral backdrop-blur-[10px]">
      <div className="container">
        <div className="flex items-center justify-between gap-2">
          <div>
            {loggedUser?.success ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="profileDropdownBtn"
                >
                  <img
                    src={image}
                    alt="user"
                    className="h-7 w-7 rounded-full border border-base-100"
                  />
                </button>

                {profileDropdown && (
                  <ul className="absolute left-0 top-[130%] z-50 w-max min-w-[220px] overflow-hidden rounded bg-base-100 text-[15px] text-neutral shadow-lg">
                    <li className="user_info border-b px-2 py-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={image}
                          alt="user"
                          className="h-9 w-9 rounded-full border border-base-100"
                        />
                        <div>
                          <h1 className="text-[17px]">
                            {loggedUser?.data?.name}
                          </h1>
                          <p className="text-sm text-neutral-content">
                            {loggedUser?.data?.phone}
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
                        className="flex w-full items-center gap-1 border-t px-3 py-1.5 text-red-500 duration-200 hover:bg-gray-200"
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
                <FaUser className="text-xl sm:text-[17px]" />
                <h1 className="hidden font-medium sm:block">Login</h1>
              </Link>
            )}
          </div>

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
                alt="logo"
                className="w-40 sm:w-44"
                loading="lazy"
              />
            </Link>
          </div>

          <div>
            <Link
              to="/cart"
              className="flex items-center gap-1 duration-300 hover:text-primary sm:gap-2"
            >
              <i>
                <RiShoppingCartLine className="text-xl lg:text-2xl" />
              </i>
              <div>
                <p className="flex items-center gap-1">
                  <span className="hidden sm:block">Cart</span>
                  <span className="mt-px text-sm">({carts?.length || 0})</span>
                </p>
                <p className="-mt-1 hidden text-sm sm:block">
                  ৳{" "}
                  {carts?.reduce(
                    (price, item) =>
                      price +
                      item.quantity *
                        parseInt(
                          item.price - (item.price * item.discount) / 100,
                        ),
                    0,
                  )}
                  .00
                </p>
              </div>
              {/* <div className="relative">
                
                <p>
                  <span className="mt-px">{carts?.length || 0}</span>
                </p>
              </div>

              <h1 className="hidden font-medium sm:block">
                ৳
                {carts?.reduce(
                  (price, item) =>
                    price +
                    item.quantity *
                      parseInt(item.price - (item.price * item.discount) / 100),
                  0,
                )}
              </h1> */}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
