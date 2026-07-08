import React, { useEffect, useState } from "react";
import { IconArrowBigRight, IconArrowNarrowRight, IconChevronDown, IconLockPassword, IconLogout, IconMenu2, IconX } from '@tabler/icons-react'
import userImg from '../admin-images/user.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import ApiLayout from "../assets/Apilayout";

function HeaderNavbar({ onToggleSidebar }) {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (userName) {
            setUser({
                userName,
                fullName: localStorage.getItem("fullName"),
                role: localStorage.getItem("role"),
                profilePic: localStorage.getItem("profilePic"),
            });
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(ApiLayout.logout, {
                username: localStorage.getItem("userName"),
                role: localStorage.getItem("role"),
                deviceInfoOrTokenId:
                    localStorage.getItem("tokenID") || localStorage.getItem("mobileDeviceId"),
            });
        } catch (err) {
            console.error("Logout API failed:", err);
        } finally {
            localStorage.clear();
            navigate("/login");
        }
    };

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
                    {/* ... all your existing menu <ul>/<li> blocks stay exactly as-is, unchanged ... */}
                </nav>
            </div>
            <ul className="user-menu">
                <li className="topbar-item">
                    <button className="dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                        <img src={userImg} alt="" className="thumb-md rounded-circle" />
                        <h5 id="fullName">{user ? user.fullName || user.userName : "User"}</h5>
                    </button>
                    <div className="dropdown-menu stop dropdown-menu-end dropdown-lg py-0">
                        <div className="dropdown-item-text">
                            <h6>Welcome</h6>
                            <h5>{user ? user.fullName || user.userName : "Guest"}</h5>
                        </div>
                        <Link to="/change-password" className="dropdown-item">
                            <IconLockPassword /> Change Password
                        </Link>
                        <Link to="#" className="dropdown-item text-danger" onClick={handleLogout}>
                            <IconLogout className="text-danger" /> Logout
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default HeaderNavbar