import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiLayout from "../api/apiLayout";

import "swiper/css";
import "swiper/css/navigation";

const IMAGE_BASE_URL = "https://www.bizupon.com/Makerimage/";

function TopBrand() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(ApiLayout.CarData);
        
        // Target lstmaker safely inside response.data.data
        const makersList = response.data?.data?.lstmaker || [];
        setBrands(makersList);
      } catch (err) {
        console.error("Error fetching makers:", err);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (makerName) => {
    navigate(`/product-list?makers=${encodeURIComponent(makerName)}`);
  };

  return (
    <section className="top-brand">
      <div className="container">

        <div className="section-title text-center mb-4">
          <h6>Top Brand</h6>
          <h1>Browse By Brand Type</h1>
        </div>

        <div className="position-relative">
          {brands.length > 0 && (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={5}
              loop={brands.length > 5}
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
              {brands.map((brand) => {
                // Prepend base URL when flag filename exists, else fallback image
                const imageUrl = brand.flag 
                  ? `${IMAGE_BASE_URL}${brand.flag}` 
                  : "https://via.placeholder.com/100?text=No+Image";

                return (
                  <SwiperSlide key={brand.id}>
                    <div
                      className="vertical-product-card text-center"
                      onClick={() => handleBrandClick(brand.name)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="thumbnail">
                        <img
                          src={imageUrl}
                          alt={brand.name}
                          className="img-fluid"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100?text=No+Image";
                          }}
                        />
                      </div>
                      <h6>{brand.name}</h6>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}

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