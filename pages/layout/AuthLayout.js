import React, { useState, useEffect, createContext } from 'react';
import { useLocation, navigate } from 'react-router-dom';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { useRouter } from "next/router";
import Listings from "../api/laravel/Listings"
export default function AuthLayout({ children }) {
  const router =useRouter();
  const [content, setContent] = useState([]);
  useEffect(() => {
    const auth = localStorage.getItem('token');
    const main = new Listings();
    const response = main.GetUserProfile();
    response.then((res) => {
      if (res.data.status) {
        setContent(res.data.data);
      } else {
        
      }
    }).catch((error) => {
      console.log("error", error);
      setTimeout(() => {
        toast.error("Please log in first.");
      }, 1000);
      router.push('/login'); 
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
