import React from 'react'
import HowBuyProcess from '../web-images/how-buy-process.png';

function HowBuy() {
  return (
    <section className="how-buy">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title text-center">
                        <h6>How to Buy</h6>
                        <h1>Easy & Fast Way to Buy Car</h1>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="buy-process-content">
                        <div className="site-logo text-center">
                            <div className="site-link">
                                <div className="block-number">1</div>
                                <div className="iconbox-content">
                                    <h3 className="iconbox-title mb-0">Choose Your Vehicle</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8 col-md-8 col-12">
                                <div className="process-line">
                                    <img src={HowBuyProcess} className="img-fluid" alt="Process Line Shape" />
                                </div>
                            </div>
                        </div>
                        <div className="buy-process-step row">
                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="iconbox-block icon-left">
                                    <div className="block-number">2</div>
                                    <div className="iconbox-content">
                                        <h3 className="iconbox-title mb-0">Making the Payment</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="iconbox-block icon-left">
                                    <div className="block-number">3</div>
                                    <div className="iconbox-content">
                                        <h3 className="iconbox-title mb-0">Paperwork & Shipping</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="iconbox-block icon-left">
                                    <div className="block-number">4</div>
                                    <div className="iconbox-content">
                                        <h3 className="iconbox-title mb-0">Begin Your Journey</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HowBuy
