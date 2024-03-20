import React, { useState } from "react";
import Image from "next/image";
import logologin from "../../public/images/loginlogoimg.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import Listings from './../api/laravel/Listings';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    if(loading==true){return;}
    setLoading(true);
    // console.log("Form submitted:", formData);
    const main = new Listings();
    const response = main.Signup({
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirm_password: formData.confirmPassword.trim(),
    });
    response
      .then((res) => {
        // console.log("response", res);
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          // console.log(res.data.message);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          router.push("/login");
        } else {
          toast.error(res?.data.message);
          console.log(res?.data.message);
          setLoading(false);
        }
       
      })
      .catch((error) => {
        toast.error(error?.response.data);
        setLoading(false);
      });
  };
  return (
    <div
      className="h-screen tab-mob-height"
      style={{ backgroundImage: `url(/images/login-bg.jpg)` }}
    >
      <div className="container h-full">
        <div className="flex items-center  h-full relative signup-tab-sec">
          <div className="left-logo-login w-6/12 px-3">
            <div className="backtohome">
              <Link href="/">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="43.5"
                    width="43"
                    height="43"
                    rx="21.5"
                    transform="rotate(-90 0.5 43.5)"
                    stroke="white"
                  />
                  <path
                    d="M20.828 22.636L25.778 27.586L24.364 29L18 22.636L24.364 16.272L25.778 17.686L20.828 22.636Z"
                    fill="white"
                  />
                </svg>
                Back to home
              </Link>

              
            </div>
            <Image src={logologin} alt="logo" />
            <p>
              Book the most luxuries and aesthetically pleasing place, Jaipur
              city has to offer
            </p>
          </div>
          <div className="right-signup-form w-6/12 px-3 flex justify-end">
            <div className="signup-form w-full max-h-screen overflow-y-auto">
              <div className="formbgcolor"></div>
              <div className="quainttay">
                <h2>Welcome to Quaint Stay Jaipur </h2>
                <h3>
                  Already have an account? <Link href="/login">Login</Link>
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="fullName">Full Name</label>
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
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="password">Password</label>
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
                  <label htmlFor="confirmPassword">Confirm Password</label>
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
                <button type="submit" className="submint-btn">
                {loading?"Submitting...":"Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
