import React, { useState } from "react";
import Image from "next/image";
import logologin from "../../public/images/loginlogoimg.png";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="h-screen" style={{ backgroundImage: `url(/images/login-bg.jpg)` }}>
    <div className="container h-full">
    <div className="flex items-center  h-full">
    <div className="left-logo-login w-6/12 px-3">
        <Image src={logologin} alt="logo" />
        <p>Book the most luxuries and aesthetically pleasing place, Jaipur city has to offer</p>
    </div>
    <div className="w-6/12 px-3 flex justify-end" >
    <div className="signup-form w-full max-h-screen overflow-y-auto">
    <div className="formbgcolor">
      
    </div>
      <div className="quainttay">
        <h2 >Welcome to Quaint Stay Jaipur </h2>
        <h3 >
          Already have an account? <Link href="/">Login</Link>
        </h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="rounded-md w-full "
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
        
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md w-full "
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
           
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md w-full "
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="confirmPassword"
          
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="rounded-md w-full "
            required
          />
        </div>
        <button
          type="submit"
          className="submint-btn"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}
