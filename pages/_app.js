import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import PullToRefresh from "../hooks/PulltoRefresh";

import "../styles/fonts.css";
import "../styles/RangeSlider.css";
import "../styles/confirm.css";
import React from "react";
import "../styles/globals.css";
import "../styles/customs.css";
import "../styles/apartment.css";
import LoginLogic from "./login/LoginLogic";
import NotLogin from "./login/NotLogin";

export const Context = React.createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

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
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          // console.log(
          //   "Service Worker registered with scope:",
          //   registration.scope
          // );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     router.push('/login');
  //   }
  // }, [router.pathname]);

  return (
    <>
      <PullToRefresh>
        <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="QS Jaipur offers the best houses at the most affordable rates. We are known for providing exceptional service to our customers."
          />
          <meta
            name="keywords"
            content="QS Jaipur, Quaintstay Jaipur, Property, Rental, House, Home, Apartment, Vacation Rental, Accommodation, Rent, Real Estate, Booking, Lease, Holiday Home, Furnished Rentals, Short Term Rentals, Long Term Rentals, Room Rental, Sublet, Tenant, Landlord, Property Management, Amenities, Location, Neighborhood, Cozy, Comfortable, Affordable, Luxurious, Modern, Stylish, Spacious, Convenient, Safe, Secure, Pet-friendly, Family-friendly, Fully Equipped, Fully Furnished, Utilities Included, Internet, Parking, Laundry, Amenities, Near Me, Explore, Discover, Staycation"
          />
          <meta name="googlebot" content="index, follow" />
          <meta name="robots" content="index, follow" />
        </Head>
        <Context.Provider value={values}>
          <div className="page-transition-container">
            <Component {...pageProps} key={router.route} />
          </div>
          <Toaster
            toastOptions={{
              position: "top-right",
              className: "",
              style: {
                "font-size": "14px",
              },
            }}
          />
          <NotLogin openLogin={openLogin} />
        </Context.Provider>
      </PullToRefresh>
    </>
  );
}

export default MyApp;
