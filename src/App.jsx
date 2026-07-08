import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "./layouts/WebsiteLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/website/Home";
import Auth from "./pages/admin/Auth";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CarFilterForm from "./web-components/CarFilterForm";
import ProductListPage from "./pages/website/ProductListPage";
import ProductDetails from "./pages/website/ProductDetails";
import AboutUs from "./pages/website/AboutUs";
import ChangePassword from "./pages/admin/ChangePassword";
import AddPortImages from "./pages/admin/AddPortImages";
import ForgotPassword from "./pages/admin/master/ForgotPassword";
import Blogs from "./pages/website/Blogs";
import BlogDetails from "./pages/website/BlogDetails";
import Region from "./pages/admin/master/Region";
import Categories from "./pages/admin/master/Categories";
import Location from "./pages/admin/master/Location";
import Fuzokuhin from "./pages/admin/master/Fuzokuhin";
import ShipMaster from "./pages/admin/master/ShipMaster";
import SubCategory from "./pages/admin/master/SubCategory";
import Maker from "./pages/admin/master/Maker";
import BodyType from "./pages/admin/master/BodyType";
import Transport from "./pages/admin/master/Transport";
import Shipping from "./pages/admin/master/Shipping";
import Auction from "./pages/admin/master/Auction";
import AuctionYard from "./pages/admin/master/AuctionYard";
import Port from "./pages/admin/master/Port";
import PortPrice from "./pages/admin/master/PortPrice";
import TransportAndShipping from "./pages/admin/master/TransportAndShipping";
import TransportPrice from "./pages/admin/master/TransportPrice";
import BulkFobPrice from "./pages/admin/master/BulkFobPrice";
import FobPrice from "./pages/admin/master/FobPrice";
import Country from "./pages/admin/master/Country";
import AssignCity from "./pages/admin/master/AssignCity";
import ShippingPrice from "./pages/admin/master/ShippingPrice";
import AssignTransport from "./pages/admin/master/AssignTransport";
import UpdateLogistics from "./pages/admin/master/UpdateLogistics";
import AdditinalInfo from "./pages/admin/master/AdditionalInfo";
import Bills from "./pages/admin/master/Bills";
import ConsigneeMaster from "./pages/admin/master/ConsigneeMaster";
import DepartmentMaster from "./pages/admin/master/DepartmentMaster";
import FacilityMaster from "./pages/admin/master/FacilityMaster";
import UpdateCurrencyRate from "./pages/admin/master/UpdateCurrencyRate";
import Video from "./pages/admin/master/Video";
import AuctionBuyingType from "./pages/admin/master/AuctionBuyingType";
import SbktsPayment from "./pages/admin/master/SbktsPayment";
import CurrencyMaster from "./pages/admin/master/CurrencyMaster";
import AssignGroup from "./pages/admin/master/AssignGroup";
import MakeBroadcast from "./pages/admin/master/MakeBroadcast";
import BroadcastMaster from "./pages/admin/master/BroadcastMaster";
import TerminalMaster from "./pages/admin/master/TerminalMaster";
import MakeSbktsInvoice from "./pages/admin/master/MakeSbktsInvoice";
import AssignSbktsCompany from "./pages/admin/master/AssignSbktsCompany";
import UpdatePRR from "./pages/admin/master/UpdatePRR";
import AssignBankBrokerPRR from "./pages/admin/master/AssignBankBrokerPRR";
import CompanyMaster from "./pages/admin/master/CompanyMaster";
import ReceiveFuzokuhin from "./pages/admin/master/ReceiveFuzokuhin";
import JapanTerminal from "./pages/admin/master/JapanTerminal";
import AssignTerminal from "./pages/admin/master/AssignTerminal";
import UpdateAnotherStatus from "./pages/admin/product-master/UpdateAnotherStatus";
import UpdateShippingDetails from "./pages/admin/product-master/UpdateShippingDetails";
import UpdateInner from "./pages/admin/product-master/UpdateInner";
import UpdateProductDate from "./pages/admin/product-master/UpdateProductDate";
import UpdateRemark from "./pages/admin/product-master/UpdateRemark";
import UpdateConsignee from "./pages/admin/product-master/UpdateConsignee";
import UpdateBroker from "./pages/admin/product-master/UpdateBroker";
import UpdateBlNumber from "./pages/admin/product-master/UpdateBlNumber";
import AddVariant from "./pages/admin/product-master/AddVariant";
import ViewVariant from "./pages/admin/product-master/ViewVariant";
import UpdateVariant from "./pages/admin/product-master/UpdateVariant";
import AddPurchase from "./pages/admin/product-master/AddPurchase";
import ViewPurchase from "./pages/admin/product-master/ViewPurchase";
import UpdateFuzokuhin from "./pages/admin/product-master/UpdateFuzokuhin";
import DeletedProduct from "./pages/admin/product-master/DeletedProduct";
import UpdateLoadingSurrender from "./pages/admin/product-master/UpdateLoadingSurrender";

function App() {
  return (
    <Routes>

      {/* WEBSITE */}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/filter" element={<CarFilterForm />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/product-list/:id" element={<ProductDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Route>

      {/* AUTH (NO HEADER FOOTER) */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-port-images" element={<AddPortImages />} />
        <Route path="master/region" element={<Region />} />
        <Route path="master/categories" element={<Categories />} />
        <Route path="master/location" element={<Location />} />
        <Route path="master/fuzokuhin" element={<Fuzokuhin />} />
        <Route path="master/ShipMaster" element={<ShipMaster />} />
        <Route path="master/sub-categories" element={<SubCategory />} />
        <Route path="master/maker" element={<Maker />} />
        <Route path="master/body-type" element={<BodyType />} />
        <Route path="master/transport" element={<Transport />} />
        <Route path="master/shipping" element={<Shipping />} />
        <Route path="master/auction" element={<Auction />} />
        <Route path="master/auction-yard" element={<AuctionYard />} />
        <Route path="master/port" element={<Port />} />
        <Route path="master/port-price" element={<PortPrice />} />
        <Route path="master/transport-and-shipping" element={<TransportAndShipping />} />
        <Route path="master/transport-price" element={<TransportPrice />} />
        <Route path="master/bulk-fob-price" element={<BulkFobPrice />} />
        <Route path="master/fob-price" element={<FobPrice />} />
        <Route path="master/country" element={<Country />} />
        <Route path="master/assign-city" element={<AssignCity />} />
        <Route path="master/shipping-price" element={<ShippingPrice />} />
        <Route path="master/assign-transport" element={<AssignTransport />} />
        <Route path="master/update-logistics" element={<UpdateLogistics />} />
        <Route path="master/additional-info" element={<AdditinalInfo />} />
        <Route path="master/view-bills" element={<Bills />} />
        <Route path="master/consignee-master" element={<ConsigneeMaster />} />
        <Route path="master/department-master" element={<DepartmentMaster />} />
        <Route path="master/facility-master" element={<FacilityMaster />} />
        <Route path="master/update-currency-rate" element={<UpdateCurrencyRate />} />
        <Route path="master/video" element={<Video />} />
        <Route path="master/auction-buying-type" element={<AuctionBuyingType />} />
        <Route path="master/sbkts-payment" element={<SbktsPayment />} />
        <Route path="master/currency-master" element={<CurrencyMaster />} />
        <Route path="master/assign-group" element={<AssignGroup />} />
        <Route path="master/make-broadcast" element={<MakeBroadcast />} />
        <Route path="master/broadcast-master" element={<BroadcastMaster />} />
        <Route path="master/terminal-master" element={<TerminalMaster />} />
        <Route path="master/make-sbkts-invoice" element={<MakeSbktsInvoice />} />
        <Route path="master/assign-sbkts-company" element={<AssignSbktsCompany />} />
        <Route path="master/update-prr" element={<UpdatePRR />} />
        <Route path="master/assign-bank-broker-for-prr" element={<AssignBankBrokerPRR />} />
        <Route path="master/company-master" element={<CompanyMaster />} />
        <Route path="master/receive-fuzokuhin" element={<ReceiveFuzokuhin />} />
        <Route path="master/japan-terminal" element={<JapanTerminal />} />
        <Route path="master/assign-terminal" element={<AssignTerminal />} />
        <Route path="product-master/update-another-status" element={<UpdateAnotherStatus />} />
        <Route path="product-master/update-shipping-details" element={<UpdateShippingDetails />} />
        <Route path="product-master/update-inner" element={<UpdateInner />} />
        <Route path="product-master/update-product-date" element={<UpdateProductDate />} />
        <Route path="product-master/update-remark" element={<UpdateRemark />} />
        <Route path="product-master/update-consignee" element={<UpdateConsignee />} />
        <Route path="product-master/update-broker" element={<UpdateBroker />} />
        <Route path="product-master/update-bl-number" element={<UpdateBlNumber />} />
        <Route path="product-master/add-variant" element={<AddVariant />} />
        <Route path="product-master/view-variant" element={<ViewVariant />} />
        <Route path="product-master/update-variant" element={<UpdateVariant />} />
        <Route path="product-master/add-purchase" element={<AddPurchase />} />
        <Route path="product-master/view-purchase" element={<ViewPurchase />} />
        <Route path="product-master/update-fuzokuhin" element={<UpdateFuzokuhin />} />
        <Route path="product-master/deleted-product" element={<DeletedProduct />} />
        <Route path="product-master/update-loading-surrender" element={<UpdateLoadingSurrender />} />
      </Route>

      {/* OTHER */}
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
    </Routes>
  );
}

export default App;