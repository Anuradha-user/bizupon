import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import BlogCard from "../web-components/BlogCard";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

function Blogs() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
  fetch("https://jaishriganesha.com/bizupon-blog/api/Blog/GetNewsNBlog")
    .then((res) => res.json())
    .then((data) => {
      console.log("API:", data);

      const blogArray = data?.data?.lstBlogs;

      // ✅ Force array
      setBlogs(Array.isArray(blogArray) ? blogArray : []);
    })
    .catch((err) => {
      console.error(err);
      setBlogs([]);
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

              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={25}
                slidesPerView={3}
                autoplay={{ delay: 3000 }}
                navigation={{
                  nextEl: ".slider-next",
                  prevEl: ".slider-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                }}
              >
                {blogs.map((blog) => (
                  <SwiperSlide key={blog.blogId}>
                    <BlogCard blog={blog} />
                  </SwiperSlide>
                ))}
              </Swiper>

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
  );
}

export default Blogs;