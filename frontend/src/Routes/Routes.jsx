import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";

import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";

import Spinner from "../components/Spinner/Spinner";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Invoice from "../pages/Admin/Order/Invoice";
import ProductWays from "../pages/Admin/Report/SalesReport/ProductWays";
import CampaignBanners from "../pages/Admin/EcommerceSetting/CampaignBanners/CampaignBanners";
import AddCampaignBanner from "../pages/Admin/EcommerceSetting/CampaignBanners/AddCampaignBanner";
import EditCampaignBanner from "../pages/Admin/EcommerceSetting/CampaignBanners/EditCampaignBanner";
import TodaysOrders from "../pages/Admin/Order/TodayOrders";

// Main pages
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const ProductDetails = React.lazy(
  () => import("../pages/ProductDetails/ProductDetails"),
);
const Shop = React.lazy(() => import("../pages/Shop/Shop"));
const Signup = React.lazy(() => import("../pages/Signup/Signup"));

// Account Layout and Private Routes
const AccountLayout = React.lazy(() => import("../Layout/AccountLayout"));
const PrivateRoute = React.lazy(() => import("../PrivateRoute/PrivateRoute"));
const EditeProfile = React.lazy(
  () => import("../pages/Account/EditeProfile/EditeProfile"),
);
const Orders = React.lazy(() => import("../pages/Account/Orders/Orders"));
const Profile = React.lazy(() => import("../pages/Account/Profile/Profile"));
const Setting = React.lazy(() => import("../pages/Account/Setting/Setting"));
const Wishlist = React.lazy(() => import("../pages/Account/Wishlist/Wishlist"));
const Checkout = React.lazy(() => import("../pages/Checkout/Checkout"));

const PaymentResult = React.lazy(
  () => import("../pages/Checkout/PaymentResult"),
);
const OrderDetailsPage = React.lazy(
  () => import("../pages/Account/OrderDetails/OrderDetails"),
);
const MyReviews = React.lazy(
  () => import("../pages/Account/Reviews/MyReviews"),
);

// ------------------------------------------------------------------------------
//Admin Layout and Routes
// ------------------------------------------------------------------------------

const AdminLayout = React.lazy(
  () => import("../Layout/AdminLayout/AdminLayout"),
);
const AdminRoute = React.lazy(() => import("../PrivateRoute/AdminRoute"));

// Dashboard
const Dashboard = React.lazy(
  () => import("../pages/Admin/Dashboard/Dashboard"),
);

// Categories
const AddCategory = React.lazy(
  () => import("../pages/Admin/Category/Categories/AddCategory"),
);
const AllCategories = React.lazy(
  () => import("../pages/Admin/Category/Categories/AllCategories"),
);
const EditCategory = React.lazy(
  () => import("../pages/Admin/Category/Categories/Editcategory"),
);

// Sub-Categories
const AddSubCategory = React.lazy(
  () => import("../pages/Admin/Category/SubCategories/AddSubCategory"),
);
const AllSubCategories = React.lazy(
  () => import("../pages/Admin/Category/SubCategories/AllSubCategories"),
);
const EditSubCategory = React.lazy(
  () => import("../pages/Admin/Category/SubCategories/EditSubCategory"),
);

// Sub-Sub Categories
const AddSubSubCategory = React.lazy(
  () => import("../pages/Admin/Category/SubSubCategory/AddSubSubCategory"),
);
const AllSubSubCategory = React.lazy(
  () => import("../pages/Admin/Category/SubSubCategory/AllSubSubCategory"),
);
const EditSubSubCategory = React.lazy(
  () => import("../pages/Admin/Category/SubSubCategory/EditSubSubCategory"),
);

// Brands
const AllBrands = React.lazy(() => import("../pages/Admin/Brand/AllBrands"));
const AddBrand = React.lazy(() => import("../pages/Admin/Brand/AddBrand"));
const EditBrand = React.lazy(() => import("../pages/Admin/Brand/EditBrand"));

// Colors
const AllColor = React.lazy(() => import("../pages/Admin/Color/AllColor"));
const AddColor = React.lazy(() => import("../pages/Admin/Color/AddColor"));
const EditColor = React.lazy(() => import("../pages/Admin/Color/EditColor"));

// Products
const AddProduct = React.lazy(
  () => import("../pages/Admin/Product/AddProduct"),
);
const ProductList = React.lazy(
  () => import("../pages/Admin/Product/ProductList"),
);
const EditProduct = React.lazy(
  () => import("../pages/Admin/Product/EditProduct"),
);

// Orders
const AllOrders = React.lazy(() => import("../pages/Admin/Order/AllOrders"));
const OrderDetails = React.lazy(
  () => import("../pages/Admin/Order/OrderDetails"),
);

// Reviews
const AllReview = React.lazy(
  () => import("../pages/Admin/AllReview/AllReview"),
);

// Users
const AllUsers = React.lazy(() => import("../pages/Admin/User/AllUsers"));

// Administrators
const AddAdministrator = React.lazy(
  () => import("../pages/Admin/Administrator/AddAdministrator"),
);
const Administrator = React.lazy(
  () => import("../pages/Admin/Administrator/Administrator"),
);
const EditAdministrator = React.lazy(
  () => import("../pages/Admin/Administrator/EditAdmin"),
);

// Ecommerce Settings
const CouponLists = React.lazy(
  () => import("../pages/Admin/EcommerceSetting/Coupon/CouponLists"),
);
const AddCoupon = React.lazy(
  () => import("../pages/Admin/EcommerceSetting/Coupon/AddCoupon"),
);
const EditCoupon = React.lazy(
  () => import("../pages/Admin/EcommerceSetting/Coupon/EditCoupon"),
);

const ShippingConfiguration = React.lazy(
  () =>
    import(
      "../pages/Admin/EcommerceSetting/ShippingConfiguration/ShippingConfiguration"
    ),
);

// General Settings
const AdminProfile = React.lazy(
  () => import("../pages/Admin/GeneralSetting/AdminProfile/AdminProfile"),
);
const BusinessInfo = React.lazy(
  () => import("../pages/Admin/GeneralSetting/BusinessInfo/BusinessInfo"),
);

// Banners
const Banner = React.lazy(
  () => import("../pages/Admin/EcommerceSetting/Banner/Banner"),
);
const AddBanner = React.lazy(
  () => import("../pages/Admin/EcommerceSetting/Banner/AddBanner"),
);
const EditBanner = React.lazy(
  () => import("../pages/Admin/EcommerceSetting/Banner/EditBanner"),
);
const ShopBanner = React.lazy(
  () => import("../pages/Admin/EcommerceSetting/ShopBanner/ShopBanner"),
);

// Front-End Pages
const About = React.lazy(() => import("../pages/Admin/FrontEnd/About/About"));
const Contact = React.lazy(
  () => import("../pages/Admin/FrontEnd/Contact/Contact"),
);
const Logo = React.lazy(() => import("../pages/Admin/FrontEnd/Logo/Logo"));
const Favicon = React.lazy(
  () => import("../pages/Admin/FrontEnd/Favicon/Favicon"),
);

// Flash Deals
const FlashDealList = React.lazy(
  () => import("../pages/Admin/FlashDeal/FlashDealList"),
);
const AddFlashDeal = React.lazy(
  () => import("../pages/Admin/FlashDeal/AddFlashDeal"),
);
const EditFlashDeal = React.lazy(
  () => import("../pages/Admin/FlashDeal/EditFlashDeal"),
);

// SEO Settings
const SEOSetting = React.lazy(
  () => import("../pages/Admin/SEOSetting/SEOSetting"),
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/shops",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/shops/:category",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/shops/:category/:subCategory",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/shops/:category/:subCategory/:subSubCategory",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/shops/brand/:brand",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Spinner />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Spinner />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Spinner />}>
            <Checkout />
          </Suspense>
        ),
      },

      {
        path: "/payment-result/:transactionId",
        element: (
          <Suspense fallback={<Spinner />}>
            <PrivateRoute>
              <PaymentResult />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/admin/order/print/:id",
    element: (
      <Suspense fallback={<Spinner />}>
        <Invoice />
      </Suspense>
    ),
  },

  {
    path: "/account",
    element: (
      <Suspense fallback={<Spinner />}>
        <PrivateRoute>
          <AccountLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: "/account/profile",
        element: <Profile />,
      },
      {
        path: "/account/profile/edite",
        element: <EditeProfile />,
      },
      {
        path: "/account/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/account/orders",
        element: <Orders />,
      },
      {
        path: "/account/orders/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "/account/reviews",
        element: <MyReviews />,
      },
      {
        path: "/account/setting",
        element: <Setting />,
      },
    ],
  },
  {
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
        element: <Dashboard />,
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

      //--------------ecommerce-setting
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
  },
]);
