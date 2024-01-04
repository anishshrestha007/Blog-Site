import * as React from "react";
import { getBlogList } from "../components/blog/BlogAPIHandler";
import { GetHtml } from "./baseHelpers";

const PostContext = React.createContext(undefined);

function PostProvider({ children }) {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    getBlog();
  }, []);

  async function getBlog() {
    try {
      const response = await getBlogList();

      if (response.data.success) {
        const resultPosts = response.data.data.map((post) => {
          const contentHTML = GetHtml(post.Content);
          const div1 = document.createElement("div");
          div1.innerHTML = contentHTML.__html;
          const contentText = div1.innerText;
          return {
            ...post,
            Content: contentHTML,
            ContentText: contentText,
            ContentSnippet:
              contentText.length <= 150
                ? contentText
                : contentText.substr(0, 150) + "...",
          };
        });

        setPosts(resultPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
}

export { PostContext, PostProvider };
