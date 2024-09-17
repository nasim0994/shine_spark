import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MobileBottomHeader from "../components/Header/MobileBottomHeader/MobileBottomHeader";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileBottomHeader />
    </>
  );
}
