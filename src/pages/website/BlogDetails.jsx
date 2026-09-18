import { IconCalendar, IconCategory, IconUser } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetch(`https://jaishriganesha.com/bizupon-blog/api/Blog/GetblogdetailsByID?BlogId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const blogData = data?.data?.lstBlogs?.[0];
        // 👉 DEFINE categories here
        const categories = data?.data?.lstBlogCategory || [];
        setBlog(blogData);
        // 👉 now use it
        const matchedCategory = categories.find(
          (cat) => cat.id === blogData?.categoryId
        );
        setCategoryName(matchedCategory?.categoryName || "Unknown");
      })
      .catch((err) => console.error(err));
  }, [id]);
  if (!blog) return <h4>Loading blog...</h4>;
  const imageBaseUrl = "https://www.bizupon.com/blogsimages/";
  return (
    <div className="blog-details">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
          <div className="blog-details-content">
            <div className="blog-thumb">
              <img src={blog.flag ? imageBaseUrl + blog.flag : "/no-image.png"}
              alt={blog.blogTitle} className="img-fluid mb-4"
              />
            </div>
            <div className="author-block">
              <p><IconUser /> {blog?.author || "Bizupon Team"}</p>
              <p><IconCalendar /> {blog.date}</p>
              <p><IconCategory /> {categoryName}</p>
            </div>
            <h2>{blog.blogTitle}</h2>
            <div className="blog-description">
              <p>{blog.details}</p>
            </div>
            <div className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.htmldetails }}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;