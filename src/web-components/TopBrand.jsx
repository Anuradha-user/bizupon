import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

function TopBrand() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/MakerData")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBrandClick = (maker) => {
    navigate(`/product-list?makers=${maker}`);
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
              1200: { slidesPerView: 6 },
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
                      src={brand.flag}
                      alt={brand.name}
                      className="img-fluid"
                    />
                  </div>
                  <h6>{brand.name}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

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