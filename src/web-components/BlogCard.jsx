import { IconArrowNarrowRight, IconArrowUpRight, IconCalendarEvent, IconUser } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {

  const imageBaseUrl = "https://www.bizupon.com/blogsimages/";

  return (
    <article className="blog-card">
      <div className="thumbnail overflow-hidden">
        <Link to={`/blog/${blog.blogId}`}>
          <img 
            src={blog.flag ? imageBaseUrl + blog.flag : "/no-image.png"}
            alt={blog.blogTitle}
            className="img-fluid w-100"
          />
        </Link>
      </div>

      <div className="blog-card-content">
        <div className="blog-meta">
          <span><IconUser /> {blog.userName}</span>
          <span><IconCalendarEvent /> {blog.date}</span>
        </div>

        <h4 className="mb-2 blog-heading">
          <Link to={`/blog/${blog.blogId}`}>
            {blog.blogTitle}
          </Link>
        </h4>

        <p className="blog-desc">{blog.details}</p>

        <Link to={`/blog/${blog.blogId}`} className="read-more">
          Read More <IconArrowUpRight />
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;