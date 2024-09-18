import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiShop } from "react-icons/ci";

export default function MobileBottomHeader() {
  return (
    <section className="fixed bottom-0 left-0 z-50 w-full bg-base-100 pb-1 pt-2 sm:hidden">
      <div className="container">
        <div className="text-neutral-content grid grid-cols-4">
          <NavLink
            to="/"
            className="flex flex-col items-center justify-center gap-1"
          >
            <FiHome className="text-[17px]" />
            <p className="text-xs">Home</p>
          </NavLink>

          <NavLink
            to="/cart"
            className="flex flex-col items-center justify-center gap-1"
          >
            <div className="relative">
              <RiShoppingCartLine className="text-lg" />
              <div className="absolute -right-2 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary font-bold text-base-100">
                <span className="mt-px text-xs">0</span>
              </div>
            </div>
            <p className="text-xs">Cart</p>
          </NavLink>

          <NavLink
            to="/shops"
            className="flex flex-col items-center justify-center gap-1"
          >
            <CiShop className="text-xl" />
            <p className="text-xs">Shop</p>
          </NavLink>

          <NavLink
            to="/account"
            className="flex flex-col items-center justify-center gap-1"
          >
            <FaRegCircleUser className="text-lg" />
            <p className="text-xs">Account</p>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
