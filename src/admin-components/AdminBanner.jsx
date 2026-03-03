import React from 'react'
import banner from '../admin-images/banner.png';

function AdminBanner() {
  return (
    <div className="welcome-banner">
        <div className="row">
            <div className="col-lg-7 col-12">
                <div className="banner-content">
                    <h2 className="text-white mb-3">Your trusted partner for quality cars</h2>
                    <p className="text-white">Where quality meets performance and customer satisfaction comes first.</p>
                </div>
            </div>
            <div className="col-lg-5 col-12 text-center">
                <div className="img-welcome-banner">
                    <img src={banner} alt="img" className="img-fluid" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminBanner;
