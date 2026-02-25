import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconBrandX, IconChevronDown, IconLogin2, IconMenu2, IconPhone, IconTruckDelivery, IconUserScan } from '@tabler/icons-react'
import logo from '../web-images/logo.svg';
import React from 'react'

const Header = () => {
  return (
        <header className="header position-relative header-sticky z-3">
            <div className="head-topbar bg-primary d-lg-block">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="topbar-info d-none d-lg-block">
                                <ul className="social-list">
                                    <li><a href="#"><IconBrandFacebook /></a></li>
                                    <li><a href="#"><IconBrandX /></a></li>
                                    <li><a href="#"><IconBrandInstagram /></a></li>
                                    <li><a href="#"><IconBrandWhatsapp /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <ul className="d-flex align-items-center justify-content-end topbar-info-right">
                                <li className="nav-item">
                                    <a href="#"><IconTruckDelivery /> Logistics</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/user-login"><IconUserScan /> Register</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/user-login"><IconLogin2 /> Login</a>
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
                            <a href="index.html" className="logo"><img src={logo} alt="Bizupon Logo" className="img-fluid" /></a>
                        </div>
                        <div className="col-xxl-10 col-xl-9 col-md-9 col-5">
                            <div className="main-navbar-right d-flex align-items-center justify-content-end position-relative">
                                <nav className="main-navmenu ms-3 d-none d-xl-block">
                                    <ul className="d-flex align-itmes-center justify-content-end">
                                        <li className="">
                                            <a href="javascript:void(0)">Home</a>
                                        </li>
                                        <li className="">
                                            <a href="about-us.html">About Us</a>
                                        </li>
                                        <li className="has-submenu">
                                            <a href="javascript:void(0)">Stock List<span className="ms-1 fs-xs float-end"><IconChevronDown /></span></a>
                                            <ul className="submenu-double-line">
                                                <li>
                                                    <h5>Brands</h5>
                                                    <a href="">Toyota</a>
                                                    <a href="">Nissan</a>
                                                    <a href="">Honda</a>
                                                    <a href="">Suzuki</a>
                                                    <a href="">Subaru</a>
                                                    <a href="">Mitsubishi</a>
                                                    <a href="">Volkswagen</a>
                                                    <a href="">Audi</a>
                                                    <a href="">Mercedes</a>
                                                    <a href="">Land Rover</a>
                                                    <a href="">Ford</a>
                                                </li>
                                                <li>
                                                    <h5>Body Type</h5>
                                                    <a href="">Sedan</a>
                                                    <a href="">Coupe</a>
                                                    <a href="">Hatchback</a>
                                                    <a href="">Station Wagon</a>
                                                    <a href="">SUV</a>
                                                    <a href="">Pick Up</a>
                                                    <a href="">Van</a>
                                                    <a href="">Wagon</a>
                                                    <a href="">Convertible</a>
                                                    <a href="">Bus</a>
                                                    <a href="">Truck</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="has-submenu">
                                            <a href="javascript:void(0)">How to Buy<span className="ms-1 fs-xs float-end"><IconChevronDown /></span></a>
                                            <ul>
                                                <li><a href="">Bizupon Auction</a></li>
                                                <li><a href="">Auction Houses</a></li>
                                                <li><a href="">Auction Schedule</a></li>
                                                <li><a href="">Auction Guide</a></li>
                                                <li><a href="">Auction Service</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-submenu">
                                            <a href="javascript:void(0)">Auction<span className="ms-1 fs-xs float-end"><IconChevronDown /></span></a>
                                            <ul>
                                                <li><a href="">By Stock</a></li>
                                                <li><a href="">By Auction</a></li>
                                            </ul>
                                        </li>
                                        <li className="">
                                            <a href="javascript:void(0)">Services</a>
                                        </li>
                                        <li className="">
                                            <a href="javascript:void(0)">Blog</a>
                                        </li>
                                        <li className="">
                                            <a href="javascript:void(0)">Video</a>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="main-header-contact ms-7 position-relative d-none d-lg-flex d-xl-none d-xxl-flex">
                                    <a href="tel:+818021898080" className="d-flex align-items-center">
                                        <span className="icon d-inline-flex rounded-circle justify-content-center align-items-center bg-secondary-light">
                                            <IconPhone />
                                        </span>
                                        <div className="ms-3">
                                            <p className="text-muted">Phone</p>
                                            <h6 className="mb-0 mt-1">+81 80-2189-8080</h6>
                                        </div>
                                    </a>
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
