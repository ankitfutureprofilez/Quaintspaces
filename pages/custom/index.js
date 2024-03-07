import React from 'react'
import Navbar from "./Navbar.js";
import Header from "./Header.js";
import LuxuryStay from "./LuxuryStay.js";
import Places from "./Places.js";
import PremiumLocation from "./PremiumLocation.js";
import ReasonToVisit from "./ReasonToVisit.js";
import Footer from "./Footer.js"


export default function index() {
  return (
    <div>
      <div className="bg-cover bg-center" style={{ backgroundImage: `url(/images/HeaderImg.png)` }}>
        <Navbar/>
        <Header/>
      </div>
      <LuxuryStay/>
      <Places/>
      <PremiumLocation/>
      <ReasonToVisit/>
      <Footer/>
      </div>
  )
}
