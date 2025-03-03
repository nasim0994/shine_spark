/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Spinner from "@/components/shared/Spinner/Spinner";
import { Navigate } from "react-router-dom";

const Editcategory = React.lazy(
  () => import("@/pages/Admin/Category/Categories/Editcategory"),
);

const AllTopHeader = React.lazy(
  () => import("@/pages/Admin/TopHeader/AllTopHeader"),
);
const AddTopHeader = React.lazy(
  () => import("@/pages/Admin/TopHeader/AddTopHeader"),
);
const EditTopHeader = React.lazy(
  () => import("@/pages/Admin/TopHeader/EditTopHeader"),
);

const AdminLayout = React.lazy(() => import("@/Layout/AdminLayout"));
const AdminRoute = React.lazy(() => import("@/PrivateRoute/AdminRoute"));
const Dashboard = React.lazy(() => import("@/pages/Admin/Dashboard/Dashboard"));
const AllCategories = React.lazy(
  () => import("@/pages/Admin/Category/Categories/AllCategories"),
);
const AddCategory = React.lazy(
  () => import("@/pages/Admin/Category/Categories/AddCategory"),
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
      path: "/admin/product/category/all",
      element: <AllCategories />,
    },
    {
      path: "/admin/product/category/add",
      element: <AddCategory />,
    },
    {
      path: "/admin/product/category/edit/:id",
      element: <Editcategory />,
    },
    {
      path: "/admin/product/category/sub-category/all",
      element: <AllSubCategories />,
    },
    {
      path: "/admin/product/category/sub-category/add",
      element: <AddSubCategory />,
    },
    {
      path: "/admin/product/category/sub-category/edit/:id",
      element: <EditSubCategory />,
    },
    {
      path: "/admin/product/category/sub-sub-category/all",
      element: <AllSubSubCategory />,
    },
    {
      path: "/admin/product/category/sub-sub-category/add",
      element: <AddSubSubCategory />,
    },
    {
      path: "/admin/product/category/sub-sub-category/edit/:id",
      element: <EditSubSubCategory />,
    },
    {
      path: "/admin/product/brand/all",
      element: <AllBrands />,
    },
    {
      path: "/admin/product/brand/add",
      element: <AddBrand />,
    },
    {
      path: "/admin/product/brand/edit/:id",
      element: <EditBrand />,
    },
    {
      path: "/admin/product/color/all",
      element: <AllColor />,
    },
    {
      path: "/admin/product/color/add",
      element: <AddColor />,
    },
    {
      path: "/admin/product/color/edit/:id",
      element: <EditColor />,
    },
    {
      path: "/admin/product/all",
      element: <ProductList />,
    },
    {
      path: "/admin/product/add",
      element: <AddProduct />,
    },
    {
      path: "/admin/product/edit/:id",
      element: <EditProduct />,
    },

    // Order
    {
      path: "/admin/order/today",
      element: <TodaysOrders />,
    },
    {
      path: "/admin/order/all",
      element: <AllOrders />,
    },
    {
      path: "/admin/order/:id",
      element: <OrderDetails />,
    },

    // User
    {
      path: "/admin/user/customer/all",
      element: <AllUsers />,
    },
    //--------------Administrator
    {
      path: "/admin/administrator/all",
      element: <Administrator />,
    },
    {
      path: "/admin/administrator/add",
      element: <AddAdministrator />,
    },
    {
      path: "/admin/administrator/edit/:id",
      element: <EditAdministrator />,
    },

    //--------------Promo
    {
      path: "/admin/promo/flash-sale/add",
      element: <AddFlashDeal />,
    },
    {
      path: "/admin/promo/flash-sale/all",
      element: <FlashDealList />,
    },
    {
      path: "/admin/promo/flash-sale/edit/:id",
      element: <EditFlashDeal />,
    },

    {
      path: "/admin/promo/coupon/all",
      element: <CouponLists />,
    },
    {
      path: "/admin/promo/coupon/add",
      element: <AddCoupon />,
    },
    {
      path: "/admin/promo/coupon/edit/:id",
      element: <EditCoupon />,
    },

    //--------------Review
    {
      path: "/admin/review/all",
      element: <AllReview />,
    },

    //----------Business Setting
    //e-commerce-setting
    {
      path: "/admin/business/e-commerce/shipping-configuration",
      element: <ShippingConfiguration />,
    },
    {
      path: "/admin/business/e-commerce/company",
      element: <BusinessInfo />,
    },

    // Pages
    {
      path: "/admin/pages/about-us",
      element: <About />,
    },
    {
      path: "/admin/pages/contact-us",
      element: <Contact />,
    },
    {
      path: "/admin/pages/privacy-policy",
      element: <AdminPrivacyPolicy />,
    },
    {
      path: "/admin/pages/terms-conditions",
      element: <AdminTermsCondition />,
    },
    {
      path: "/admin/pages/return-policy",
      element: <AdminReturnPolicy />,
    },
    {
      path: "/admin/pages/faq/all",
      element: <FaqList />,
    },
    {
      path: "/admin/pages/faq/add",
      element: <AddFaq />,
    },
    {
      path: "/admin/pages/faq/edit/:id",
      element: <UpdateFaq />,
    },

    //-------------Top Header
    {
      path: "/admin/business/section/topHeader/all",
      element: <AllTopHeader />,
    },
    {
      path: "/admin/business/section/topHeader/add",
      element: <AddTopHeader />,
    },
    {
      path: "/admin/business/section/topHeader/edit/:id",
      element: <EditTopHeader />,
    },

    //-------------Banner
    {
      path: "/admin/business/section/banner/all",
      element: <Banner />,
    },
    {
      path: "/admin/business/section/banner/add",
      element: <AddBanner />,
    },
    {
      path: "/admin/business/section/banner/edit/:id",
      element: <EditBanner />,
    },

    //--------Shop Campaign Banner
    {
      path: "/admin/business/section/campaign-banner-1",
      element: <ShopBanner />,
    },
    //-------------CampaignBanners
    {
      path: "/admin/business/section/campaign-banner/all",
      element: <CampaignBanners />,
    },
    {
      path: "/admin/business/section/campaign-banner/add",
      element: <AddCampaignBanner />,
    },
    {
      path: "/admin/business/section/campaign-banner/edit/:id",
      element: <EditCampaignBanner />,
    },

    //----------General Setting
    {
      path: "/admin/general-setting/profile",
      element: <AdminProfile />,
    },

    // ----------Front-End Setting
    {
      path: "/admin/front-end/logo",
      element: <Logo />,
    },
    {
      path: "/admin/front-end/favicon",
      element: <Favicon />,
    },

    // ----Report
    {
      path: "/admin/report/sales-report/product-ways",
      element: <ProductWays />,
    },

    //----------SEO Setting
    {
      path: "/admin/seo-setting",
      element: <SEOSetting />,
    },
  ],
};
