import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SocialButtons from "../components/SocialButtons/SocialButtons";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
        <div className="fixed bottom-1/3 right-0 z-50">
          <SocialButtons />
        </div>
      </div>
      <Footer />
    </>
  );
}
