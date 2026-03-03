import { IconCarFilled, IconCoinFilled, IconShieldCheckFilled } from '@tabler/icons-react'
import whyus from '../web-images/why-us.png'

function WhyUs() {
  return (
    <section className="why-choose-us">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-12 col-12">
                    <div className="section-title title2">
                        <h6>Why Choose Us</h6>
                        <h1>We are Dedicated to Provide<br/>
                            <span>Quality Service</span></h1>
                        <p>Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniamquis</p>
                    </div>
                    <img src={whyus} className="img-fluid mt-5" alt="why choose us" />
                </div>
                <div className="col-lg-7 col-md-12 col-12">
                    <div className="row ms-5">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="why-card mt-5">
                                <div className="why-header">
                                    <IconCarFilled />
                                    <h1>01</h1>
                                </div>
                                <div className="why-content">
                                    <h2>Best Quality Cars</h2>
                                    <p>Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniamquis</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="why-card">
                                <div className="why-header">
                                    <IconCarFilled />
                                    <h1>02</h1>
                                </div>
                                <div className="why-content">
                                    <h2>Wide Range of Brands</h2>
                                    <p>Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniamquis</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="why-card mt-5">
                                <div className="why-header">
                                    <IconCoinFilled />
                                    <h1>03</h1>
                                </div>
                                <div className="why-content">
                                    <h2>Reasonable Price</h2>
                                    <p>Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniamquis</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="why-card">
                                <div className="why-header">
                                    <IconShieldCheckFilled />
                                    <h1>04</h1>
                                </div>
                                <div className="why-content">
                                    <h2>Trusted by Thousands</h2>
                                    <p>Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniamquis</p>
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

export default WhyUs
