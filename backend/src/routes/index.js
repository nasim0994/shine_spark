const express = require("express");
const router = express.Router();

//------------------------------------------------------------------------------
// import Routes
//------------------------------------------------------------------------------
const category = require("./categoriesRoutes");
const subCategory = require("./subCategoriesRoutes");
const subSubCategory = require("./subSubCategoriesRoutes");
const brand = require("./product/brandRoutes");
const color = require("./product/colorRoutes");

const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const logoRouter = require("./logoRoutes");
const faviconRouter = require("./faviconRoutes");
const contactRouter = require("./contactRoutes");
const bannerRouter = require("./bannerRoutes");
const topCampaignBannerRouter = require("./TopCampaignBannerRoutes");
const campaignBanner = require("./campaignBannerRoutes");

const aboutRouter = require("./aboutRoutes");

const productRouter = require("./productRoutes");
const flashDealRouter = require("./flashDealRoutes");
const reviewRouter = require("./reveiwRoutes");

const couponRouter = require("./couponRoutes");
const seoRouter = require("./seoRoutes");
const shippingConfigRouter = require("./shippingConfigRoutes");

// General
const businessInfoRoutes = require("./businessInfoRoutes");

const orderRouter = require("./orderRoutes");
const paymentRouter = require("./paymentRoute");

const privacy = require("./privacyRoute");
const termcondition = require("./termconditionRoute");
const returnPolicy = require("./returnPolicyRoute");
const faq = require("./faqRoutes");

const topHeader = require("./topHeaderRoutes");

//------------------------------------------------------------------------------
// use Routes
//------------------------------------------------------------------------------

router.use("/category", category);
router.use("/subCategory", subCategory);
router.use("/subSubCategory", subSubCategory);

router.use("/brand", brand);
router.use("/color", color);

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/logo", logoRouter);
router.use("/favicon", faviconRouter);
router.use("/contact", contactRouter);
router.use("/banner", bannerRouter);
router.use("/about", aboutRouter);

router.use("/product", productRouter);
router.use("/flash-deal", flashDealRouter);
router.use("/review", reviewRouter);
router.use("/topCampaignBanner", topCampaignBannerRouter);
router.use("/campaignBanner", campaignBanner);

router.use("/coupon", couponRouter);
router.use("/seo", seoRouter);
router.use("/shippingConfig", shippingConfigRouter);

router.use("/privacy", privacy);
router.use("/terms-condition", termcondition);
router.use("/return-policy", returnPolicy);

//------General
router.use("/businessInfo", businessInfoRoutes);

router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/faq", faq);
router.use("/topHeader", topHeader);

module.exports = router;
