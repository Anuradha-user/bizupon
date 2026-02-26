import { IconArrowBigRight, IconArrowNarrowRight, IconChevronDown, IconLockPassword, IconLogout, IconMenu2, IconX } from '@tabler/icons-react'
import userImg from '../admin-images/user.png'

function HeaderNavbar({ onToggleSidebar }) {
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
                <label for="nav-toggle" className="nav-toggle-label">
                    <IconMenu2  className="icon-menu" />
                    <IconX  className="icon-close" />
                </label>

                <nav className="main-nav">
                    <ul>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-invoice" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <a href="#">Invoice Management</a>
                                <label className="dropdown-icon" for="toggle-invoice"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-reports" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <a href="#">Reports</a>
                                <label className="dropdown-icon" for="toggle-reports"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-other-reports" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <a href="#">Other Reports</a>
                                <label className="dropdown-icon" for="toggle-other-reports"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-account" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <a href="#">Account Reports</a>
                                <label className="dropdown-icon" for="toggle-account"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <input type="checkbox" id="toggle-history" className="dropdown-toggle" />
                            <div className="link-wrapper">
                                <a href="#">History</a>
                                <label className="dropdown-icon" for="toggle-history"><IconChevronDown /></label>
                            </div>
                            <ul className="dropdown-menu services-menu">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Revenue Cycle Management</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <div className="dropdown-item-icon">
                                            <IconArrowBigRight />
                                        </div>
                                        <div className="dropdown-item-content">
                                            <h6 className="dropdown-item-title">Download Invoice Mango</h6>
                                        </div>
                                        <div className="dropdown-item-arrow">
                                            <IconArrowNarrowRight />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <ul className="user-menu">
                <li className="dropdown topbar-item">
                    <button className="dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                        <img src={userImg} alt="" className="thumb-md rounded-circle" />
                        <h5 id="fullName">MAKAROV DMITRIY ALEKSANDROVICH</h5>
                    </button>
                    <div className="dropdown-menu stop dropdown-menu-end dropdown-lg py-0">
                        <div className="dropdown-item-text">
                            <h6>Welcome</h6>
                            <h5>Sanjesh Sharma</h5>
                        </div>
                        <a href="" className="dropdown-item"><IconLockPassword /> Change Password</a>
                        <a href="/login" className="dropdown-item text-danger"><IconLogout className="text-danger" /> Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default HeaderNavbar
