import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function WebsiteLayout() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/web-css/WebStyle.css";
    link.id = "website-css";

    document.head.appendChild(link);

    return () => {
      document.getElementById("website-css")?.remove();
    };
  }, []);

  return <Outlet />;
}

export default WebsiteLayout;