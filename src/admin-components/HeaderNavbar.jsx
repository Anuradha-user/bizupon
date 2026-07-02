import React, { useEffect, useState } from "react";
import { IconArrowBigRight, IconArrowNarrowRight, IconChevronDown, IconLockPassword, IconLogout, IconMenu2, IconX } from '@tabler/icons-react'
import userImg from '../admin-images/user.png'
import { Link } from 'react-router-dom'

function HeaderNavbar({ onToggleSidebar }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
    }, []);

  return (
    <header className="header">
        <div className="header-wrapper">
            <div className="toc__menu-toggle">
                <div className="menu-toggle">
                    <span className="one"></span>
                    <span className="two"></span>
                    <span className="three"></span>
                </div>
            </div>
            <button type="button" className="menubar-link" id="sidebar-hide" onClick={onToggleSidebar}>
                <IconMenu2  />
            </button>
            <div className="header-container">
                <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-label="Toggle navigation menu"/>
                <label htmlFor="nav-toggle" className="nav-toggle-label">
                    <IconMenu2  className="icon-menu" />
                    <IconX  className="icon-close" />
                </label>

                <nav className="main-nav">
                    <ul>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-invoice" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <Link to="#">Invoice Management</Link>
                                <label className="dropdown-icon" htmlFor="toggle-invoice"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-reports" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <Link to="#">Reports</Link>
                                <label className="dropdown-icon" htmlFor="toggle-reports"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-other-reports" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <Link to="#">Other Reports</Link>
                                <label className="dropdown-icon" htmlFor="toggle-other-reports"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-account" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <Link to="#">Account Reports</Link>
                                <label className="dropdown-icon" htmlFor="toggle-account"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-history" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <Link to="#">History</Link>
                                <label className="dropdown-icon" htmlFor="toggle-history"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <ul className="user-menu">
                <li className="topbar-item">
                    <button className="dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                        <img src={userImg} alt="" className="thumb-md rounded-circle" />
                        <h5 id="fullName">{user ? user.fullName || user.username || user.email : "User"}</h5>
                    </button>
                    <div className="dropdown-menu stop dropdown-menu-end dropdown-lg py-0">
                        <div className="dropdown-item-text">
                            <h6>Welcome</h6>
                            <h5>{user ? user.fullName || user.username || user.email : "Guest"}</h5>
                        </div>
                        <Link to="/change-password" className="dropdown-item"><IconLockPassword /> Change Password</Link>
                        <Link to="/login" className="dropdown-item text-danger" onClick={() => {
          localStorage.removeItem("user");
        }}><IconLogout className="text-danger" /> Logout</Link>
                    </div>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default HeaderNavbar
