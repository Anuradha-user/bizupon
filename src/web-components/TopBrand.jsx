import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

import "swiper/css";
import "swiper/css/navigation";

import audiLogo from "../web-images/audi-logo.png";
import toyotaLogo from "../web-images/toyota-logo.png";
import nissanLogo from "../web-images/nissan-logo.png";
import hondaLogo from "../web-images/honda-logo.png";
import mazdaLogo from "../web-images/mazda-logo.png";
import suzukiLogo from "../web-images/suzuki-logo.png";
import subaruLogo from "../web-images/subaru-logo.png";
import hyundaiLogo from "../web-images/hyundai-logo.png";
import mercedesLogo from "../web-images/mercedes-logo.png";
import mitsubishiLogo from "../web-images/mitsubishi-logo.png";

function TopBrand() {
  const brands = [
    { name: "Audi", logo: audiLogo },
    { name: "Toyota", logo: toyotaLogo },
    { name: "Nissan", logo: nissanLogo },
    { name: "Honda", logo: hondaLogo },
    { name: "Mazda", logo: mazdaLogo },
    { name: "Suzuki", logo: suzukiLogo },
    { name: "Subaru", logo: subaruLogo },
    { name: "Hyundai", logo: hyundaiLogo },
    { name: "Mercedes", logo: mercedesLogo },
    { name: "Mitsubishi", logo: mitsubishiLogo },
  ];
  
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/ProductList?maker=${brandName}`);
  };

  return (
    <section className="top-brand">
      <div className="container">
        <div className="section-title text-center mb-4">
          <h6>Top Brand</h6>
          <h1>Browse By Brand Type</h1>
        </div>

        <div className="position-relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".slider-next",
              prevEl: ".slider-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 2 },
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
            }}
          >
            {brands.map((brand, index) => (
                <SwiperSlide key={index}>
                    <div
                    className="vertical-product-card text-center"
                    onClick={() => handleBrandClick(brand.name)}
                    style={{ cursor: "pointer" }}
                    >
                    <div className="thumbnail">
                        <img
                        src={brand.logo}
                        alt={brand.name}
                        className="img-fluid"
                        />
                    </div>
                    <h6>{brand.name}</h6>
                    </div>
                </SwiperSlide>
                ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="slider-prev">
            <IconArrowNarrowLeft size={22} />
          </button>

          <button className="slider-next">
            <IconArrowNarrowRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopBrand;