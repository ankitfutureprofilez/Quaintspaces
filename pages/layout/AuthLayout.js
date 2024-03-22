import React, { useState, useEffect } from "react";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { useRouter } from "next/router";
import Listings from "../api/laravel/Listings";
import toast from "react-hot-toast";
export default function AuthLayout({ children }) {

  const router = useRouter();
  const [content, setContent] = useState([]);

  useEffect(() => {
    const main = new Listings();
    const response =  main.GetUserProfile();
    response.then((res) => {
      if (res.data.status) {
        setContent(res.data.data);
      } 
    }).catch((error) => {
      console.log("error", error);
      router.push("/login");
      toast.error("Please log in first.");
    });
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
