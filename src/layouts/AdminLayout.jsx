import { Outlet, } from "react-router-dom";
import { useEffect, useState } from "react";

import SidebarMenu from "../admin-components/SidebarMenu";
import HeaderNavbar from "../admin-components/HeaderNavbar";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function AdminLayout() {

  const [sidebarHidden, setSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden(prev => !prev);
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/admin-css/adminStyle.css";
    link.id = "admin-css";

    document.head.appendChild(link);

    return () => {
      document.getElementById("admin-css")?.remove();
    };
  }, []);

  return (
    <>
      {/* ✅ Sidebar */}
      <SidebarMenu sidebarHidden={sidebarHidden} />

      {/* ✅ Main Content */}
      <div className={`content-area ${sidebarHidden ? "content-area-full" : ""}`}>
        
        {/* ✅ Header */}
        <HeaderNavbar onToggleSidebar={toggleSidebar} />

        {/* ✅ Dynamic Page */}
        <div className="content-block">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  );
}

export default AdminLayout;