import React from 'react'
import Navbar from "./Navbar.js";
import Header from "./Header.js";
import LuxuryStay from "./LuxuryStay.js";
import PremiumLocation from "./PremiumLocation.js";
import ReasonToVisit from "./ReasonToVisit.js";
import Footer from "./Footer.js";
import HomeRoomsLists from './HomeRoomsLists.js';

export default function MainPage() {
  return (
    <div>

      <div className="bg-cover bg-center nav-header-sec" style={{ backgroundImage: `url(/images/HeaderImg.png)` }}>
        <Navbar/>
        <Header/>
      </div>
      <LuxuryStay/>
      <HomeRoomsLists/>
      <PremiumLocation/>
      <ReasonToVisit/>
      
      <Footer/>
      </div>
  )
}
