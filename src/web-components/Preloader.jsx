import React from 'react'
import favicon from '../web-images/favicon.png';

function Preloader() {
  return (
    <div id="preloader">
        <div className="preloader">
            <div className="pre loader">
                <div className="circle"></div>
            </div>
            <div className="loaderLogo">
                <img src={favicon} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Preloader
