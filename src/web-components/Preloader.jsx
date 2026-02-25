import React from 'react'
import favicon from '../web-images/favicon.png';

function Preloader() {
  return (
    <div id="preloader">
        <div class="preloader">
            <div class="pre loader">
                <div class="circle"></div>
            </div>
            <div class="loaderLogo">
                <img src={favicon} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Preloader
