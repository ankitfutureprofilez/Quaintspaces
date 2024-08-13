import React, { useRef, useState } from "react";
import Image from "next/image";
import logologin from "../../public/images/Login_Logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Listings from './../api/laravel/Listings';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Signup() {
  const router = useRouter();
  const CAPUTRE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_KEY
  const hcaptchaRef = useRef(null);

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

  const executeCaptcha = (e) => {
    e.preventDefault();
    hcaptchaRef.current.execute();
  };

  const onVerify = (token) => {
    handleSubmit();
  };

  const handleSubmit = (e) => {
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
      className="autofill h-screen tab-mob-height bg-cover "
    >
      <Image
        src="/images/banner/login_img.JPG"
        blurDataURL="/images/banner/login_img.JPG?q=1"
        placeholder="blur"
        alt="Login Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-[-1]"
      />
      <div className="container h-full">
        <div className="flex items-center h-full relative signup-tab-sec">
          <div className="left-logo-login w-6/12 px-3">
            <div className="backtohome ms-2 lg:ms-0">
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
               Homepage
              </Link>
            </div>
            <Link href="/">
            
            <Image src={logologin} alt="Quaintspaces Jaipur logo" />
            </Link>

            <p>
            Indulge in the finest and most charming accommodation in Jaipur!
            </p>
            {/* <p>
              Book the most luxuries and aesthetically pleasing place, Jaipur
              city has to offer
            </p> */}
          </div>
          <div className="right-signup-form w-6/12 px-3 flex justify-end">
            <div className="signup-form  w-full ">
              <div className="formbgcolor bg-[#0003] h-[100%]"></div>
              <div className="max-h-[90vh]  overflow-y-auto">
                <div className="quainttay">
                  <h2>Welcome to Quaint Spaces Jaipur </h2>
                  <h3 className="text-[#fff]">
                    Already have an account? <Link
                      className="underline"
                      href="/login">Login</Link>
                  </h3>
                </div>
                <form onSubmit={executeCaptcha}>
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
                  <HCaptcha ref={hcaptchaRef} sitekey={CAPUTRE_KEY} data-theme="light" size="invisible" onVerify={onVerify} required />
                  <button type="submit" className="submint-btn">
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
