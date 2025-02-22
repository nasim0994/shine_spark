import { Outlet } from "react-router-dom";
import Header from "@/components/shared/main/Header/Header";
import Footer from "@/components/shared/main/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
