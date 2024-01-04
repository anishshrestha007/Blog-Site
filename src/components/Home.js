import React from "react";
import SignIn from "./authorization/SignIn";
import { Link } from "react-router-dom";
import "../css/Home.css";
export default function Home() {
  return (
    <div className="home-page">
      <SignIn></SignIn>
    </div>
  );
}
