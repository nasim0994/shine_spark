import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiShop } from "react-icons/ci";
import MobileMenuSidebar from "../MobileMenuSidebar";

export default function MobileBottomHeader() {
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.closest(".menu_wrap ul li a")) {
        setMobileMenu(false);
      }
    });
  }, []);

  return (
    <section className="fixed sm:hidden bottom-0 left-0 w-full z-50 bg-base-100 pt-2 pb-1">
      <div className="container">
        <div className="grid grid-cols-5 text-neutral-content">
          <NavLink
            to="/"
            className="flex flex-col justify-center items-center gap-1"
          >
            <FiHome className="text-[17px]" />
            <p className="text-xs">Home</p>
          </NavLink>

          <button
            onClick={() => setMobileMenu(true)}
            className="flex flex-col justify-center items-center gap-1"
          >
            <AiOutlineMenu className="text-xl" />
            <p className="text-xs">Categories</p>
          </button>

          <NavLink
            to="/cart"
            className="flex flex-col justify-center items-center gap-1"
          >
            <div className="relative">
              <RiShoppingCartLine className="text-lg" />
              <div className="absolute flex items-center justify-center w-3.5 h-3.5 font-bold bg-primary text-base-100 rounded-full -top-1.5 -right-2">
                <span className="mt-px text-xs">0</span>
              </div>
            </div>
            <p className="text-xs">Cart</p>
          </NavLink>

          <NavLink
            to="/shops"
            className="flex flex-col justify-center items-center gap-1"
          >
            <CiShop className="text-xl" />
            <p className="text-xs">Shop</p>
          </NavLink>

          <NavLink
            to="/account"
            className="flex flex-col justify-center items-center gap-1"
          >
            <FaRegCircleUser className="text-lg" />
            <p className="text-xs">Account</p>
          </NavLink>
        </div>
      </div>

      <MobileMenuSidebar
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />
    </section>
  );
}
