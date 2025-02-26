// import "./Admin.css";
import "@/assets/css/admin.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// import AdminSidebar from "@/components/AdminComponents/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/AdminComponents/AdminHeader/AdminHeader";
import Sidebar from "@/components/AdminComponents/Sidebar/Sidebar";

export default function AdminLayout() {
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".admin_sidebar") &&
          !e.target.closest(".admin_sidebar_btn")) ||
        e.target.closest(".admin_sidebar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);

  return (
    <section className="flex">
      <aside
        className={`admin_sidebar bg-base-100 ${
          sidebar && "admin_sidebar_show"
        }`}
      >
        <Sidebar />
      </aside>
      <div className="admin_content">
        <AdminHeader setSidebar={setSidebar} />
        <main className="py-3 sm:p-3">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
