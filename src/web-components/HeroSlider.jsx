import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import banner1 from "../web-images/bannerimg1.png";
import banner2 from "../web-images/bannerimg2.png";
import banner3 from "../web-images/bannerimg3.png";

const slidesData = [
  {
    id: 1,
    title: "С 7 октября 2024 г. по 31 декабря 2024г.",
    subtitle:
      "оплата производится единым инвойсом на авто и ПРР+СБКТС (услуга ПРР+СБКТС автоматически отражается в инвойсе).",
    image: banner1,
  },
  {
    id: 2,
    title: "С 7 октября 2024 г. по 31 декабря 2024г.",
    subtitle:
      "оплата производится единым инвойсом на авто и ПРР+СБКТС (услуга ПРР+СБКТС автоматически отражается в инвойсе).",
    image: banner2,
  },
  {
    id: 3,
    title: "С 7 октября 2024 г. по 31 декабря 2024г.",
    subtitle:
      "оплата производится единым инвойсом на авто и ПРР+СБКТС (услуга ПРР+СБКТС автоматически отражается в инвойсе).",
    image: banner3,
  },
];

function HeroSlider() {
  return (
    <section className="biz-hero">
      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}

          autoplay={{ delay: 5000, disableOnInteraction: false }}

          speed={1600}

          pagination={{
            el: ".biz-hero-slider-pagination",
            clickable: true,
          }}

          className="biz-hero-slider"
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="biz-hero-single">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-md-6">
                    <div className="hero-left-content">
                      <h1>{slide.title}</h1>
                      <p className="biz-subtitle">{slide.subtitle}</p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 text-center">
                    <div className="hero-right">
                      <img
                        src={slide.image}
                        alt="banner"
                        className="img-fluid hero-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="biz-hero-slider-pagination theme-slider-control"></div>
    </section>
  );
}

export default HeroSlider;