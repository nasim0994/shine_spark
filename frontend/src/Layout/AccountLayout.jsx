import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import AccountSidebar from "../components/AccountSidebar/AccountSidebar";
import MobileBottomHeader from "../components/Header/MobileBottomHeader/MobileBottomHeader";

export default function AccountLayout() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  let pathnameArray = location.pathname.split("/");
  pathnameArray.shift();

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".account_sidebar") &&
          !e.target.closest(".account_Sidebar_btn")) ||
        e.target.closest(".account_sidebar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);

  useEffect(() => {
    if (location?.pathname === "/account") {
      navigate("/account/profile");
    }
  }, [location?.pathname, navigate]);

  return (
    <>
      <Header />
      <section className="container min-h-[60vh] py-2">
        <div className="items-start gap-5 lg:flex">
          <aside
            className={`account_sidebar ${sidebar && "account_sidebar_show"}`}
          >
            <AccountSidebar />
          </aside>

          <>
            <main className="account_content">
              <Outlet />
            </main>
          </>
        </div>
      </section>
      <Footer />

      <MobileBottomHeader setSidebar={setSidebar} />
    </>
  );
}
