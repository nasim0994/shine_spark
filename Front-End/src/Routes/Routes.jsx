import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";

import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Shop from "../pages/Shop/Shop";
import Signup from "../pages/Signup/Signup";

import AccountLayout from "../Layout/AccountLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import EditePeofile from "../pages/Account/EditePeofile/EditePeofile";
import Orders from "../pages/Account/Orders/Orders";
import Profile from "../pages/Account/Profile/Profile";
import Setting from "../pages/Account/Setting/Setting";
import Wishlist from "../pages/Account/Wishlist/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
import PaymentResult from "../pages/Checkout/PaymentResult";

import OrderDetailsPage from "../pages/Account/OrderDetails/OrderDetails";
import MyReviews from "../pages/Account/Reviews/MyReviews";

//------------------------Admin Layout
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import AdminRoute from "../PrivateRoute/AdminRoute";

//---------------Dashboard
import Dashboard from "../pages/Admin/Dashboard/Dashboard";

//---------------Category
import AddCategory from "../pages/Admin/Category/Categories/AddCategory";
import AllCategories from "../pages/Admin/Category/Categories/AllCategories";
import EditCategory from "../pages/Admin/Category/Categories/Editcategory";

import AddSubCategory from "../pages/Admin/Category/SubCategories/AddSubCategory";
import AllSubCategories from "../pages/Admin/Category/SubCategories/AllSubCategories";
import EditSubCategory from "../pages/Admin/Category/SubCategories/EditSubCategory";

import AddSubSubCategory from "../pages/Admin/Category/SubSubCategory/AddSubSubCategory";
import AllSubSubCategory from "../pages/Admin/Category/SubSubCategory/AllSubSubCategory";
import EditSubSubCategory from "../pages/Admin/Category/SubSubCategory/EditSubSubCategory";

//---------------Brand
import AllBrands from "../pages/Admin/Brand/AllBrands";
import AddBrand from "../pages/Admin/Brand/AddBrand";
import EditBrand from "../pages/Admin/Brand/EditBrand";

// ---------------Color
import AllColor from "../pages/Admin/Color/AllColor";
import AddColor from "../pages/Admin/Color/AddColor";
import EditColor from "../pages/Admin/Color/EditColor";

//---------------Product
import AddProduct from "../pages/Admin/Product/AddProduct";
import ProductList from "../pages/Admin/Product/ProductList";
import EditProduct from "../pages/Admin/Product/EditProduct";

//---------------Order
import AllOrders from "../pages/Admin/Order/AllOrders";
import OrderDetails from "../pages/Admin/Order/OrderDetails";

//---------------Review
import AllReview from "../pages/Admin/AllReview/AllReview";

//---------------User
import AllUsers from "../pages/Admin/User/AllUsers";

//---------------Administrator
import AddAdministrator from "../pages/Admin/Administrator/AddAdministrator";
import Administrator from "../pages/Admin/Administrator/Administrator";

//--------------ecommerce-setting
import CouponLists from "../pages/Admin/EcommerceSetting/Coupon/CouponLists";
import AddCoupon from "../pages/Admin/EcommerceSetting/Coupon/AddCoupon";
import EditCoupon from "../pages/Admin/EcommerceSetting/Coupon/EditCoupon";

import ShippingConfiguration from "../pages/Admin/EcommerceSetting/ShippingConfiguration/ShippingConfiguration";

//-----------General Setting
import AdminProfile from "../pages/Admin/GeneralSetting/AdminProfile/AdminProfile";
import BusinessInfo from "../pages/Admin/GeneralSetting/BusinessInfo/BusinessInfo";

//------------Banners
import Banner from "../pages/Admin/EcommerceSetting/Banner/Banner";
import AddBanner from "../pages/Admin/EcommerceSetting/Banner/AddBanner";
import EditBanner from "../pages/Admin/EcommerceSetting/Banner/EditBanner";

import TopCampaignBanner from "../pages/Admin/EcommerceSetting/TopCampaignBanner/TopCampaignBanner";

//--------------Front-End
import About from "../pages/Admin/FrontEnd/About/About";
import Contact from "../pages/Admin/FrontEnd/Contact/Contact";
import Logo from "../pages/Admin/FrontEnd/Logo/Logo";
import Favicon from "../pages/Admin/FrontEnd/Favicon/Favicon";
import EditAdministrator from "../pages/Admin/Administrator/EditAdmin";

//--------------Flash Deal
import FlashDealList from "../pages/Admin/FlashDeal/FlashDealList";
import AddFlashDeal from "../pages/Admin/FlashDeal/AddFlashDeal";
import EditFlashDeal from "../pages/Admin/FlashDeal/EditFlashDeal";

//--------------SEO
import SEOSetting from "../pages/Admin/SEOSetting/SEOSetting";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

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
        path: "/shops",
        element: <Shop />,
      },
      {
        path: "/shops/:category",
        element: <Shop />,
      },
      {
        path: "/shops/:category/:subCategory",
        element: <Shop />,
      },
      {
        path: "/shops/:category/:subCategory/:subSubCategory",
        element: <Shop />,
      },
      {
        path: "/shops/brand/:brand",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },

      {
        path: "/payment-result/:transactionId",
        element: (
          <PrivateRoute>
            <PaymentResult />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/order/success",
    element: <OrderSuccess />,
  },
  {
    path: "/account",
    element: (
      <PrivateRoute>
        <AccountLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/account/profile",
        element: <Profile />,
      },
      {
        path: "/account/profile/edite",
        element: <EditePeofile />,
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
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
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
        path: "/admin/ecommerce-setting/banner",
        element: <Banner />,
      },
      {
        path: "/admin/ecommerce-setting/add-banner",
        element: <AddBanner />,
      },
      {
        path: "/admin/ecommerce-setting/edit-banner/:id",
        element: <EditBanner />,
      },

      //---------Top Campaign Banner
      {
        path: "/admin/ecommerce-setting/top-campaign-banner",
        element: <TopCampaignBanner />,
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

      //----------SEO Setting
      {
        path: "/admin/seo-setting",
        element: <SEOSetting />,
      },
    ],
  },
]);
