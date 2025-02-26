import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

export default function SidebarSubItems({ subItems }) {
  const [subDropdown, setSubDropdown] = useState(false);
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes(subItems?.title.toLowerCase().split(" ").join("-"))) {
      setActive(true);
      setSubDropdown(true);
    } else {
      setActive(false);
      setSubDropdown(false);
    }
  }, [pathname, subItems?.title]);

  if (subItems?.subSubMenu) {
    return (
      <li>
        <button
          className={active && "active"}
          onClick={() => setSubDropdown(!subDropdown)}
        >
          <div className="flex items-center gap-1.5">
            {subItems.icon} {subItems.title}
          </div>

          {subDropdown ? (
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          ) : (
            <span>
              <MdOutlineKeyboardArrowRight />
            </span>
          )}
        </button>

        <nav className={`subDropdown ${subDropdown && "subDropdown_show"}`}>
          <ul>
            {subItems?.subSubMenu?.map((item, i) => (
              <li key={i}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </li>
    );
  } else {
    return (
      <li>
        <NavLink to={subItems?.path}>
          <h6>{subItems.title}</h6>
        </NavLink>
      </li>
    );
  }
}
