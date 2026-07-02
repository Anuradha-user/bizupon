import React from 'react'
import logo from '../admin-images/logo.png';
import { Link } from 'react-router-dom';
import { IconArrowBigRight, IconArticle, IconCube, IconDashboard, IconDoorEnter, IconFerry, IconHexagons, IconReceiptDollar, IconUser, IconUsersGroup } from '@tabler/icons-react';

function SidebarMenu({ sidebarHidden }) {
  return (
    <div className={`toc ${sidebarHidden ? "sidebar-hide" : ""}`}>
        <div className="toc__inner">
            <div className="toc__logo">
                <Link to="/admin/dashboard"><img src={logo} className="logo" alt="Bizupon" /></Link>
            </div>
            <div className="toc__nav">
                <nav id="main-navigation" className="main-navigation">
                    <ul className="toc__navul">
                        <li className="">
                            <Link to="/admin/dashboard"><IconDashboard /> Dashboard</Link>
                        </li>
                        <li className="">
                            <Link to=""><IconCube /> Product Master</Link>
                            <ul className="subnav">
                                <li className="">
                                    <Link to="product-master/update-another-status"><IconArrowBigRight /> Update Another Status</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-product-date"><IconArrowBigRight /> Update Product Date</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-broker"><IconArrowBigRight /> Update Broker</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-bl-number"><IconArrowBigRight /> Update BL Number</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/add-variant"><IconArrowBigRight /> Add Variant</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/view-variant"><IconArrowBigRight /> View Variant</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-variant"><IconArrowBigRight /> Update Variant</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/add-purchase"><IconArrowBigRight /> Add Purchase</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/view-purchase"><IconArrowBigRight /> View Purchase</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/deleted-product"><IconArrowBigRight /> Deleted Product</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-fuzokuhin"><IconArrowBigRight /> Update Fuzokuhin</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-loading-surrender"><IconArrowBigRight /> Update Loading Surrender</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Document Confirmation</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update D Receive Date</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Cancel Penalty</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Approve Commission</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-shipping-details"><IconArrowBigRight /> Update Shipping Details</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-remark"><IconArrowBigRight /> Update Remark</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Notify & CFS</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> View Purchase</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Loading & Surrender</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Doc Send Date</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Inspection</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Car Auction</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> PID Details</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Broker Special</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> View Shipment Information</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-inner"><IconArrowBigRight /> Update Inner</Link>
                                </li>
                                <li className="">
                                    <Link to="product-master/update-consignee"><IconArrowBigRight /> Update Consignee</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Ship Name</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Variant</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Add Purchase</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Fuzokuhin</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Yard In Date</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Shipping</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Update Yard Out</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> View Car Auction</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Ship Notification</Link>
                                </li>
                                <li className="">
                                    <Link to=""><IconArrowBigRight /> Shipping Information</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <Link to=""><IconReceiptDollar /> Account Management</Link>
                            <ul className="subnav">
                                <li className="">
                                    <Link to="">Update Another Status</Link>
                                </li>
                                <li className="">
                                    <Link to="">Expensify Card</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Product Date</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Broker</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update BL Number</Link>
                                </li>
                                <li className="">
                                    <Link to="">Add Variant</Link>
                                </li>
                                <li className="">
                                    <Link to="">Deleted Product</Link>
                                </li>
                                <li className="">
                                    <Link to="">Upload Port Image</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update All Shipping</Link>
                                </li>
                                <li className="">
                                    <Link to="">Document Confirmation</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update D Receive Date</Link>
                                </li>
                                <li className="">
                                    <Link to="">Cancel Penalty</Link>
                                </li>
                                <li className="">
                                    <Link to="">Approve Commission</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Shipping Details</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Remark</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Notify & CFS</Link>
                                </li>
                                <li className="">
                                    <Link to="">Add Product</Link>
                                </li>
                                <li className="">
                                    <Link to="">View Variant</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Variant</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Loading & Surrender</Link>
                                </li>
                                <li className="">
                                    <Link to="">Doc Send Date</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Inspection</Link>
                                </li>
                                <li className="">
                                    <Link to="">Car Auction</Link>
                                </li>
                                <li className="">
                                    <Link to="">PID Details</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Broker Special</Link>
                                </li>
                                <li className="">
                                    <Link to="">View Shipment Information</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Inner</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Consignee</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Ship Name</Link>
                                </li>
                                <li className="">
                                    <Link to="">View Product</Link>
                                </li>
                                <li className="">
                                    <Link to="">Add Purchase</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Fuzokuhin</Link>
                                </li>
                                <li className="">
                                    <Link to="">Yard In Date</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Shipping</Link>
                                </li>
                                <li className="">
                                    <Link to="">Update Yard Out</Link>
                                </li>
                                <li className="">
                                    <Link to="">View Car Auction</Link>
                                </li>
                                <li className="">
                                    <Link to="">Ship Notification</Link>
                                </li>
                                <li className="">
                                    <Link to="">Shipping Information</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <Link to=""><IconHexagons /> Master</Link>
                            <ul className="subnav">
                                <li className="">
                                    <Link to="master/region"><IconArrowBigRight /> Region</Link>
                                </li>
                                <li className="">
                                    <Link to="master/location"><IconArrowBigRight /> Location</Link>
                                </li>
                                <li className="">
                                    <Link to="master/fuzokuhin"><IconArrowBigRight /> Fuzokuhin Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/ShipMaster"><IconArrowBigRight /> Ship Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/categories"><IconArrowBigRight /> Categories</Link>
                                </li>
                                <li className="">
                                    <Link to="master/sub-categories"><IconArrowBigRight /> Sub Categories</Link>
                                </li>
                                <li className="">
                                    <Link to="master/maker"><IconArrowBigRight /> Maker</Link>
                                </li>
                                <li className="">
                                    <Link to="master/body-type"><IconArrowBigRight /> Body Type</Link>
                                </li>
                                <li className="">
                                    <Link to="master/transport"><IconArrowBigRight /> Transport</Link>
                                </li>
                                <li className="">
                                    <Link to="master/shipping"><IconArrowBigRight /> Shipping</Link>
                                </li>
                                <li className="">
                                    <Link to="master/auction"><IconArrowBigRight /> Auction</Link>
                                </li>
                                <li className="">
                                    <Link to="master/auction-yard"><IconArrowBigRight /> Auction Yard</Link>
                                </li>
                                <li className="">
                                    <Link to="master/port"><IconArrowBigRight /> Port</Link>
                                </li>
                                <li className="">
                                    <Link to="master/port-price"><IconArrowBigRight /> Port Price</Link>
                                </li>
                                <li className="">
                                    <Link to="master/transport-and-shipping"><IconArrowBigRight /> Transport and Shipping</Link>
                                </li>
                                <li className="">
                                    <Link to="master/transport-price"><IconArrowBigRight /> Transport Price</Link>
                                </li>
                                <li className="">
                                    <Link to="master/bulk-fob-price"><IconArrowBigRight /> Bulk FOB Price</Link>
                                </li>
                                <li className="">
                                    <Link to="master/fob-price"><IconArrowBigRight /> FOB Price</Link>
                                </li>
                                <li className="">
                                    <Link to="master/country"><IconArrowBigRight /> Country</Link>
                                </li>
                                <li className="">
                                    <Link to="master/assign-city"><IconArrowBigRight /> Assign City</Link>
                                </li>
                                <li className="">
                                    <Link to="master/shipping-price"><IconArrowBigRight /> Freight Price</Link>
                                </li>
                                <li className="">
                                    <Link to="master/assign-transport"><IconArrowBigRight /> Assign Transport</Link>
                                </li>
                                <li className="">
                                    <Link to="master/update-logistics"><IconArrowBigRight /> Update Logistics</Link>
                                </li>
                                <li className="">
                                    <Link to="master/additional-info"><IconArrowBigRight /> Additional Info</Link>
                                </li>
                                <li className="">
                                    <Link to="master/view-bills"><IconArrowBigRight /> Bills</Link>
                                </li>
                                <li className="">
                                    <Link to="master/consignee-master"><IconArrowBigRight /> Consignee Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/department-master"><IconArrowBigRight /> Department Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/facility-master"><IconArrowBigRight /> Facility Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/update-currency-rate"><IconArrowBigRight /> Update Currency Rate</Link>
                                </li>
                                <li className="">
                                    <Link to="master/video"><IconArrowBigRight /> Video</Link>
                                </li>
                                <li className="">
                                    <Link to="master/auction-buying-type"><IconArrowBigRight /> Auction Buying Type</Link>
                                </li>
                                <li className="">
                                    <Link to="master/sbkts-payment"><IconArrowBigRight /> SBKTS Payment</Link>
                                </li>
                                <li className="">
                                    <Link to="master/currency-master"><IconArrowBigRight /> Currency Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/assign-group"><IconArrowBigRight /> Assign Group</Link>
                                </li>
                                <li className="">
                                    <Link to="master/make-broadcast"><IconArrowBigRight /> Make Broadcast</Link>
                                </li>
                                <li className="">
                                    <Link to="master/broadcast-master"><IconArrowBigRight /> Broadcast Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/terminal-master"><IconArrowBigRight /> Terminal Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/make-sbkts-invoice"><IconArrowBigRight /> Make SBKTS Invoice</Link>
                                </li>
                                <li className="">
                                    <Link to="master/assign-sbkts-company"><IconArrowBigRight /> Assign SBKTS Company</Link>
                                </li>
                                <li className="">
                                    <Link to="master/update-prr"><IconArrowBigRight /> Update PRR</Link>
                                </li>
                                <li className="">
                                    <Link to="master/assign-bank-broker-for-prr"><IconArrowBigRight /> Assign Bank Broker for PRR</Link>
                                </li>
                                <li className="">
                                    <Link to="master/company-master"><IconArrowBigRight /> Company Master</Link>
                                </li>
                                <li className="">
                                    <Link to="master/receive-fuzokuhin"><IconArrowBigRight /> Receive Fuzokuhin</Link>
                                </li>
                                <li className="">
                                    <Link to="master/japan-terminal"><IconArrowBigRight /> Japan Terminal</Link>
                                </li>
                                <li className="">
                                    <Link to="master/assign-terminal"><IconArrowBigRight /> Assign Terminal</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <Link to=""><IconUsersGroup /> Team Management</Link>
                            <ul className="subnav">
                                <li className="">
                                    <Link to="">Update Another Status</Link>
                                </li>
                                <li className="">
                                    <a href="">Expensify Card</a>
                                </li>
                                <li className="">
                                    <a href="">Update Product Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker</a>
                                </li>
                                <li className="">
                                    <a href="">Update BL Number</a>
                                </li>
                                <li className="">
                                    <a href="">Add Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Deleted Product</a>
                                </li>
                                <li className="">
                                    <a href="">Upload Port Image</a>
                                </li>
                                <li className="">
                                    <a href="">Update All Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Document Confirmation</a>
                                </li>
                                <li className="">
                                    <a href="">Update D Receive Date</a>
                                </li>
                                <li className="">
                                    <a href="">Cancel Penalty</a>
                                </li>
                                <li className="">
                                    <a href="">Approve Commission</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Remark</a>
                                </li>
                                <li className="">
                                    <a href="">Update Notify & CFS</a>
                                </li>
                                <li className="">
                                    <a href="">Add Product</a>
                                </li>
                                <li className="">
                                    <a href="">View Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Loading & Surrender</a>
                                </li>
                                <li className="">
                                    <a href="">Doc Send Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inspection</a>
                                </li>
                                <li className="">
                                    <a href="">Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">PID Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker Special</a>
                                </li>
                                <li className="">
                                    <a href="">View Shipment Information</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inner</a>
                                </li>
                                <li className="">
                                    <a href="">Update Consignee</a>
                                </li>
                                <li className="">
                                    <a href="">Update Ship Name</a>
                                </li>
                                <li className="">
                                    <a href="">View Product</a>
                                </li>
                                <li className="">
                                    <a href="">Add Purchase</a>
                                </li>
                                <li className="">
                                    <a href="">Update Fuzokuhin</a>
                                </li>
                                <li className="">
                                    <a href="">Yard In Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Update Yard Out</a>
                                </li>
                                <li className="">
                                    <a href="">View Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">Ship Notification</a>
                                </li>
                                <li className="">
                                    <a href="">Shipping Information</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a href=""><IconUser /> User Management</a>
                            <ul className="subnav">
                                <li className="">
                                    <a href="">Update Another Status</a>
                                </li>
                                <li className="">
                                    <a href="">Expensify Card</a>
                                </li>
                                <li className="">
                                    <a href="">Update Product Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker</a>
                                </li>
                                <li className="">
                                    <a href="">Update BL Number</a>
                                </li>
                                <li className="">
                                    <a href="">Add Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Deleted Product</a>
                                </li>
                                <li className="">
                                    <a href="">Upload Port Image</a>
                                </li>
                                <li className="">
                                    <a href="">Update All Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Document Confirmation</a>
                                </li>
                                <li className="">
                                    <a href="">Update D Receive Date</a>
                                </li>
                                <li className="">
                                    <a href="">Cancel Penalty</a>
                                </li>
                                <li className="">
                                    <a href="">Approve Commission</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Remark</a>
                                </li>
                                <li className="">
                                    <a href="">Update Notify & CFS</a>
                                </li>
                                <li className="">
                                    <a href="">Add Product</a>
                                </li>
                                <li className="">
                                    <a href="">View Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Loading & Surrender</a>
                                </li>
                                <li className="">
                                    <a href="">Doc Send Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inspection</a>
                                </li>
                                <li className="">
                                    <a href="">Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">PID Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker Special</a>
                                </li>
                                <li className="">
                                    <a href="">View Shipment Information</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inner</a>
                                </li>
                                <li className="">
                                    <a href="">Update Consignee</a>
                                </li>
                                <li className="">
                                    <a href="">Update Ship Name</a>
                                </li>
                                <li className="">
                                    <a href="">View Product</a>
                                </li>
                                <li className="">
                                    <a href="">Add Purchase</a>
                                </li>
                                <li className="">
                                    <a href="">Update Fuzokuhin</a>
                                </li>
                                <li className="">
                                    <a href="">Yard In Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Update Yard Out</a>
                                </li>
                                <li className="">
                                    <a href="">View Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">Ship Notification</a>
                                </li>
                                <li className="">
                                    <a href="">Shipping Information</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a href=""><IconFerry /> Transport Management</a>
                            <ul className="subnav">
                                <li className="">
                                    <a href="">Update Another Status</a>
                                </li>
                                <li className="">
                                    <a href="">Expensify Card</a>
                                </li>
                                <li className="">
                                    <a href="">Update Product Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker</a>
                                </li>
                                <li className="">
                                    <a href="">Update BL Number</a>
                                </li>
                                <li className="">
                                    <a href="">Add Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Deleted Product</a>
                                </li>
                                <li className="">
                                    <a href="">Upload Port Image</a>
                                </li>
                                <li className="">
                                    <a href="">Update All Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Document Confirmation</a>
                                </li>
                                <li className="">
                                    <a href="">Update D Receive Date</a>
                                </li>
                                <li className="">
                                    <a href="">Cancel Penalty</a>
                                </li>
                                <li className="">
                                    <a href="">Approve Commission</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Remark</a>
                                </li>
                                <li className="">
                                    <a href="">Update Notify & CFS</a>
                                </li>
                                <li className="">
                                    <a href="">Add Product</a>
                                </li>
                                <li className="">
                                    <a href="">View Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Loading & Surrender</a>
                                </li>
                                <li className="">
                                    <a href="">Doc Send Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inspection</a>
                                </li>
                                <li className="">
                                    <a href="">Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">PID Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker Special</a>
                                </li>
                                <li className="">
                                    <a href="">View Shipment Information</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inner</a>
                                </li>
                                <li className="">
                                    <a href="">Update Consignee</a>
                                </li>
                                <li className="">
                                    <a href="">Update Ship Name</a>
                                </li>
                                <li className="">
                                    <a href="">View Product</a>
                                </li>
                                <li className="">
                                    <a href="">Add Purchase</a>
                                </li>
                                <li className="">
                                    <a href="">Update Fuzokuhin</a>
                                </li>
                                <li className="">
                                    <a href="">Yard In Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Update Yard Out</a>
                                </li>
                                <li className="">
                                    <a href="">View Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">Ship Notification</a>
                                </li>
                                <li className="">
                                    <a href="">Shipping Information</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a href=""><IconArticle /> Blog Management</a>
                            <ul className="subnav">
                                <li className="">
                                    <a href="">Update Another Status</a>
                                </li>
                                <li className="">
                                    <a href="">Expensify Card</a>
                                </li>
                                <li className="">
                                    <a href="">Update Product Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker</a>
                                </li>
                                <li className="">
                                    <a href="">Update BL Number</a>
                                </li>
                                <li className="">
                                    <a href="">Add Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Deleted Product</a>
                                </li>
                                <li className="">
                                    <a href="">Upload Port Image</a>
                                </li>
                                <li className="">
                                    <a href="">Update All Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Document Confirmation</a>
                                </li>
                                <li className="">
                                    <a href="">Update D Receive Date</a>
                                </li>
                                <li className="">
                                    <a href="">Cancel Penalty</a>
                                </li>
                                <li className="">
                                    <a href="">Approve Commission</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Remark</a>
                                </li>
                                <li className="">
                                    <a href="">Update Notify & CFS</a>
                                </li>
                                <li className="">
                                    <a href="">Add Product</a>
                                </li>
                                <li className="">
                                    <a href="">View Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Loading & Surrender</a>
                                </li>
                                <li className="">
                                    <a href="">Doc Send Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inspection</a>
                                </li>
                                <li className="">
                                    <a href="">Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">PID Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker Special</a>
                                </li>
                                <li className="">
                                    <a href="">View Shipment Information</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inner</a>
                                </li>
                                <li className="">
                                    <a href="">Update Consignee</a>
                                </li>
                                <li className="">
                                    <a href="">Update Ship Name</a>
                                </li>
                                <li className="">
                                    <a href="">View Product</a>
                                </li>
                                <li className="">
                                    <a href="">Add Purchase</a>
                                </li>
                                <li className="">
                                    <a href="">Update Fuzokuhin</a>
                                </li>
                                <li className="">
                                    <a href="">Yard In Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Update Yard Out</a>
                                </li>
                                <li className="">
                                    <a href="">View Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">Ship Notification</a>
                                </li>
                                <li className="">
                                    <a href="">Shipping Information</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a href=""><IconDoorEnter /> Entry Point</a>
                            <ul className="subnav">
                                <li className="">
                                    <a href="">Update Another Status</a>
                                </li>
                                <li className="">
                                    <a href="">Expensify Card</a>
                                </li>
                                <li className="">
                                    <a href="">Update Product Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker</a>
                                </li>
                                <li className="">
                                    <a href="">Update BL Number</a>
                                </li>
                                <li className="">
                                    <a href="">Add Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Deleted Product</a>
                                </li>
                                <li className="">
                                    <a href="">Upload Port Image</a>
                                </li>
                                <li className="">
                                    <a href="">Update All Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Document Confirmation</a>
                                </li>
                                <li className="">
                                    <a href="">Update D Receive Date</a>
                                </li>
                                <li className="">
                                    <a href="">Cancel Penalty</a>
                                </li>
                                <li className="">
                                    <a href="">Approve Commission</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Remark</a>
                                </li>
                                <li className="">
                                    <a href="">Update Notify & CFS</a>
                                </li>
                                <li className="">
                                    <a href="">Add Product</a>
                                </li>
                                <li className="">
                                    <a href="">View Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Variant</a>
                                </li>
                                <li className="">
                                    <a href="">Update Loading & Surrender</a>
                                </li>
                                <li className="">
                                    <a href="">Doc Send Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inspection</a>
                                </li>
                                <li className="">
                                    <a href="">Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">PID Details</a>
                                </li>
                                <li className="">
                                    <a href="">Update Broker Special</a>
                                </li>
                                <li className="">
                                    <a href="">View Shipment Information</a>
                                </li>
                                <li className="">
                                    <a href="">Update Inner</a>
                                </li>
                                <li className="">
                                    <a href="">Update Consignee</a>
                                </li>
                                <li className="">
                                    <a href="">Update Ship Name</a>
                                </li>
                                <li className="">
                                    <a href="">View Product</a>
                                </li>
                                <li className="">
                                    <a href="">Add Purchase</a>
                                </li>
                                <li className="">
                                    <a href="">Update Fuzokuhin</a>
                                </li>
                                <li className="">
                                    <a href="">Yard In Date</a>
                                </li>
                                <li className="">
                                    <a href="">Update Shipping</a>
                                </li>
                                <li className="">
                                    <a href="">Update Yard Out</a>
                                </li>
                                <li className="">
                                    <a href="">View Car Auction</a>
                                </li>
                                <li className="">
                                    <a href="">Ship Notification</a>
                                </li>
                                <li className="">
                                    <a href="">Shipping Information</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    </div>

  )
}

export default SidebarMenu;
