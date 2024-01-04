import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/authorization/SignIn";
import SignUp from "./components/authorization/SignUp";
import ErrorPage from "./components/common/ErrorPage";

import authenticationLoader from "./helpers/authenticationLoader";
import { authProvider } from "./helpers/authProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Blog from "./components/blog/Blog";
import CreateBlog from "./components/blog/CreateBlog";
import { PostProvider } from "./helpers/PostContext";
import BlogDetail from "./components/blog/BlogDetail";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { userName: authProvider.userName };
    },
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Blog></Blog>,
        loader: authenticationLoader,
      },
      {
        path: "login",
        element: <SignIn></SignIn>,
      },
      {
        path: "register",
        element: <SignUp></SignUp>,
      },
      {
        path: "dashBoard",
        element: <Blog></Blog>,
        loader: authenticationLoader,
      },
      {
        path: "createblog",
        element: <CreateBlog></CreateBlog>,
        loader: authenticationLoader,
      },
      {
        path: "blogdetail/:id",
        element: <BlogDetail></BlogDetail>,
        loader: authenticationLoader,
        exact: false,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostProvider>
      <RouterProvider router={router}></RouterProvider>
    </PostProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
