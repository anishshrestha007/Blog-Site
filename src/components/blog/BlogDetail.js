import * as React from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../helpers/PostContext";

import "../../css/BlogDetails.css";

function BlogDetail() {
  const { id } = useParams();

  const posts = React.useContext(PostContext);

  function getBlogDetail() {
    const post =
      posts && posts.length > 0 && posts.filter((post) => post.Id == id)[0];
    if (post) {
      return (
        <div className="blog-detail-main">
          <div className="blog-detail-preview">
            <h2 className="blog-detail-title">{post.Title}</h2>
            <div
              className="blog-detail"
              key={post.Title}
              dangerouslySetInnerHTML={post.Content}
            />
          </div>
        </div>
      );
    } else return "";
  }

  return <React.Fragment>{getBlogDetail()}</React.Fragment>;
}

export default BlogDetail;
