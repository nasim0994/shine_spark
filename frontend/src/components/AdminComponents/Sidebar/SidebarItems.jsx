import { useEffect, useState } from "react";
import SidebarSubItems from "./SidebarSubItems";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

export default function SidebarItems({ item }) {
  const [dropdown, setDropdown] = useState(false);

  const [active, setActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes(item?.title.toLowerCase().split(" ").join("-"))) {
      setActive(true);
      setDropdown(true);
    } else {
      setActive(false);
      setDropdown(false);
    }
  }, [pathname, item?.title]);

  if (item?.subMenu) {
    return (
      <li>
        <button
          className={active && "active"}
          onClick={() => setDropdown(!dropdown)}
        >
          <i>{item.icon}</i>

          <div className="flex items-center justify-between gap-1.5">
            <h3>{item.title}</h3>

            {dropdown ? (
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            ) : (
              <span>
                <MdOutlineKeyboardArrowRight />
              </span>
            )}
          </div>
        </button>

        <nav className={`dropdown ${dropdown && "dropdown_show"}`}>
          <ul>
            {item?.subMenu?.map((subItems, i) => (
              <SidebarSubItems key={i} subItems={subItems} />
            ))}
          </ul>
        </nav>
      </li>
    );
  } else {
    return (
      <li>
        <NavLink to={item?.path}>
          <i>{item.icon}</i>
          <h3>{item.title}</h3>
        </NavLink>
      </li>
    );
  }
}
