import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconBrandX, IconChevronDown, IconLogin2, IconMenu2, IconPhone, IconTruckDelivery, IconUserScan, IconX, IconLogout2, IconUserCircle } from '@tabler/icons-react';
import logo from '../web-images/logo.svg';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ApiLayout from '../api/apiLayout';

const Header = () => {
    const navigate = useNavigate();
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    // Get filter options from Redux state
    const { makers = [], bodyTypes = [], loading: loadingStock } = useSelector((state) => state.filters || {});

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

    const handleLogout = () => {
        axios.post(ApiLayout.logout, {
            username: localStorage.getItem("userName"),
            role: localStorage.getItem("role"),
        }).catch((err) => console.error("Logout API failed:", err));

        localStorage.clear();
        setUser(null);
        navigate("/");
    };

    // Helper functions to safely extract brand and body type names from dynamic payloads
    const getMakerName = (item) => {
        if (typeof item === 'string') return item;
        if (!item || typeof item !== 'object') return '';
        return item.maker_Name || item.makerName || item.maker || item.name || item.title || '';
    };

    const getBodyTypeName = (item) => {
        if (typeof item === 'string') return item;
        if (!item || typeof item !== 'object') return '';
        return item.bodyType || item.bodyTypeName || item.body_type || item.name || item.title || '';
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
                                                <Link className="d-flex align-items-center gap-1 ">
                                                    <IconUserCircle /> {user.fullName || user.userName}
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="#" onClick={handleLogout}>
                                                    <IconLogout2 /> Logout
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
                                <NavLink to="/" className="logo"><img src={logo} alt="Bizupon Logo" className="img-fluid" /></NavLink>
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
                                                <NavLink to="/product-list" className={({ isActive }) => isActive ? "active" : ""}>
                                                    Stock List<span className="ms-1 float-end"><IconChevronDown /></span>
                                                </NavLink>
                                                
                                                {/* Aligned Submenu Dropdown */}
                                                <ul className="submenu-double-line d-flex flex-row flex-nowrap gap-3 p-3" 
                                                    style={{ minWidth: '420px', listStyle: 'none', margin: 0 }}>
                                                    
                                                    {/* Brands Column */}
                                                    <li className="flex-fill" style={{ width: '50%', listStyle: 'none', padding: 0 }}>
                                                        <h5 className="mb-2 pb-1 border-bottom" style={{ fontSize: '15px', fontWeight: 'bold' }}>Brands</h5>
                                                        <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '6px' }}>
                                                            {loadingStock ? (
                                                                <span>Loading...</span>
                                                            ) : (
                                                                Array.isArray(makers) && makers.map((item, idx) => {
                                                                    const brandName = getMakerName(item);
                                                                    if (!brandName) return null;
                                                                    return (
                                                                        <NavLink key={idx} to={`/product-list?makers=${encodeURIComponent(brandName)}`} className="d-block py-1 text-decoration-none">
                                                                            {brandName}
                                                                        </NavLink>
                                                                    );
                                                                })
                                                            )}
                                                        </div>
                                                    </li>

                                                    {/* Vertical Separator Line */}
                                                    <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0px' }}></div>

                                                    {/* Body Type Column */}
                                                    <li className="flex-fill" style={{ width: '50%', listStyle: 'none', padding: 0 }}>
                                                        <h5 className="mb-1 pb-1 border-bottom" style={{ fontSize: '15px', fontWeight: 'bold' }}>Body Type</h5>
                                                        <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '6px' }}>
                                                            {loadingStock ? (
                                                                <span>Loading...</span>
                                                            ) : (
                                                                Array.isArray(bodyTypes) && bodyTypes.map((item, idx) => {
                                                                    const bodyName = getBodyTypeName(item);
                                                                    if (!bodyName) return null;
                                                                    return (
                                                                        <NavLink key={idx} to={`/product-list?body=${encodeURIComponent(bodyName)}`} className="d-block py-1 text-decoration-none">
                                                                            {bodyName}
                                                                        </NavLink>
                                                                    );
                                                                })
                                                            )}
                                                        </div>
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
                                                <NavLink to="/Services" className={({ isActive }) => isActive ? "active" : ""}>Services</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/blogs" className={({ isActive }) => isActive ? "active" : ""}>Blogs</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/videos" className={({ isActive }) => isActive ? "active" : ""}>Video</NavLink>
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

            {/* Mobile Nav */}
            <div className={`offcanvas_menu position-fixed ${isMenuOpen ? "active" : ""}`}>
                <div className="mobile-menu d-md-block d-lg-block d-xl-none">
                    <button className="offcanvas-close" onClick={() => setIsMenuOpen(false)}><IconX /></button>
                    <NavLink to="#" className="d-inline-block mb-2"><img src={logo} alt="logo" /></NavLink>
                    <nav className="mobile-menu-wrapper mt-2">
                        <ul>
                            <li>
                                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about-us" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
                            </li>
                            <li className="has-submenu">
                                <NavLink to="/product-list" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Stock List<span className="ms-1 fs-xs float-end"><IconChevronDown /></span></NavLink>
                                <ul className="submenu-double-line d-flex flex-row p-2 gap-2" style={{ listStyle: 'none' }}>
                                    <li style={{ width: '50%', padding: 0 }}>
                                        <h5 className="mb-2 border-bottom pb-1">Brands</h5>
                                        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                            {Array.isArray(makers) && makers.map((item, idx) => {
                                                const brandName = getMakerName(item);
                                                if (!brandName) return null;
                                                return (
                                                    <NavLink key={idx} to={`/product-list?makers=${encodeURIComponent(brandName)}`} onClick={() => setIsMenuOpen(false)} className="d-block py-1">
                                                        {brandName}
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    </li>
                                    <li style={{ width: '50%', padding: 0 }}>
                                        <h5 className="mb-2 border-bottom pb-1">Body Type</h5>
                                        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                            {Array.isArray(bodyTypes) && bodyTypes.map((item, idx) => {
                                                const bodyName = getBodyTypeName(item);
                                                if (!bodyName) return null;
                                                return (
                                                    <NavLink key={idx} to={`/product-list?body=${encodeURIComponent(bodyName)}`} onClick={() => setIsMenuOpen(false)} className="d-block py-1">
                                                        {bodyName}
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
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
                            <li>
                                <NavLink to="/Services" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blogs" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Blogs</NavLink>
                            </li>
                            <li>
                                <NavLink to="/videos" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Video</NavLink>
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
    );
};

export default Header;