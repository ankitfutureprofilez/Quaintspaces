import React from 'react'
import Navbar from "./Navbar.js";
import Header from "./Header.js";
import LuxuryStay from "./LuxuryStay.js";
import PremiumLocation from "./PremiumLocation.js";
import ReasonToVisit from "./ReasonToVisit.js";
import Footer from "./Footer.js";
import Card from './Card.js';

export default function index() {
  return (
    <div>
      <div className="bg-cover bg-center nav-header-sec" style={{ backgroundImage: `url(/images/HeaderImg.png)` }}>
        <Navbar/>
        <Header/>
      </div>
      <LuxuryStay/>
    <Card/>
      <PremiumLocation/>
      <ReasonToVisit/>
      <Footer/>
      </div>
  )
}
