import axiosInstance from "../../helpers/axiosInstance";

async function createPost(post) {
  const response = await axiosInstance.post("/blog/createpost", null, {
    params: post,
  });

  return response;
}

async function getBlogList() {
  const response = await axiosInstance.get("/blog");

  return response;
}

export { createPost, getBlogList };
