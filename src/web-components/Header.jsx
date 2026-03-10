import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconBrandX, IconChevronDown, IconLogin2, IconMenu2, IconPhone, IconTruckDelivery, IconUserScan } from '@tabler/icons-react'
import logo from '../web-images/logo.svg';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Header = () => {

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header position-relative z-3 ${isSticky ? "sticky-on" : ""}`}>
      <div className="head-topbar bg-primary d-lg-block">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className="topbar-info d-none d-lg-block">
                            <ul className="social-list">
                                <li><Link to="#"><IconBrandFacebook /></Link></li>
                                <li><Link to="#"><IconBrandX /></Link></li>
                                <li><Link to="#"><IconBrandInstagram /></Link></li>
                                <li><Link to="#"><IconBrandWhatsapp /></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <ul className="d-flex align-items-center justify-content-end topbar-info-right">
                            <li className="nav-item">
                                <Link to="#"><IconTruckDelivery /> Logistics</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin"><IconUserScan /> Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin"><IconLogin2 /> Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="main-navbar">
                <div className="row align-items-center">
                    <div className="col-xxl-2 col-xl-3 col-md-3 col-7">
                        <Link to="/" className="logo"><img src={logo} alt="Bizupon Logo" className="img-fluid" /></Link>
                    </div>
                    <div className="col-xxl-10 col-xl-9 col-md-9 col-5">
                        <div className="main-navbar-right d-flex align-items-center justify-content-end position-relative">
                            <nav className="main-navmenu ms-3 d-none d-xl-block">
                                <ul className="d-flex align-itmes-center justify-content-end">
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/counter">About Us</Link>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="/product-list">Stock List<span className="ms-1 float-end"><IconChevronDown /></span></Link>
                                        <ul className="submenu-double-line">
                                            <li>
                                                <h5>Brands</h5>
                                                <Link to="/product-list?makers=Toyota">Toyota</Link>
                                                <Link to="/product-list?makers=Nissan">Nissan</Link>
                                                <Link to="/product-list?makers=Honda">Honda</Link>
                                                <Link to="/product-list?makers=Suzuki">Suzuki</Link>
                                                <Link to="/product-list?makers=Subaru">Subaru</Link>
                                                <Link to="/product-list?makers=Mitsubishi">Mitsubishi</Link>
                                                <Link to="/product-list?makers=Volkswagen">Volkswagen</Link>
                                                <Link to="/product-list?makers=Audi">Audi</Link>
                                                <Link to="/product-list?makers=Mercedes">Mercedes</Link>
                                                <Link to="/product-list?makers=Land Rover">Land Rover</Link>
                                                <Link to="/product-list?makers=Ford">Ford</Link>
                                            </li>
                                            <li>
                                                <h5>Body Type</h5>
                                                <Link to="/product-list?body=Sedan">Sedan</Link>
                                                <Link to="/product-list?body=Coupe">Coupe</Link>
                                                <Link to="/product-list?body=Hatchback">Hatchback</Link>
                                                <Link to="/product-list?body=Station Wagon">Station Wagon</Link>
                                                <Link to="/product-list?body=SUV">SUV</Link>
                                                <Link to="/product-list?body=Pick Up">Pick Up</Link>
                                                <Link to="/product-list?body=Van">Van</Link>
                                                <Link to="/product-list?body=Wagon">Wagon</Link>
                                                <Link to="/product-list?body=Convertible">Convertible</Link>
                                                <Link to="/product-list?body=Bus">Bus</Link>
                                                <Link to="/product-list?body=Truck">Truck</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="javascript:void(0)">How to Buy<span className="ms-1 float-end"><IconChevronDown /></span></Link>
                                        <ul>
                                            <li><Link to="">Bizupon Auction</Link></li>
                                            <li><Link to="">Auction Houses</Link></li>
                                            <li><Link to="">Auction Schedule</Link></li>
                                            <li><Link to="">Auction Guide</Link></li>
                                            <li><Link to="">Auction Service</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="javascript:void(0)">Auction<span className="ms-1 float-end"><IconChevronDown /></span></Link>
                                        <ul>
                                            <li><Link to="">By Stock</Link></li>
                                            <li><Link to="">By Auction</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0)">Services</Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0)">Blog</Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0)">Video</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="main-header-contact ms-7 position-relative d-none d-lg-flex d-xl-none d-xxl-flex">
                                <Link to="tel:+818021898080" className="d-flex align-items-center">
                                    <span className="icon d-inline-flex rounded-circle justify-content-center align-items-center bg-secondary-light">
                                        <IconPhone />
                                    </span>
                                    <div className="ms-3">
                                        <p className="text-muted">Phone</p>
                                        <h6 className="mb-0 mt-1">+81 80-2189-8080</h6>
                                    </div>
                                </Link>
                            </div>
                            <button className="menu-offcanvas-btn offcanvas-toggle d-none">
                                <IconMenu2 />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
