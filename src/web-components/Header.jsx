import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconBrandX, IconChevronDown, IconLogin2, IconMenu2, IconPhone, IconTruckDelivery, IconUserScan, IconX, IconLogout2, IconUserCircle } from '@tabler/icons-react'
import logo from '../web-images/logo.svg';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import ApiLayout from '../api/Apilayout';

const Header = () => {

  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUser({
        userName,
        fullName: localStorage.getItem("fullName"),
      });
    }
  }, []);

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

  const handleLogout = async () => {
    try {
      await axios.post(ApiLayout.logout, {
        username: localStorage.getItem("userName"),
        role: localStorage.getItem("role"),
        
      });
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const handleLogoutClick = () => {
    if (confirmLogout) {
      setConfirmLogout(true);
      setTimeout(() => setConfirmLogout(false), 3000);
      return;
    }
    handleLogout();
  };

  return (
    <>
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

                                {user ? (
                                  <>
                                    <li className="nav-item">
                                        <span className="d-flex align-items-center gap-1">
                                            <IconUserCircle /> {user.fullName || user.userName}
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#" onClick={handleLogoutClick}>
                                            <IconLogout2 /> {confirmLogout ? "Click again to confirm" : "Logout"}
                                        </Link>
                                    </li>
                                  </>
                                ) : (
                                  <>
                                    <li className="nav-item">
                                        <Link to="/register"><IconUserScan /> Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/auth"><IconLogin2 /> Login</Link>
                                    </li>
                                  </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="main-navbar">
                    <div className="row align-items-center">
                        <div className="col-xxl-2 col-xl-3 col-md-3 col-7">
                            <NavLink  to="/" className="logo"><img src={logo} alt="Bizupon Logo" className="img-fluid" /></NavLink>
                        </div>
                        <div className="col-xxl-10 col-xl-9 col-md-9 col-5">
                            <div className="main-navbar-right d-flex align-items-center justify-content-end position-relative">
                                <nav className="main-navmenu ms-3 d-none d-xl-block">
                                    <ul className="d-flex align-itmes-center justify-content-end">
                                        <li>
                                            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/about-us" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
                                        </li>
                                        <li className="has-submenu">
                                            <NavLink to="/product-list" className={({ isActive }) => isActive ? "active" : ""}>Stock List<span className="ms-1 float-end"><IconChevronDown /></span></NavLink>
                                            <ul className="submenu-double-line">
                                                <li>
                                                    <h5>Brands</h5>
                                                    <NavLink to="/product-list?makers=Toyota">Toyota</NavLink>
                                                    <NavLink to="/product-list?makers=Nissan">Nissan</NavLink>
                                                    <NavLink to="/product-list?makers=Honda">Honda</NavLink>
                                                    <NavLink to="/product-list?makers=Suzuki">Suzuki</NavLink>
                                                    <NavLink to="/product-list?makers=Subaru">Subaru</NavLink>
                                                    <NavLink to="/product-list?makers=Mitsubishi">Mitsubishi</NavLink>
                                                    <NavLink to="/product-list?makers=Volkswagen">Volkswagen</NavLink>
                                                    <NavLink to="/product-list?makers=Audi">Audi</NavLink>
                                                    <NavLink to="/product-list?makers=Mercedes">Mercedes</NavLink>
                                                    <NavLink to="/product-list?makers=Land Rover">Land Rover</NavLink>
                                                    <NavLink to="/product-list?makers=Ford">Ford</NavLink>
                                                </li>
                                                <li>
                                                    <h5>Body Type</h5>
                                                    <NavLink to="/product-list?body=Sedan">Sedan</NavLink>
                                                    <NavLink to="/product-list?body=Coupe">Coupe</NavLink>
                                                    <NavLink to="/product-list?body=Hatchback">Hatchback</NavLink>
                                                    <NavLink to="/product-list?body=Station Wagon">Station Wagon</NavLink>
                                                    <NavLink to="/product-list?body=SUV">SUV</NavLink>
                                                    <NavLink to="/product-list?body=Pick Up">Pick Up</NavLink>
                                                    <NavLink to="/product-list?body=Van">Van</NavLink>
                                                    <NavLink to="/product-list?body=Wagon">Wagon</NavLink>
                                                    <NavLink to="/product-list?body=Convertible">Convertible</NavLink>
                                                    <NavLink to="/product-list?body=Bus">Bus</NavLink>
                                                    <NavLink to="/product-list?body=Truck">Truck</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="has-submenu">
                                            <NavLink to="javascript:void(0)" className={({ isActive }) => isActive ? "active" : ""}>How to Buy<span className="ms-1 float-end"><IconChevronDown /></span></NavLink>
                                            <ul>
                                                <li><NavLink to="">Bizupon Auction</NavLink></li>
                                                <li><NavLink to="">Auction Houses</NavLink></li>
                                                <li><NavLink to="">Auction Schedule</NavLink></li>
                                                <li><NavLink to="">Auction Guide</NavLink></li>
                                                <li><NavLink to="">Auction Service</NavLink></li>
                                            </ul>
                                        </li>
                                        <li className="has-submenu">
                                            <NavLink to="javascript:void(0)" className={({ isActive }) => isActive ? "active" : ""}>Auction<span className="ms-1 float-end"><IconChevronDown /></span></NavLink>
                                            <ul>
                                                <li><NavLink to="">By Stock</NavLink></li>
                                                <li><NavLink to="">By Auction</NavLink></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <NavLink to="javascript:void(0)" className={({ isActive }) => isActive ? "active" : ""}>Services</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/blogs" className={({ isActive }) => isActive ? "active" : ""}>Blogs</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="javascript:void(0)" className={({ isActive }) => isActive ? "active" : ""}>Video</NavLink>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="main-header-contact ms-7 position-relative d-none d-lg-flex d-xl-none d-xxl-flex">
                                    <NavLink to="tel:+818021898080" className="d-flex align-items-center">
                                        <span className="icon d-inline-flex rounded-circle justify-content-center align-items-center bg-secondary-light">
                                            <IconPhone />
                                        </span>
                                        <div className="ms-3">
                                            <p className="text-muted">Phone</p>
                                            <h6 className="mb-0 mt-1">+81 80-2189-8080</h6>
                                        </div>
                                    </NavLink>
                                </div>
                                <button className="menu-offcanvas-btn offcanvas-toggle d-none" onClick={() => setIsMenuOpen(true)}>
                                    <IconMenu2 />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className={`offcanvas_menu position-fixed ${isMenuOpen ? "active" : ""}`}>
            <div className="mobile-menu d-md-block d-lg-block d-xl-none">
                <button className="offcanvas-close" onClick={() => setIsMenuOpen(false)}><IconX /></button>
                <NavLink to="#" className="d-inline-block mb-2"><img src={logo} alt="logo" /></NavLink>
                <nav className="mobile-menu-wrapper mt-2">
                    <ul>
                        <li className="">
                            <NavLink to="javascript:void(0)" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                        </li>
                        <li className="">
                            <NavLink to="javascript:void(0)" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
                        </li>
                        <li className="has-submenu">
                            <NavLink to="/product-list" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Stock List<span className="ms-1 fs-xs float-end"><IconChevronDown /></span></NavLink>
                            <ul className="submenu-double-line">
                                <li>
                                    <h5>Brands</h5>
                                    <NavLink to="">Toyota</NavLink>
                                    <NavLink to="">Nissan</NavLink>
                                    <NavLink to="">Honda</NavLink>
                                    <NavLink to="">Suzuki</NavLink>
                                    <NavLink to="">Subaru</NavLink>
                                    <NavLink to="">Mitsubishi</NavLink>
                                    <NavLink to="">Volkswagen</NavLink>
                                    <NavLink to="">Audi</NavLink>
                                    <NavLink to="">Mercedes</NavLink>
                                    <NavLink to="">Land Rover</NavLink>
                                    <NavLink to="">Ford</NavLink>
                                </li>
                                <li>
                                    <h5>Body Type</h5>
                                    <NavLink to="">Sedan</NavLink>
                                    <NavLink to="">Coupe</NavLink>
                                    <NavLink to="">Hatchback</NavLink>
                                    <NavLink to="">Station Wagon</NavLink>
                                    <NavLink to="">SUV</NavLink>
                                    <NavLink to="">Pick Up</NavLink>
                                    <NavLink to="">Van</NavLink>
                                    <NavLink to="">Wagon</NavLink>
                                    <NavLink to="">Convertible</NavLink>
                                    <NavLink to="">Bus</NavLink>
                                    <NavLink to="">Truck</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="has-submenu">
                            <NavLink to="" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>How to Buy<span className="ms-1 fs-xs float-end"><IconChevronDown /></span></NavLink>
                            <ul>
                                <li><NavLink to="">Bizupon Auction</NavLink></li>
                                <li><NavLink to="">Auction Houses</NavLink></li>
                                <li><NavLink to="">Auction Schedule</NavLink></li>
                                <li><NavLink to="">Auction Guide</NavLink></li>
                                <li><NavLink to="">Auction Service</NavLink></li>
                            </ul>
                        </li>
                        <li className="has-submenu">
                            <NavLink to="" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Auction<span className="ms-1 fs-xs float-end"><IconChevronDown /></span></NavLink>
                            <ul>
                                <li><NavLink to="">By Stock</NavLink></li>
                                <li><NavLink to="">By Auction</NavLink></li>
                            </ul>
                        </li>
                        <li className="">
                            <NavLink to="" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Services</NavLink>
                        </li>
                        <li className="">
                            <NavLink to="/blogs" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Blogs</NavLink>
                        </li>
                        <li className="">
                            <NavLink to="" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Video</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="contact-info mt-8">
                    <h5 className="mb-20">Contact Info</h5>
                    <address>
                        8-36-A202, Chigasaki Chuo , Tsuzuki-ku, Yokohama-city, Kanagawa-ken <br />
                        <Link to="tel:+818021898080">+81 80218-98080</Link> <br />
                        <Link to="mailto:admin@bizupon.com">admin@bizupon.com</Link>
                    </address>
                    <div className="social-contact">
                        <Link to="#"><IconBrandFacebook /></Link>
                        <Link to="#"><IconBrandX /></Link>
                        <Link to="#"><IconBrandInstagram /></Link>
                        <Link to="#"><IconBrandWhatsapp /></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header