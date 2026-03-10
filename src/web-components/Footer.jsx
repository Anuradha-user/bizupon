import { IconArrowRightDashed, IconMail, IconPrinter, IconMapPin, IconPhone } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import logo from '../web-images/logo.svg';
import { Link } from "react-router-dom";

function Footer() {

    const [brands, setBrands] = useState([]);

    useEffect(() => {
    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/MakerData")
        .then((res) => res.json())
        .then((data) => setBrands(data))
        .catch((err) => console.log(err));
    }, []);

  return (
    <section className="fooer">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-widget">
                        <h4 className="widget-title">Company</h4>
                        <div className="widget-content">
                            <ul className="user-links">
                                <li><a href="#"><IconArrowRightDashed /> About Us</a></li>
                                <li><a href="#"><IconArrowRightDashed /> How to Buy</a></li>
                                <li><a href="#"><IconArrowRightDashed /> Services</a></li>
                                <li><a href="#"><IconArrowRightDashed /> FAQs</a></li>
                                <li><a href="#"><IconArrowRightDashed /> Blogs</a></li>
                                <li><a href="#"><IconArrowRightDashed /> Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-widget">
                        <h4 className="widget-title">Brand</h4>
                        <div className="widget-content">
                            <ul className="user-links">
                                {brands?.slice(0,6).map((maker) => (
                                <li key={maker.id}>
                                    <Link to={`/product-list?makers=${maker.name}`}>
                                        <IconArrowRightDashed /> {maker.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-widget">
                        <h4 className="widget-title">Body Type</h4>
                        <div className="widget-content">
                            <ul className="user-links">
                                <li><a href="#"><IconArrowRightDashed /> Sedan</a></li>
                                <li><a href="#"><IconArrowRightDashed /> Hatchback</a></li>
                                <li><a href="#"><IconArrowRightDashed /> SUV</a></li>
                                <li><a href="#"><IconArrowRightDashed /> Wagon</a></li>
                                <li><a href="#"><IconArrowRightDashed /> Bus</a></li>
                                <li><a href="#"><IconArrowRightDashed /> Truck</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-widget">
                        <h4 className="widget-title">Quick Contact</h4>
                        <div className="widget-content">
                            <ul className="user-links contact-links">
                                <li><IconMapPin /> <span>2356 Oakwood Drive, Suite 18, San Francisco, California 94111, US</span></li>
                                <li><IconPhone /> <span>+81 80-2189-8080</span></li>
                                <li><IconPhone /> <span>+81 70-2646-2835</span></li>
                                <li><IconMail /> <a href="mailto:admin@bizupon.com">admin@bizupon.com </a></li>
                                <li><IconPrinter /> <span>+81 45-507-8363</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-12">
                    <div className="footer-copyright">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <p className="copyright">© 2025 Bizupon. All rights reserved.</p>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <a href="/"><img src={logo} alt="" className="img-fluid" /></a>
                            </div>
                            <div className="col-lg-5 col-md-12">
                                <ul className="footer-nav">
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Disclaimer</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer;
