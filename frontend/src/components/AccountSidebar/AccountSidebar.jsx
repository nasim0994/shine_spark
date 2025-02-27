import { AiOutlineSetting } from "react-icons/ai";
import { FiMonitor } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { BiLogOutCircle } from "react-icons/bi";
import { BsHandbag } from "react-icons/bs";
import { TbBasketStar } from "react-icons/tb";

import { NavLink } from "react-router-dom";
import { userLogout } from "../../Redux/user/userSlice";

export default function AccountSidebar() {
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const image =
    !loggedUser?.data?.image ||
    loggedUser?.data?.image === "" ||
    loggedUser?.data?.image === null
      ? "/images/demo_user.jpg"
      : `${import.meta.env.VITE_BACKEND_URL}/user/${loggedUser?.data?.image}`;

  return (
    <div className="flex min-h-[97vh] flex-col justify-between sm:min-h-[73vh]">
      <div>
        <img
          src={image}
          alt="user"
          className="mx-auto h-28 w-28 rounded-full border"
        />
        <h3 className="text-center text-lg font-medium text-neutral-content">
          {loggedUser?.data?.firstName} {loggedUser?.data?.lastName}
        </h3>

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
            <NavLink to="/account/orders">
              <span className="flex items-center gap-2 duration-300 hover:text-primary">
                <BsHandbag className="text-xl" />
                My Order List
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/account/reviews">
              <span className="flex items-center gap-2 duration-300 hover:text-primary">
                <TbBasketStar className="text-xl" />
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
        </ul>
      </div>

      <button
        onClick={() => dispatch(userLogout())}
        className="w-full rounded bg-red-500 px-4 py-2 text-sm text-base-100"
      >
        <span className="flex items-center justify-center gap-2">
          <BiLogOutCircle /> Logout
        </span>
      </button>
    </div>
  );
}
