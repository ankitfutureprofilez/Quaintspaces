import React, { useState } from "react";
import Listings from "../api/laravel/Listings";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ForgotLayout from "./ForgotLayout";
import { Context } from "../_app";
import { useContext } from "react";
import Link from "next/link";

const ForgotPassword = () => {
  const { setOpenLogin } = useContext(Context);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const[loading,setLoading]=useState(false);

  // Form 1
  const [formData1, setformData1] = useState({
    email: "",
  });
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setformData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    if(loading==true){return;}
    setLoading(true);
    const main = new Listings();
    const response = main.ForgotPassword({
      email: formData1.email,
    });
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          nextStep();
          setLoading(false);
        } else {
          toast.error(res?.data.message);
          setformData1({
            email: "",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
        toast.error(error?.response.data);
        setLoading(false);
      });
  };

  // Form 2
  const [formData2, setformData2] = useState({
    otp: "",
  });
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setformData2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    if(loading==true){return;}
    setLoading(true);
    const main = new Listings();
    const response = main.ForgotPasswordOTP({
      email: formData1.email,
      forgot_otp: formData2.otp,
    });
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          nextStep();
          setLoading(false);
        } else {
          toast.error(res?.data.message);
          setformData2({
            otp: "",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
        toast.error(error?.response.data);
        setLoading(false);
      });
  };

  // Form 3
  const [formData3, setformData3] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setformData3((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit3 = (e) => {
    e.preventDefault();
    if(loading==true){return;}
    setLoading(true);
    const main = new Listings();
    const response = main.UpdateForgotPassword({
      email: formData1.email,
      password: formData3.password,
      confirm_password: formData3.confirmPassword,
    });
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          router.push("/");
          setLoading(false);
        } else {
          toast.error(res?.data.message);
          setformData2({
            otp: "",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
        toast.error(error?.response.data);
        setLoading(false);
      });
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  setOpenLogin(false);
  return (
    <div>
      {step === 1 && (
        <ForgotLayout showHeader={true}>
          <div className="right-signup-form flex justify-end">
            <div className="signup-form w-full max-h-screen overflow-y-auto">
              <div className="formbgcolor"></div>
              <div className="quainttay">
                <h2>Forgot Password?</h2>
                <h3>
                  Remember your password? <Link href="/login">Login here</Link>
                </h3>
              </div>
              <form onSubmit={handleSubmit1}>
                <div className="mb-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData1.email}
                    onChange={handleChange1}
                    className="rounded-md w-full "
                    required
                  />
                </div>
                <button type="submit" className="submint-btn">
                 {loading? "Submitting..." : "Submit"} 
                </button>
              </form>
            </div>
          </div>
        </ForgotLayout>
      )}

      {step === 2 && (
        <ForgotLayout showHeader={false}>
          <div className="right-signup-form flex justify-end">
            <div className="signup-form w-full max-h-screen overflow-y-auto">
              <div className="formbgcolor"></div>
              <div className="quainttay">
                <h2>Enter OTP</h2>
                <h3>Enter the OTP sent on your registered email</h3>
              </div>
              <form onSubmit={handleSubmit2}>
                <div className="mb-6">
                  <label htmlFor="otp">OTP</label>
                  <input
                    type="number"
                    id="otp"
                    name="otp"
                    value={formData2.otp}
                    onChange={handleChange2}
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
        </ForgotLayout>
      )}

      {step === 3 && (
        <ForgotLayout showHeader={false}>
          <div className="right-signup-form flex justify-end">
            <div className="signup-form w-full max-h-screen overflow-y-auto">
              <div className="formbgcolor"></div>
              <div className="quainttay">
                <h2>New Password</h2>
                <h3>Enter your new password</h3>
              </div>
              <form onSubmit={handleSubmit3}>
                <div className="mb-6">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData3.password}
                    onChange={handleChange3}
                    className="rounded-md w-full "
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData3.confirmPassword}
                    onChange={handleChange3}
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
        </ForgotLayout>
      )}
    </div>
  );
};

export default ForgotPassword;
