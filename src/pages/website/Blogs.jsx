import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../web-components/BlogCard";
import BlogCategory from "../../web-components/BlogCategory";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const blogsPerPage = 12;

  useEffect(() => {
  setCurrentPage(1);
}, [selectedCategory]);

  useEffect(() => {
    axios.get("https://jaishriganesha.com/bizupon-blog/api/Blog/GetNewsNBlog")
    .then((res) => {
      console.log("API:", res.data);

        const blogArray = res.data?.data?.lstBlogs;

        setBlogs(Array.isArray(blogArray) ? blogArray : []);
      })
      .catch((err) => {
        console.error(err);
        setBlogs([]);
      });
  }, []);

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.categoryId === selectedCategory)
    : blogs;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="blog-list">
      <div className="container">
        <div className="row">
          
          {/* Blog List */}
          <div className="col-lg-8 col-md-12 col-12">
            <div className="row">
              {Array.isArray(blogs) ? (
                currentBlogs.map((blog) => (
                  <div className="col-lg-6 col-md-6 col-12" key={blog.blogId}>
                    <BlogCard blog={blog} />
                  </div>
                ))
              ) : null}
            </div>

            <div className="pagination mt-4 text-center">
              <button className="btn btn-sm btn-dark me-3" disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)} >
                <IconChevronLeft />
              </button>

              {getPageNumbers().map((page) => (
                <button key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)} >
                  {page}
                </button>
              ))}

              <button className="btn btn-sm btn-dark ms-3" disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)} >
                <IconChevronRight />
              </button>

            </div>

          </div>

          {/* Sidebar */}
          <div className="col-lg-4 col-md-12 col-12">
            <BlogCategory 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Blogs;