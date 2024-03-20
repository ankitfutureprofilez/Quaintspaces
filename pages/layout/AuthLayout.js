import React, { useState, useEffect, createContext } from 'react';
import { useLocation, navigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import Header from '../home/Header';
import Footer from '../home/Footer';
import { useRouter } from "next/router";
export default function AuthLayout({ children }) {
  
  const router =Router();
  const AuthContext = createContext();
  
    const { setAuth } = useContext(Context);
  const { pathname } = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem('token');
    const main = new Listings();
    const response = main.GetUserProfile();
    response.then((res) => {
      if (res.data.status) {
        setAuth(res.data.data);
      } else {
        
      }
    }).catch((error) => {
      console.log("error", error);
      setTimeout(() => {
        toast.error("Please log in first.");
      }, 1000);
      navigate('/'); 
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthContext.Provider>
  );
}
