import React from 'react'
import logo from '../admin-images/logo.png';
import { IconArrowBigRight, IconArticle, IconCube, IconDoorEnter, IconFerry, IconHexagons, IconReceiptDollar, IconUser, IconUsersGroup } from '@tabler/icons-react';

function SidebarMenu({ sidebarHidden }) {
  return (
    <div className={`toc ${sidebarHidden ? "sidebar-hide" : ""}`}>
        <div className="toc__inner">
            <div className="toc__logo">
                <a href="/admin/dashboard"><img src={logo} className="logo" alt="Bizupon" /></a>
            </div>
            <div className="toc__nav">
                <nav id="main-navigation" className="main-navigation">
                    <ul className="toc__navul">
                        <li className="">
                            <a href=""><IconCube /> Product Master</a>
                            <ul className="subnav">
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Another Status</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Expensify Card</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Product Date</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Broker</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update BL Number</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Add Variant</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Deleted Product</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Upload Port Image</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update All Shipping</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Document Confirmation</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update D Receive Date</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Cancel Penalty</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Approve Commission</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Shipping Details</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Remark</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Notify & CFS</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Add Product</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> View Variant</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Variant</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Loading & Surrender</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Doc Send Date</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Inspection</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Car Auction</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> PID Details</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Broker Special</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> View Shipment Information</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Inner</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Consignee</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Ship Name</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> View Product</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Add Purchase</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Fuzokuhin</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Yard In Date</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Shipping</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Update Yard Out</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> View Car Auction</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Ship Notification</a>
                                </li>
                                <li className="">
                                    <a href=""><IconArrowBigRight /> Shipping Information</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a href=""><IconReceiptDollar /> Account Management</a>
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
                            <a href=""><IconHexagons /> Master</a>
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
                            <a href=""><IconUsersGroup /> Team Management</a>
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
