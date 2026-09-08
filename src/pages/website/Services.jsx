import service1 from "../../web-images/services1.png"
import service2 from "../../web-images/services2.png"
import service5 from "../../web-images/services5.png"
import service4 from "../../web-images/services4.png"
// import service1 from "../../web-images/services1.png"
// import service1 from "../../web-images/services1.png"
// import serviceImg from "../../web-images/serviceImg.jpg"
// import staffImg from "../../web-images/staff.jpg"

function Services() {

    return (
        <>
            <div className="about-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-title">
                                <h6>Services</h6>
                                <h1>Bizupon Services</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div class="aboutImg">
                                <img src={service4} class="img-fluid" alt="" />
                            </div>
                            <div className="experience-block">
                                <div className="experienceCard">
                                    <h2>24/7</h2>
                                    <h4>Customer Assistance</h4>
                                    <p>Dedicated support throughout bidding, documentation, and shipping.</p>
                                </div>
                                <div className="experienceCard">
                                    <h2>5+</h2>
                                    <h4>Key Services</h4>
                                    <p>Auction, documentation, transportation, and shipping support.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div class="about-content">
                                <p>
                                    We provide professional and reliable assistance throughout the entire
                                    <strong> online auction and vehicle purchasing process</strong>. Our
                                    experienced team helps customers understand the auction system, explore
                                    available vehicles, check important details, and select the right car or
                                    machinery according to their requirements and budget.

                                    <br /><br />

                                    We work with <strong>trusted dealers, manufacturers, and auction sources</strong>
                                    to provide access to a wide range of new and used vehicles. Our team guides
                                    customers through the bidding process and helps them make confident and
                                    informed decisions. During a live auction, we stay in close contact with
                                    the customer to understand their bidding preferences and requirements.
                                    After receiving confirmation, our team places the bid and completes the
                                    purchase on the customer's behalf.

                                    <br /><br />

                                    After the successful purchase, we continue to provide complete support with
                                    <strong> payment, documentation, local transportation, customs procedures,
                                        and worldwide shipping</strong>. We aim to make every step of the process
                                    smooth and transparent, providing customers with dependable assistance from
                                    the initial vehicle selection to final delivery.


                                </p>    </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-service">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="serviceBlock">
                                <img src={service2} className="img-fluid" alt="" />
                                <div className="serviceContent">
                                    <h2>We get documentation sorted</h2>
                                    <p>Bizupon provides complete documentation help to customers from Purchase to delivery. We become the medium between the auction house and customer for any kind of correspondence. We take lead in providing all the documentation needed by the custom office in Japan. By sorting the paperwork, we try to remove all impediments and make the deal an easy sail.</p>       </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="serviceBlock">
                                <img src={service5} className="img-fluid" alt="" />
                                <div className="serviceContent">
                                    <h2>Our Company gives detailed information on FOB, CIF and CNF</h2>
                                    <p>FOB stands for Freight On Board i.e. cost of product to the port anywhere in Japan. CIF stands for Cost Insurance Freight i.e. cost of product to the desired port including insurance during shipping and freight. CNF stands for Cost and Freight i.e. cost of product to the desired port including freight without insurance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Services;
