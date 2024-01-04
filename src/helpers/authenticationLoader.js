import { redirect } from "react-router-dom";
import { authProvider } from "./authProvider";

function authenticationLoader({ request }) {
  if (localStorage.getItem("accessToken")) {
    authProvider.isAuthenticated = true;
    authProvider.userName = localStorage.getItem("userName");
  }
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  return null;
}

export default authenticationLoader;
