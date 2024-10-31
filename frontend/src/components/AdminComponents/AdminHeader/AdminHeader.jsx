import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

import { userLogout } from "../../../Redux/user/userSlice";

export default function AdminHeader({ setSidebar }) {
  const [dropdown, setDropdown] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".d_btn")) {
        setDropdown(false);
      }
    });
  }, []);

  return (
    <header className="bg-base-100 px-6 py-3 text-neutral shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(true)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>
          <Link
            to="/"
            className="flex items-center gap-1 text-[15px] duration-300 hover:text-secondary"
            target="_blank"
          >
            <TbWorldWww className="text-xl" />
            Visit Website
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="d_btn flex items-center gap-1"
          >
            <FaRegUserCircle className="text-lg" />
            {loggedUser?.data?.name}
          </button>

          {dropdown && (
            <div className="absolute right-0 top-[140%] w-40 rounded bg-base-100 p-2 shadow">
              <Link
                to="/admin/general-setting/profile"
                className="block w-full rounded px-2 py-1 text-start hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={() => dispatch(userLogout())}
                className="w-full rounded px-2 py-1 text-start text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
