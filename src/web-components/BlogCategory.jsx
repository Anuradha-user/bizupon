import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogCategory({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://jaishriganesha.com/bizupon-blog/api/Blog/GetNewsNBlog")
      .then((res) => res.json())
      .then((data) => {
        const blogs = data?.data?.lstBlogs || [];
        const categoryList = data?.data?.lstBlogCategory || [];

        // 👉 Count blogs per categoryId
        const countMap = {};
        blogs.forEach((blog) => {
          const catId = blog.categoryId;
          countMap[catId] = (countMap[catId] || 0) + 1;
        });

        // 👉 Merge category name + count
        const finalCategories = categoryList.map((cat) => ({
          id: cat.id,
          name: cat.categoryName,
          count: countMap[cat.id] || 0,
        }));

        setCategories(finalCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="blog-category">
      <div className="widget-title">
        <h6>Blog Category</h6>
        <span className="line"></span>
      </div>

      <ul className="widget-nav">
        <li className={selectedCategory === null ? "active" : ""}
          onClick={() => setSelectedCategory(null)}
          style={{ cursor: "pointer" }} >
          <Link to="">All Categories</Link>
        </li>

        {categories.map((cat) => (
          <li key={cat.id}
            className={selectedCategory === cat.id ? "active" : ""}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ cursor: "pointer" }} >
            <Link to="">
              {cat.name}
              <span className="fw-bold fs-xs total-count">
                {cat.count.toString().padStart(2, "0")}
              </span>
            </Link>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default BlogCategory;