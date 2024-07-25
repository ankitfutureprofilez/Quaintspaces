import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'swiper/css';


import "../styles/fonts.css";
import "../styles/RangeSlider.css";
import "../styles/confirm.css";
import "../styles/globals.css";
import "../styles/customs.css";
import "../styles/apartment.css";
import "../styles/ImageMover.css";
import NotLogin from "./login/NotLogin";
import dynamic from "next/dynamic";
const PullToRefresh = dynamic(() => import("../hooks/PulltoRefresh"));

export const Context = React.createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  const [auth, setAuth] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistData, setWishlistData] = useState(null);
  const values = {
    openLogin,
    setOpenLogin,
    wishlist,
    setWishlist,
    wishlistData,
    setWishlistData,
    auth,
    setAuth,
  };

  useEffect(() => {
    // if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    //   navigator.serviceWorker
    //     .register("/service-worker.js")
    //     .then((registration) => {
    //       // console.log(
    //       //   "Service Worker registered with scope:",
    //       //   registration.scope
    //       // );
    //     })
    //     .catch((error) => {
    //       console.error("Service Worker registration failed:", error);
    //     });
    // }
  }, []);

  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     router.push('/login');
  //   }
  // }, [router.pathname]);

  return (
    <>
     <Toaster
            toastOptions={{
              position: "top-right",
              className: "",
              style: {
                "font-size": "14px",
              },
            }}
          />
      <PullToRefresh>
        
        <Context.Provider value={values}>
          <div className="page-transition-container">
            <Component {...pageProps} key={router.route} />
          </div>
          {openLogin ? (
          <NotLogin openLogin={openLogin} />
          ) :(<></>)}
        </Context.Provider>
      </PullToRefresh>
    </>
  );
}

export default MyApp;
