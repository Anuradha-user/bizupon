import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import BlogCard from "../web-components/BlogCard";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jaishriganesha.com/bizupon-blog/api/Blog/GetNewsNBlog")
      .then((res) => {
        console.log("API Response:", res.data);

        const blogArray = res?.data?.data?.lstBlogs || res?.data?.lstBlogs;

        setBlogs(Array.isArray(blogArray) ? blogArray : []);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setBlogs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="blogs">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-5">
              <h6>Our Blogs</h6>
              <h1>Latest News & Blogs</h1>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="blog-slider-wrapper mt-4 position-relative">
              {!loading && blogs.length > 0 ? (
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={25}
                  slidesPerView={3}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: ".slider-next",
                    prevEl: ".slider-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                   992 : {slidesPerview:3}
                  }}
                >
                  {blogs.map((blog, index) => (
                    <SwiperSlide key={blog.blogId || index}>
                      <BlogCard blog={blog} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : !loading ? (
                <p className="text-center">No blogs found.</p>
              ) : null}

              <button className="slider-prev" aria-label="Previous slide">
                <IconArrowNarrowLeft />
              </button>
              <button className="slider-next" aria-label="Next slide">
                <IconArrowNarrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogs;