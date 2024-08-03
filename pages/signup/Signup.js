import React, { useState } from "react";
import Image from "next/image";
import logologin from "../../public/images/Login_Logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
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
    if (loading == true) { return; }
    setLoading(true);
    const main = new Listings();
    const response = main.Signup({
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirm_password: formData.confirmPassword.trim(),
    });
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          router.push("/login");
        } else {
          toast.error(res?.data.message);
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
      className="h-screen tab-mob-height bg-cover "
    >
    <Image src="/images/banner/login_img.JPG"
    placeholder="blur" priority={true}
    blurDataURL="/images/banner/login_img.JPG?q=0.5"
    alt="Login Background"
    layout="responsive" width="1000" height="1000"
    objectFit="cover"
    className="fixed top-0 left-0 !w-full !h-full object-cover"  />

      <div className="container relative z-[1] h-full">
        <div className="flex items-center h-full relative signup-tab-sec">
        <div className="pt-[3vh] md:pt-0 left-logo-login w-6/12 px-3">
          <div className="relative">
            <div className="backtohome !static ms-2 mb-[100px] lg:ms-0">
              <Link href="/">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="0.5" y="43.5" width="43" height="43" rx="21.5" transform="rotate(-90 0.5 43.5)" stroke="white" /> <path d="M20.828 22.636L25.778 27.586L24.364 29L18 22.636L24.364 16.272L25.778 17.686L20.828 22.636Z" fill="white" /> </svg>
                Homepage
              </Link>
            </div>
            
            <Link href="/">
            <Image src={logologin} alt="Quaint Spaces Jaipur logo" />
            </Link>
            <p>
            Indulge in the finest and most charming accommodation in Jaipur!
            </p>
          </div>
            
          </div>
          <div className="right-signup-form w-6/12 px-3 flex justify-end">
            <div className="signup-form bg-[#0003] w-full max-h-[90vh] overflow-y-auto">
              <div className="formbgcolor"></div>
              <div className="quainttay">
                <h2>Welcome to Quaint Spaces Jaipur </h2>
                <h3 className="text-[#fff]">
                  Already have an account? <Link
                    className="underline"
                    href="/login">Login</Link>
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
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
