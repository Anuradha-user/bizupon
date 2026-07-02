import React from 'react'
import logo from '../../web-images/logo.svg';
import { IconLockPassword } from '@tabler/icons-react';

function ChangePassword() {
  return (
    <div className="container-xxl">
        <div className="row vh-100 d-flex justify-content-center">
            <div className="col-lg-4 mx-auto align-self-center">
                <div className="card">
                    <div className="card-body p-0 bg-black auth-header-box rounded-top">
                        <div className="text-center p-3">
                            <a href="index.html" className="logo logo-admin">
                                <img src={logo} height="50" alt="logo" className="auth-logo" />
                            </a>
                            <h5 className="mt-3 fw-medium text-white">Change Password?</h5>
                        </div>
                    </div>
                    <div className="card-body p-4 pt-0">
                        <form className="mt-4 mb-2" action="">
                            <div className="form-group">
                                <label className="form-label" htmlFor="userpassword">Old Password</label>
                                <input type="password" className="form-control" name="password" id="oldpassword" placeholder="Enter password" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="userpassword">New Password</label>
                                <input type="password" className="form-control" name="password" id="newpassword" placeholder="Enter password" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="userpassword">Confirm Password</label>
                                <input type="password" className="form-control" name="password" id="confirmpassword" placeholder="Enter password" />
                            </div>
                            <div className="form-group mb-0">
                                <div className="col-12">
                                    <div className="d-grid mt-2">
                                        <button className="btn btn-md btn-primary" type="button">Change Password <IconLockPassword className="ms-1 fs-4" /></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword;
