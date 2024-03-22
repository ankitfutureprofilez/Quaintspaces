import "../styles/fonts.css"
import '../styles/RangeSlider.css';
import "../styles/confirm.css"
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import '../styles/customs.css';
import '../styles/apartment.css';
import LoginLogic from "./login/LoginLogic";
import NotLogin from "./login/NotLogin";


export const Context = React.createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const[auth,setAuth]=useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistData, setWishlistData] = useState(null);
  const values = { openLogin, setOpenLogin, wishlist, setWishlist, wishlistData, setWishlistData, auth, setAuth };

  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     router.push('/login'); 
  //   }
  // }, [router.pathname]);

  return (
    <Context.Provider value={values}>
       <div className="page-transition-container">
      <Component {...pageProps} key={router.route}/>
       </div>
       <Toaster
        toastOptions={{
          position: 'top-right',
          className: '',
          style: {
            'font-size': '14px',
          },
        }}
      />
      <NotLogin openLogin={openLogin} />

    </Context.Provider>
  );
}

export default MyApp;
