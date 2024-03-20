import React, { useContext, useState } from "react";
import Image from "next/image";
import logologin from "../../public/images/loginlogoimg.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import Listings from './../api/laravel/Listings';
import { Context } from "../_app";

export default function Login() {
  const { setAuth } = useContext(Context);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const main = new Listings();
    const response = main.Login({
      email: formData.email,
      password: formData.password,
    });
    response.then((res) => {
      if (res && res.data && res.data.status) {
        toast.success(res.data.message);
        // console.log("res",res)
   const record =      setAuth(res?.data);
   console.log("record",record)
        localStorage && localStorage.setItem("token", res?.data?.token);
        router.push('/');
        // console.log(res.data.message)
        setFormData({
          email: "",
          password: "",
        });
      } else {
        toast.error(res?.data.message)
        console.log(res?.data.message)
      }
      // setLoading(false);
    }).catch((error) => {
      console.log("error", error);
      toast.error(error.message);
      toast.error(error?.response.data);
      // setLoading(false);
    })
  };

  return (
    <div
      className="h-screen"
      style={{ backgroundImage: `url(/images/login-bg.jpg)` }}
    >
      <div className="container h-full">
        <div className="flex items-center  h-full relative">
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
          <div className="w-6/12 px-3 flex justify-end">
            <div className="signup-form w-full max-h-screen overflow-y-auto">
              <div className="formbgcolor"></div>
              <div className="quainttay">
                <h2>Welcome to Quaint Stay Jaipur </h2>
                <h3>
                  Don't have an account? <Link href="/signup">Sign up</Link>
                </h3>
              </div>
              <form 
             onSubmit={handleSubmit}
              >
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
                <button type="submit" className="submint-btn">
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