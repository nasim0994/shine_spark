import { Link } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdMonitor,
  MdOutlineSettings,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import SidebarItems from "./SidebarItems";
import { useGetMainLogoQuery } from "../../../Redux/logo/logoApi";
import { VscPreview } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { MdFlashOn } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { TbReportMoney } from "react-icons/tb";
import { PiFlagBannerFill } from "react-icons/pi";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/admin/dashboard",
  },
  {
    icon: <BsCart4 />,
    title: "Product",
    subMenu: [
      {
        title: "Category",
        subSubMenu: [
          {
            title: "Categories",
            path: "/admin/category/categories",
          },
          {
            title: "Sub Categories",
            path: "/admin/category/sub-categories",
          },
          {
            title: "Sub SubCategories",
            path: "/admin/category/sub-sub-categories",
          },
        ],
      },
      {
        title: "Brand",
        path: "/admin/brands",
      },
      {
        title: "Color",
        path: "/admin/colors",
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
    icon: <BiSolidShoppingBags />,
    title: "Orders",
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
    icon: <MdFlashOn />,
    title: "Flash Deal",
    path: "/admin/flash-deal",
  },
  {
    icon: <VscPreview />,
    title: "Review",
    path: "/admin/reviews",
  },
  {
    icon: <FaUsers />,
    title: "Customers",
    path: "/admin/customer/all-customers",
  },
  {
    icon: <RiAdminFill />,
    title: "Administrator",
    path: "/admin/administrator/all-administrator",
  },
  {
    icon: <PiFlagBannerFill />,
    title: "Banner",
    subMenu: [
      {
        title: "Main Banner",
        path: "/admin/banner/main/all",
      },
      {
        title: "Shop Campaign Banner",
        path: "/admin/banner/shop-banner",
      },
      {
        title: "Campaign Banners",
        path: "/admin/banner/campaign-banners",
      },
    ],
  },
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
    slug: "general-setting",
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
        title: "Contact Us",
        path: "/admin/front-end/contact-us",
      },
    ],
  },
  {
    icon: <TbReportMoney />,
    title: "Reports",
    subMenu: [
      {
        title: "sell Report",
        subSubMenu: [
          {
            title: "Product Ways",
            path: "/admin/report/sales/product-ways",
          },
        ],
      },
    ],
  },
  {
    icon: <CiSearch className="text-lg" />,
    title: "SEO Setting",
    path: "/admin/seo-setting",
  },
];

export default function AdminSidebar() {
  const { data } = useGetMainLogoQuery();

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Link to="/admin/dashboard" className="block border-b py-4">
          <img
            src={
              data?.data[0]?.logo === null
                ? "/images/logo/logo.png"
                : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                    data?.data[0]?.logo
                  }`
            }
            alt="logo"
            className="mx-auto w-2/3"
          />
        </Link>

        <nav className="admin_siderbar">
          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
