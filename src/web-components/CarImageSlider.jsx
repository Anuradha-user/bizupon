import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

import { Navigation, Thumbs, Autoplay } from "swiper/modules";

function CarImageSlider({ car }) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // 🔥 generate multiple images (A → E)
  const images = ["A", "B", "C", "D", "E"].map(letter =>
    car?.image
      ?.replace("/small/", "/large/")
      ?.replace(/-[A-Z]\.jpg$/, `-${letter}.jpg`)
  );

  return (
    <div className="car-slider">

      {/* MAIN SLIDER */}
      <Swiper
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        loop
        spaceBetween={10}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-slider" >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} className="img-fluid w-100" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMB IMAGE */}
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress
        className="thumb-slider mt-2" >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} className="img-fluid" />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

export default CarImageSlider;