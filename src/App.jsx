import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "./layouts/WebsiteLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/website/Home";
import Auth from "./pages/admin/Auth";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Routes>

      {/* WEBSITE */}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* ADMIN AUTH ONLY */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Auth />} />
      </Route>

      {/* DIRECT LOGIN URL */}
      <Route path="/login" element={<AdminLayout />}>
        <Route index element={<Login />} />
      </Route>

      {/* COMMON DASHBOARD */}
      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  );
} 

export default App;