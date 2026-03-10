import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import quote from '../web-images/quote.png';
import shape from '../web-images/testi_shape.png';
import { IconArrowNarrowLeft, IconArrowNarrowRight} from '@tabler/icons-react';

function ClientFeedback({ client }) {

    const testimonials = [
        {
        id: 1,
        name: "Jenny Wilson",
        role: "Happy Client",
        image: client,
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        },
        {
        id: 2,
        name: "John Carter",
        role: "Satisfied Customer",
        image: client,
        text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."
        },
        {
        id: 3,
        name: "Michael Brown",
        role: "Car Enthusiast",
        image: client,
        text: "Buying my dream car was never this easy. Amazing service and smooth process!"
        }
    ];

  return (
    <section className="testinonials">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title text-center mb-5">
                        <h6>Clients Feedback</h6>
                        <h1>What Our Clients Say's</h1>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="testimonial-slider-wrapper mt-5 position-relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{ delay: 10000 }}
                            navigation={{
                            nextEl: ".slider-next",
                            prevEl: ".slider-prev",
                        }}
                        breakpoints={{
                            0: {
                            slidesPerView: 1,   // mobile
                            },
                            576: {
                            slidesPerView: 1,   // small devices
                            },
                            768: {
                            slidesPerView: 2,   // tablet
                            },
                            992: {
                            slidesPerView: 2,   // laptop
                            },
                            1200: {
                            slidesPerView: 2,   // desktop
                            },
                        }}
                        className="testimonial-slider"
                    >
                        
                        {testimonials.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="testimonial_box">
                                <div className="testimonial_head">
                                    <div className="testi_client">
                                        <img src={item.image} className="img-fluid" alt={item.name} />
                                        <div className="client_info">
                                            <h5>{item.name}</h5>
                                            <p>{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial_text">
                                    <p>{item.text}</p>
                                </div>
                                <div className="testi_quote">
                                    <img src={quote} className="img-fluid" alt="quote" />
                                </div>
                                <img src={shape} className="testi_shape img-fluid" alt="shape" />
                            </div>
                        </SwiperSlide>
                        ))}

                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="slider-prev">
                        <IconArrowNarrowLeft />
                    </button>

                    <button className="slider-next">
                        <IconArrowNarrowRight />
                    </button>

                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ClientFeedback
