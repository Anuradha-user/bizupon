import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function AdminLayout() {
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
    <div className="admin-app">
      <Outlet />
    </div>
  );
}

export default AdminLayout;