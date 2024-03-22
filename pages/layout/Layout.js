import React from "react";
import Footer from "../home/Footer";
import Header from "../home/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer />
    </>
  );
}