import React from 'react';
import Header from '../custom/Header';
import Footer from '../custom/Footer';
import Navbar from '../custom/Navbar';

export default function AuthLayout({ children }) {
  return (
    <>
    <Navbar/>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
