/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Spinner from "@/components/shared/Spinner/Spinner";
import { Navigate } from "react-router-dom";

const AdminLayout = React.lazy(() => import("@/Layout/AdminLayout"));
import AdminRoute from "@/PrivateRoute/AdminRoute";
import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import AllCategories from "@/pages/Admin/Category/Categories/AllCategories";
import AddCategory from "@/pages/Admin/Category/Categories/AddCategory";
import EditCategory from "@/pages/Admin/Category/Categories/EditCategory";
import AllSubCategories from "@/pages/Admin/Category/SubCategories/AllSubCategories";
import AddSubCategory from "@/pages/Admin/Category/SubCategories/AddSubCategory";
import EditSubCategory from "@/pages/Admin/Category/SubCategories/EditSubCategory";
import AllSubSubCategory from "@/pages/Admin/Category/SubSubCategory/AllSubSubCategory";
import AddSubSubCategory from "@/pages/Admin/Category/SubSubCategory/AddSubSubCategory";
import EditSubSubCategory from "@/pages/Admin/Category/SubSubCategory/EditSubSubCategory";
import AllBrands from "@/pages/Admin/Brand/AllBrands";
import AddBrand from "@/pages/Admin/Brand/AddBrand";
import EditBrand from "@/pages/Admin/Brand/EditBrand";
import AllColor from "@/pages/Admin/Color/AllColor";
import AddColor from "@/pages/Admin/Color/AddColor";
import EditColor from "@/pages/Admin/Color/EditColor";
import ProductList from "@/pages/Admin/Product/ProductList";
import AddProduct from "@/pages/Admin/Product/AddProduct";
import EditProduct from "@/pages/Admin/Product/EditProduct";
import TodaysOrders from "@/pages/Admin/Order/TodayOrders";
import AllOrders from "@/pages/Admin/Order/AllOrders";
import OrderDetails from "@/pages/Admin/Order/OrderDetails";
import AllUsers from "@/pages/Admin/User/AllUsers";
import AddFlashDeal from "@/pages/Admin/FlashDeal/AddFlashDeal";
import FlashDealList from "@/pages/Admin/FlashDeal/FlashDealList";
import EditFlashDeal from "@/pages/Admin/FlashDeal/EditFlashDeal";
import AllReview from "@/pages/Admin/AllReview/AllReview";
import Administrator from "@/pages/Admin/Administrator/Administrator";
import AddAdministrator from "@/pages/Admin/Administrator/AddAdministrator";
import EditAdministrator from "@/pages/Admin/Administrator/EditAdmin";
import CouponLists from "@/pages/Admin/EcommerceSetting/Coupon/CouponLists";
import AddCoupon from "@/pages/Admin/EcommerceSetting/Coupon/AddCoupon";
import EditCoupon from "@/pages/Admin/EcommerceSetting/Coupon/EditCoupon";
import ShippingConfiguration from "@/pages/Admin/EcommerceSetting/ShippingConfiguration/ShippingConfiguration";
import Banner from "@/pages/Admin/EcommerceSetting/Banner/Banner";
import AddBanner from "@/pages/Admin/EcommerceSetting/Banner/AddBanner";
import EditBanner from "@/pages/Admin/EcommerceSetting/Banner/EditBanner";
import ShopBanner from "@/pages/Admin/EcommerceSetting/ShopBanner/ShopBanner";
import CampaignBanners from "@/pages/Admin/EcommerceSetting/CampaignBanners/CampaignBanners";
import AddCampaignBanner from "@/pages/Admin/EcommerceSetting/CampaignBanners/AddCampaignBanner";
import EditCampaignBanner from "@/pages/Admin/EcommerceSetting/CampaignBanners/EditCampaignBanner";
import AdminProfile from "@/pages/Admin/GeneralSetting/AdminProfile/AdminProfile";
import BusinessInfo from "@/pages/Admin/GeneralSetting/BusinessInfo/BusinessInfo";
import AdminPrivacyPolicy from "@/pages/Admin/PrivacyPolicy/AdminPrivacyPolicy";
import AdminTermsCondition from "@/pages/Admin/TermsCondition/AdminTermsCondition";
import AdminReturnPolicy from "@/pages/Admin/ReturnPolicy/AdminReturnPolicy";
import Logo from "@/pages/Admin/FrontEnd/Logo/Logo";
import Favicon from "@/pages/Admin/FrontEnd/Favicon/Favicon";
import About from "@/pages/Admin/FrontEnd/About/About";
import Contact from "@/pages/Admin/FrontEnd/Contact/Contact";
import FaqList from "@/pages/Admin/Faq/FaqList";
import AddFaq from "@/pages/Admin/Faq/AddFaq";
import UpdateFaq from "@/pages/Admin/Faq/UpdateFaq";
import ProductWays from "@/pages/Admin/Report/SalesReport/ProductWays";
import SEOSetting from "@/pages/Admin/SEOSetting/SEOSetting";

export const adminRoutes = {
  path: "/admin",
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    </Suspense>
  ),
  children: [
    {
      path: "/admin",
      element: <Navigate to="/admin/dashboard" replace />,
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin/category/categories",
      element: <AllCategories />,
    },
    {
      path: "/admin/category/add-category",
      element: <AddCategory />,
    },
    {
      path: "/admin/category/edit/:id",
      element: <EditCategory />,
    },
    {
      path: "/admin/category/sub-categories",
      element: <AllSubCategories />,
    },
    {
      path: "/admin/category/add-sub-category",
      element: <AddSubCategory />,
    },
    {
      path: "/admin/category/edit-sub-category/:id",
      element: <EditSubCategory />,
    },
    {
      path: "/admin/category/sub-sub-categories",
      element: <AllSubSubCategory />,
    },
    {
      path: "/admin/category/add-sub-sub-category",
      element: <AddSubSubCategory />,
    },
    {
      path: "/admin/category/edit-sub-sub-category/:id",
      element: <EditSubSubCategory />,
    },
    {
      path: "/admin/brands",
      element: <AllBrands />,
    },
    {
      path: "/admin/add-brand",
      element: <AddBrand />,
    },
    {
      path: "/admin/edit-brand/:id",
      element: <EditBrand />,
    },
    {
      path: "/admin/colors",
      element: <AllColor />,
    },
    {
      path: "/admin/color/add",
      element: <AddColor />,
    },
    {
      path: "/admin/color/edit/:id",
      element: <EditColor />,
    },
    {
      path: "/admin/product/all-products",
      element: <ProductList />,
    },
    {
      path: "/admin/product/add-product",
      element: <AddProduct />,
    },
    {
      path: "/admin/product/edit-product/:id",
      element: <EditProduct />,
    },
    {
      path: "/admin/order/todays-orders",
      element: <TodaysOrders />,
    },
    {
      path: "/admin/order/all-orders",
      element: <AllOrders />,
    },
    {
      path: "/admin/order/:id",
      element: <OrderDetails />,
    },
    {
      path: "/admin/customer/all-customers",
      element: <AllUsers />,
    },

    //--------------Flash Deal
    {
      path: "/admin/flash-deal/add",
      element: <AddFlashDeal />,
    },
    {
      path: "/admin/flash-deal",
      element: <FlashDealList />,
    },
    {
      path: "/admin/flash-deal/edit/:id",
      element: <EditFlashDeal />,
    },

    //--------------Review
    {
      path: "/admin/reviews",
      element: <AllReview />,
    },

    //--------------Administrator
    {
      path: "/admin/administrator/all-administrator",
      element: <Administrator />,
    },
    {
      path: "/admin/administrator/add-administrator",
      element: <AddAdministrator />,
    },
    {
      path: "/admin/administrator/edit-administrator/:id",
      element: <EditAdministrator />,
    },

    //--------------e-commerce-setting
    {
      path: "/admin/ecommerce-setting/coupons",
      element: <CouponLists />,
    },
    {
      path: "/admin/ecommerce-setting/coupons/add-coupon",
      element: <AddCoupon />,
    },
    {
      path: "/admin/ecommerce-setting/coupons/edit-coupon/:id",
      element: <EditCoupon />,
    },

    {
      path: "/admin/ecommerce-setting/shipping-configuration",
      element: <ShippingConfiguration />,
    },

    //-------------Banner
    {
      path: "/admin/banner/main/all",
      element: <Banner />,
    },
    {
      path: "/admin/banner/main/add",
      element: <AddBanner />,
    },
    {
      path: "/admin/banner/main/edit/:id",
      element: <EditBanner />,
    },

    //--------Shop Campaign Banner
    {
      path: "/admin/banner/shop-banner",
      element: <ShopBanner />,
    },

    //
    //-------------CampaignBanners
    {
      path: "/admin/banner/campaign-banners",
      element: <CampaignBanners />,
    },
    {
      path: "/admin/banner/campaign-banners/add",
      element: <AddCampaignBanner />,
    },
    {
      path: "/admin/banner/campaign-banners/edit/:id",
      element: <EditCampaignBanner />,
    },

    //----------General Setting
    {
      path: "/admin/general-setting/profile",
      element: <AdminProfile />,
    },
    {
      path: "/admin/general-setting/business-info",
      element: <BusinessInfo />,
    },

    {
      path: "/admin/front-end/privacy-policy",
      element: <AdminPrivacyPolicy />,
    },
    {
      path: "/admin/front-end/terms-conditions",
      element: <AdminTermsCondition />,
    },
    {
      path: "/admin/front-end/return-policy",
      element: <AdminReturnPolicy />,
    },

    //--------------Front-End
    {
      path: "/admin/front-end/logo",
      element: <Logo />,
    },
    {
      path: "/admin/front-end/favicon",
      element: <Favicon />,
    },
    {
      path: "/admin/front-end/about-us",
      element: <About />,
    },
    {
      path: "/admin/front-end/contact-us",
      element: <Contact />,
    },

    // Faq
    {
      path: "/admin/front-end/faq/all",
      element: <FaqList />,
    },
    {
      path: "/admin/front-end/faq/add",
      element: <AddFaq />,
    },
    {
      path: "/admin/front-end/faq/edit/:id",
      element: <UpdateFaq />,
    },

    // ----Report
    {
      path: "/admin/report/sales/product-ways",
      element: <ProductWays />,
    },

    //----------SEO Setting
    {
      path: "/admin/seo-setting",
      element: <SEOSetting />,
    },
  ],
};
