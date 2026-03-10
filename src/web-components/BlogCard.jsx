import { IconArrowNarrowRight } from "@tabler/icons-react";
import React from "react";

function BlogCard({ photo }) {
  return (
    <article className="blog-card">
      <div className="thumbnail overflow-hidden">
        <img src={photo.url} alt={photo.title} className="img-fluid w-100" />
      </div>
      <div className="blog-card-content">
        <h4 className="mb-2 blog-heading">{photo.title}</h4>
        <p className="blog-desc">Album ID: {photo.title}</p>
        <a href="" target="_blank" className="read-more">
          Read More <IconArrowNarrowRight />
        </a>
      </div>
    </article>
  );
}

export default BlogCard;