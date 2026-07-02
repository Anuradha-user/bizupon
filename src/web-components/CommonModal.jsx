import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

function CommonModal({ show, onClose, title }) {
  const [activeTab, setActiveTab] = useState("login");
  const [bookingType, setBookingType] = useState("turnkey");
  const [phone, setPhone] = useState("");

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal modal-lg">

        {/* Header */}
        <div className="modal-header">
          <h4>{title}</h4>
          <button onClick={onClose} className="close-btn"><IconX /></button>
        </div>

        {/* Tabs */}
        <div className="tab-header">
          <button className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")} >
            New Registration
          </button>
          <button className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")} >
            Login with Password
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {activeTab === "login" ? (
            <div className="row">
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" />
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Surname</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter Surname" />
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email ID" />
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Phone Number</label>
                        <PhoneInput
                        country={"ru"}   // default India
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputClass="form-control"
                        containerClass="w-100"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Booking Type</label>
                        <div className="radioGroup">
                            <label className="form-control">
                                <span className="plan-type">Turnkey (₽)</span>
                                <input type="radio" name="plan" className="radio" value="turnkey"
                                    checked={bookingType === "turnkey"}
                                    onChange={(e) => setBookingType(e.target.value)}
                                />
                            </label>
                            <label className="form-control">
                                <span className="plan-type">C&F (¥)</span>
                                <input type="radio" name="plan" className="radio" value="cf"
                                    checked={bookingType === "cf"}
                                    onChange={(e) => setBookingType(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-12 text-center">
                    <button className="btn theme-btn w-50 mt-3">Registration</button>
                </div>
            </div>
          ) : (
            <div className="row">
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email ID" />
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Password</label>
                        <input type="password" className="form-control" id="email" name="email" placeholder="Enter Email ID" />
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Booking Type</label>
                        <div className="radioGroup">
                            <label className="form-control">
                                <span className="plan-type">Turnkey (₽)</span>
                                <input type="radio" name="plan" className="radio" value="turnkey"
                                    checked={bookingType === "turnkey"}
                                    onChange={(e) => setBookingType(e.target.value)}
                                />
                            </label>

                            <label className="form-control">
                                <span className="plan-type">C&F (¥)</span>
                                <input type="radio" name="plan" className="radio" value="cf"
                                    checked={bookingType === "cf"}
                                    onChange={(e) => setBookingType(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-12 text-center">
                    <button className="btn theme-btn w-50 mt-3">Login</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommonModal;