import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../web-images/logo.svg';
import { IconLockPassword } from '@tabler/icons-react';

function ForgotPassword() {
  return (
    <div className="admin-auth">
        <div className="container-xxl">
            <div className="row vh-100 d-flex justify-content-center">
                <div className="col-lg-4 mx-auto align-self-center">
                    <div className="card">
                        <div className="card-body p-0 bg-black auth-header-box rounded-top">
                            <div className="text-center p-3">
                                <Link to="/">
                                    <img src={logo} alt="logo" className="auth-logo" />
                                </Link>
                                <h5 className="mt-3 fw-medium text-white">Forgot Password?</h5>   
                            </div>
                        </div>
                        <div className="card-body p-4 pt-0">
                            <form className="mt-4 mb-2" action="">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="userpassword">Enter Email ID</label>
                                    <input type="text" className="form-control" name="text" id="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group mb-0 row">
                                    <div className="col-12">
                                        <div className="d-grid mt-2">
                                            <button className="btn btn-md btn-primary" type="button">Forgot Password <IconLockPassword className="ms-1 fs-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword
