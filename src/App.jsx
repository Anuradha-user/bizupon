import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "./layouts/WebsiteLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/website/Home";
import Auth from "./pages/admin/Auth";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CarFilterForm from "./web-components/CarFilterForm";
import ProductListPage from "./pages/website/ProductListPage";

function App() {
  return (
    <Routes>

      {/* WEBSITE */}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<CarFilterForm />} />
        <Route path="/ProductList" element={<ProductListPage />} />
      </Route>

      {/* ADMIN AUTH */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* DIRECT LOGIN */}
      <Route path="/login" element={<AdminLayout />}>
        <Route index element={<Login />} />
      </Route>

    </Routes>
  );
}

export default App;