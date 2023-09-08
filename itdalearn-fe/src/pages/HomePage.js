import Nav from "../common/Nav";
import Footer from "../common/Footer";
import Index from "../components/home/Index";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  // window.location.reload();

  // function clearStorage() {
  //   let session = sessionStorage.getItem("register");

  //   if (session == null) {
  //     localStorage.removeItem("token");
  //   }
  //   sessionStorage.setItem("register", 1);
  // }
  // window.addEventListener("load", clearStorage);
  return (
    <>
      <Nav />
      <Index />
      <Footer />
    </>
  );
}
