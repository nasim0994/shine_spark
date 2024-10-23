import { AiOutlineHeart, AiOutlineSetting } from "react-icons/ai";
import { FiMonitor } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BiLogOutCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { userLogout } from "../../Redux/user/userSlice";

export default function AccountSidebar() {
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <img
          src={
            loggedUser?.data?.image === ""
              ? "/images/demo_user.jpg"
              : `${import.meta.env.VITE_BACKEND_URL}/user/${
                  loggedUser?.data?.image
                }`
          }
          alt="logo"
          className="mx-auto h-28 w-28 rounded-full border"
        />
        <h3 className="text-center text-lg font-medium text-neutral-content">
          {loggedUser?.data?.firstName} {loggedUser?.data?.lastName}
        </h3>
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        <li>
          <NavLink to="/account/profile">
            <span className="flex items-center gap-2 duration-300 hover:text-primary">
              <FiMonitor className="text-lg" />
              View Profile
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/wishlist">
            <span className="flex items-center gap-2 duration-300 hover:text-primary">
              <AiOutlineHeart className="text-xl" />
              My Wishlist
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/orders">
            <span className="flex items-center gap-2 duration-300 hover:text-primary">
              <IoBagCheckOutline className="text-xl" />
              My Order List
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/reviews">
            <span className="flex items-center gap-2 duration-300 hover:text-primary">
              <IoBagCheckOutline className="text-xl" />
              My Reviews
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/setting">
            <span className="flex items-center gap-2 duration-300 hover:text-primary">
              <AiOutlineSetting className="text-xl" />
              Setting
            </span>
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => dispatch(userLogout())}
            className="text-red-500"
          >
            <span className="flex items-center gap-2 duration-300 hover:text-primary">
              <BiLogOutCircle /> Logout
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
