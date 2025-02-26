import { RiAdminFill, RiCouponLine, RiPagesLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { IoFlashOutline, IoStorefrontOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";
import { TbShoppingBagCheck, TbReportMoney } from "react-icons/tb";
import { LuFileBox } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
import { CgSearchFound } from "react-icons/cg";
import { MdMonitor, MdOutlineSettings } from "react-icons/md";

import SidebarItems from "./SidebarItems";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/Redux/user/userSlice";
import { FaUsers } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

const adminSidebarItems = [
  {
    title: "Dashboard",
    menu: [
      {
        icon: <BiCategory />,
        title: "Dashboard",
        path: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Product & Stock",
    menu: [
      {
        icon: <BsBoxes />,
        title: "Product",
        subMenu: [
          {
            title: "Category",
            subSubMenu: [
              {
                title: "Categories",
                path: "/admin/product/category/all",
              },
              {
                title: "Sub Categories",
                path: "/admin/product/category/sub-category/all",
              },
              {
                title: "Sub Sub Categories",
                path: "/admin/product/category/sub-sub-category/all",
              },
            ],
          },
          {
            title: "Brand",
            path: "/admin/product/brand/all",
          },
          {
            title: "Color",
            path: "/admin/product/color/all",
          },
          {
            title: "Product",
            subSubMenu: [
              {
                title: "Add New Product",
                path: "/admin/product/add-product",
              },
              {
                title: "All Products",
                path: "/admin/product/all-products",
              },
            ],
          },
        ],
      },
      {
        icon: <LuFileBox />,
        title: "Stock",
        path: "/admin/stock/all",
      },
    ],
  },
  {
    title: "Orders & Reports",
    menu: [
      {
        icon: <TbShoppingBagCheck />,
        title: "Order",
        subMenu: [
          {
            title: "All Orders",
            path: "/admin/order/all-orders",
          },
          {
            title: "Today's Orders",
            path: "/admin/order/todays-orders",
          },
        ],
      },
      {
        icon: <TbReportMoney />,
        title: "Report",
        subMenu: [
          {
            title: "Sales Report",
            subSubMenu: [
              {
                title: "Product Ways",
                path: "/admin/report/sales/product-ways",
              },
              {
                title: "Invoice Ways",
                path: "/admin/report/sales/invoice-ways",
              },
              {
                title: "Date Ways",
                path: "/admin/report/sales/date-ways",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Promo",
    menu: [
      {
        icon: <IoFlashOutline />,
        title: "Flash Sale",
        path: "/admin/promo/flash-sale",
      },
      {
        icon: <RiCouponLine />,
        title: "Coupon",
        path: "/admin/promo/coupon",
      },
    ],
  },
  {
    title: "Users",
    menu: [
      {
        icon: <FaUsers />,
        title: "Customers",
        path: "/admin/user/customer/all",
      },
      {
        icon: <RiAdminFill />,
        title: "Administrator",
        path: "/admin/administrator/all-administrator",
      },
      {
        icon: <GrUserWorker />,
        title: "Staff",
        path: "/admin/staff/all",
      },
    ],
  },
  {
    title: "Business Setting",
    menu: [
      {
        icon: <IoStorefrontOutline />,
        title: "E-commerce",
        subMenu: [
          {
            title: "Company",
            path: "/admin/business/ecommerce/company",
          },
          {
            title: "Shipping Configuration",
            path: "/admin/business/ecommerce/shipping-configuration",
          },
          {
            title: "Landing Page",
            path: "/admin/business/ecommerce/landing-page/all",
          },
        ],
      },
      {
        icon: <RiPagesLine />,
        title: "Pages",
        subMenu: [
          {
            title: "Contact Us",
            path: "/admin/pages/contact-us",
          },
          {
            title: "About Us",
            path: "/admin/pages/about-us",
          },
          {
            title: "Privacy Policy",
            path: "/admin/pages/privacy-policy",
          },
          {
            title: "Return Policy",
            path: "/admin/pages/return-policy",
          },
        ],
      },
      {
        icon: <PiFlagBannerFill />,
        title: "Sections",
        subMenu: [
          {
            title: "Banner",
            path: "/admin/business/sections/banner",
          },
          {
            title: "Campaign Banner",
            path: "/admin/business/sections/campaign-banner",
          },
        ],
      },
    ],
  },
  {
    title: "Settings",
    menu: [
      {
        icon: <MdOutlineSettings />,
        title: "E-commerce Setting",
        subMenu: [
          {
            title: "Coupon",
            path: "/admin/ecommerce-setting/coupons",
          },
          {
            title: "Shipping Configuration",
            path: "/admin/ecommerce-setting/shipping-configuration",
          },
        ],
      },
      {
        icon: <IoMdSettings />,
        title: "General Setting",
        subMenu: [
          {
            title: "Profile",
            path: "/admin/general-setting/profile",
          },
          {
            title: "Business Info",
            path: "/admin/general-setting/business-info",
          },
        ],
      },
      {
        icon: <MdMonitor />,
        title: "Front-End Setting",
        subMenu: [
          {
            title: "Logo",
            path: "/admin/front-end/logo",
          },
          {
            title: "Favicon",
            path: "/admin/front-end/favicon",
          },
          {
            title: "About Us",
            path: "/admin/front-end/about-us",
          },
          {
            title: "FAQ",
            path: "/admin/front-end/faq/all",
          },
          {
            title: "Contact Us",
            path: "/admin/front-end/contact-us",
          },
          {
            title: "Privacy Policy",
            path: "/admin/front-end/privacy-policy",
          },
          {
            title: "Terms & Conditions",
            path: "/admin/front-end/terms-conditions",
          },
          {
            title: "Return Policy",
            path: "/admin/front-end/return-policy",
          },
        ],
      },
    ],
  },
  {
    title: "SEO",
    menu: [
      {
        icon: <CgSearchFound />,
        title: "SEO Setting",
        path: "/admin/seo-setting",
      },
    ],
  },
];

export default function Sidebar() {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const dispatch = useDispatch();

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="sidebar_menu">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="logo"
            className="my-3 w-24 sm:w-32"
          />
        </Link>

        <nav className="admin_sidebar_item flex flex-col gap-3">
          {adminSidebarItems?.map((item, i) => (
            <ul key={i}>
              <h3 className="pb-2 text-[13px] uppercase text-neutral/60">
                {item?.title}
              </h3>
              {item?.menu?.map((menu, i) => (
                <SidebarItems key={i} item={menu} />
              ))}
            </ul>
          ))}
        </nav>
      </div>

      <div className="border-t py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img
              src="/images/demo_user.jpg"
              alt="demouser"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <h3 className="font-medium">{user?.name}</h3>
              <p className="-mt-px text-xs text-neutral-content">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const isConfirm = window.confirm(
                "Are you sure you want to logout?",
              );
              if (isConfirm) {
                dispatch(userLogout());
              }
            }}
            className="rounded bg-red-100 px-3 py-1.5 text-[13px] text-red-500 duration-300 hover:bg-red-500 hover:text-base-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
