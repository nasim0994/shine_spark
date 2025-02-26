/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Spinner from "@/components/shared/Spinner/Spinner";
import { Navigate } from "react-router-dom";

const AdminLayout = React.lazy(() => import("@/Layout/AdminLayout"));
const AdminRoute = React.lazy(() => import("@/PrivateRoute/AdminRoute"));
const Dashboard = React.lazy(() => import("@/pages/Admin/Dashboard/Dashboard"));
const AllCategories = React.lazy(
  () => import("@/pages/Admin/Category/Categories/AllCategories"),
);
const AddCategory = React.lazy(
  () => import("@/pages/Admin/Category/Categories/AddCategory"),
);
const EditCategory = React.lazy(
  () => import("@/pages/Admin/Category/Categories/EditCategory"),
);
const AllSubCategories = React.lazy(
  () => import("@/pages/Admin/Category/SubCategories/AllSubCategories"),
);
const AddSubCategory = React.lazy(
  () => import("@/pages/Admin/Category/SubCategories/AddSubCategory"),
);
const EditSubCategory = React.lazy(
  () => import("@/pages/Admin/Category/SubCategories/EditSubCategory"),
);
const AllSubSubCategory = React.lazy(
  () => import("@/pages/Admin/Category/SubSubCategory/AllSubSubCategory"),
);
const AddSubSubCategory = React.lazy(
  () => import("@/pages/Admin/Category/SubSubCategory/AddSubSubCategory"),
);
const EditSubSubCategory = React.lazy(
  () => import("@/pages/Admin/Category/SubSubCategory/EditSubSubCategory"),
);
const AllBrands = React.lazy(() => import("@/pages/Admin/Brand/AllBrands"));
const AddBrand = React.lazy(() => import("@/pages/Admin/Brand/AddBrand"));
const EditBrand = React.lazy(() => import("@/pages/Admin/Brand/EditBrand"));
const AllColor = React.lazy(() => import("@/pages/Admin/Color/AllColor"));
const AddColor = React.lazy(() => import("@/pages/Admin/Color/AddColor"));
const EditColor = React.lazy(() => import("@/pages/Admin/Color/EditColor"));
const ProductList = React.lazy(
  () => import("@/pages/Admin/Product/ProductList"),
);
const AddProduct = React.lazy(() => import("@/pages/Admin/Product/AddProduct"));
const EditProduct = React.lazy(
  () => import("@/pages/Admin/Product/EditProduct"),
);
const TodaysOrders = React.lazy(
  () => import("@/pages/Admin/Order/TodayOrders"),
);
const AllOrders = React.lazy(() => import("@/pages/Admin/Order/AllOrders"));
const OrderDetails = React.lazy(
  () => import("@/pages/Admin/Order/OrderDetails"),
);
const AllUsers = React.lazy(() => import("@/pages/Admin/User/AllUsers"));
const AddFlashDeal = React.lazy(
  () => import("@/pages/Admin/FlashDeal/AddFlashDeal"),
);
const FlashDealList = React.lazy(
  () => import("@/pages/Admin/FlashDeal/FlashDealList"),
);
const EditFlashDeal = React.lazy(
  () => import("@/pages/Admin/FlashDeal/EditFlashDeal"),
);
const AllReview = React.lazy(() => import("@/pages/Admin/AllReview/AllReview"));
const Administrator = React.lazy(
  () => import("@/pages/Admin/Administrator/Administrator"),
);
const AddAdministrator = React.lazy(
  () => import("@/pages/Admin/Administrator/AddAdministrator"),
);
const EditAdministrator = React.lazy(
  () => import("@/pages/Admin/Administrator/EditAdmin"),
);
const CouponLists = React.lazy(
  () => import("@/pages/Admin/EcommerceSetting/Coupon/CouponLists"),
);
const AddCoupon = React.lazy(
  () => import("@/pages/Admin/EcommerceSetting/Coupon/AddCoupon"),
);
const EditCoupon = React.lazy(
  () => import("@/pages/Admin/EcommerceSetting/Coupon/EditCoupon"),
);
const ShippingConfiguration = React.lazy(
  () =>
    import(
      "@/pages/Admin/EcommerceSetting/ShippingConfiguration/ShippingConfiguration"
    ),
);
const Banner = React.lazy(
  () => import("@/pages/Admin/EcommerceSetting/Banner/Banner"),
);
const AddBanner = React.lazy(
  () => import("@/pages/Admin/EcommerceSetting/Banner/AddBanner"),
);
const EditBanner = React.lazy(
  () => import("@/pages/Admin/EcommerceSetting/Banner/EditBanner"),
);
const ShopBanner = React.lazy(
  () => import("@/pages/Admin/EcommerceSetting/ShopBanner/ShopBanner"),
);
const CampaignBanners = React.lazy(
  () =>
    import("@/pages/Admin/EcommerceSetting/CampaignBanners/CampaignBanners"),
);
const AddCampaignBanner = React.lazy(
  () =>
    import("@/pages/Admin/EcommerceSetting/CampaignBanners/AddCampaignBanner"),
);
const EditCampaignBanner = React.lazy(
  () =>
    import("@/pages/Admin/EcommerceSetting/CampaignBanners/EditCampaignBanner"),
);
const AdminProfile = React.lazy(
  () => import("@/pages/Admin/GeneralSetting/AdminProfile/AdminProfile"),
);
const BusinessInfo = React.lazy(
  () => import("@/pages/Admin/GeneralSetting/BusinessInfo/BusinessInfo"),
);
const AdminPrivacyPolicy = React.lazy(
  () => import("@/pages/Admin/PrivacyPolicy/AdminPrivacyPolicy"),
);
const AdminTermsCondition = React.lazy(
  () => import("@/pages/Admin/TermsCondition/AdminTermsCondition"),
);
const AdminReturnPolicy = React.lazy(
  () => import("@/pages/Admin/ReturnPolicy/AdminReturnPolicy"),
);
const Logo = React.lazy(() => import("@/pages/Admin/FrontEnd/Logo/Logo"));
const Favicon = React.lazy(
  () => import("@/pages/Admin/FrontEnd/Favicon/Favicon"),
);
const About = React.lazy(() => import("@/pages/Admin/FrontEnd/About/About"));
const Contact = React.lazy(
  () => import("@/pages/Admin/FrontEnd/Contact/Contact"),
);
const FaqList = React.lazy(() => import("@/pages/Admin/Faq/FaqList"));
const AddFaq = React.lazy(() => import("@/pages/Admin/Faq/AddFaq"));
const UpdateFaq = React.lazy(() => import("@/pages/Admin/Faq/UpdateFaq"));
const ProductWays = React.lazy(
  () => import("@/pages/Admin/Report/SalesReport/ProductWays"),
);
const SEOSetting = React.lazy(
  () => import("@/pages/Admin/SEOSetting/SEOSetting"),
);

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
