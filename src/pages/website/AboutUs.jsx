import React from 'react'
import aboutImg from "../../web-images/about_us.jpg"
import serviceImg from "../../web-images/serviceImg.jpg"
import staffImg from "../../web-images/staff.jpg"

function AboutUs() {

  return (
    <>
      <div className="about-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title">
                <h6>about us</h6>
                <h1>About Bizupon</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <div class="aboutImg">
                  <img src={aboutImg} class="img-fluid" alt="" />
              </div>
              <div className="experience-block">
                <div className="experienceCard">
                  <h2>25+</h2>
                  <h4>Years Experience</h4>
                  <p>Driving trust and excellence in every deal.</p>
                </div>
                <div className="experienceCard">
                  <h2>500000+</h2>
                  <h4>Cars Sold</h4>
                  <p>Making car ownership easy and reliable.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div class="about-content">
                  <p class="mb-3">All dealerships care about their customers, but Bizupon takes customer experience to a whole new level. Bizupon is known for its customer-centric approach for more than a decade, and this is the driving force behind our massive success. Customers are invited to buy without feeling "pressured.” Beyond this powerful central set of rights, Bizupon goes the extra mile to make being at the dealership a pleasant experience.</p>
                  <p>We invest heavily in customer satisfaction. The most successful dealerships are those that know the preference of their customers and we are a pro at it. We are one of the prominent suppliers of new and used vehicles/machinery from japan, to almost every corner of the world. We procure our stock of vehicles/machinery through dealers and manufacturer’s auction sales. Catering to your needs and maintaining high-quality standards is always our motive and we look forward to serving you with the same dedication in future as well. All we do is ship your dream car to your convenient location any time anywhere. We are a trusted name in selling commercial /non-commercial, sports/heavy-duty vehicles for both right and left-hand drives. Bizupon is also a prominent name in second-hand sales of all varieties of motorbikes in almost every part of the world. With more than 15 years of experience in hand, we are the leaders in serving you with the best quality product at very reasonable rates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-service">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="serviceBlock">
                <img src={serviceImg} className="img-fluid" alt="" />
                <div className="serviceContent">
                    <h2>Our Services</h2>
                    <p>Our extensive services include everything from market research to signing the deal and final documentation. We provide complete assistance in Japanese auction system. We help our customer to understand the auction system and select their product. We transfer knowledge of auction system so that our customer can bid their desired product from anywhere in the world. We make purchase on order basis on behalf of our customer. We give assistance in documentation. We also provide local transportation in Japan</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="serviceBlock">
                <img src={staffImg} className="img-fluid" alt="" />
                <div className="serviceContent">
                    <h2>Our Staff</h2>
                    <p>We assure to work with you to personalize each and every detail to your satisfaction, we are happy to go that extra mile to leave a smile on your face. Our job is to ensure that we make sure customer satisfaction and quality of work are our most important priorities. You will be impressed beyond your imagination. We have an excellent team of customer care executives to help you 24x7 and provide you with relevant data regarding your shipment/ order. Our expert staff will make all the necessary efforts to make your deal a fair one</p>
                    <p className="mt-2">Our staff will always be available for clearing your queries and will help you to have an all new positive experience.The professionals will give you complete details and make your deal hassle free. We promise to make your deal a 'perfect' one in every definition of the word.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default AboutUs;
