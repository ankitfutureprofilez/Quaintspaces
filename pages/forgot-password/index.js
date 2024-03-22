import React, { useState } from "react";
import Listings from "../api/laravel/Listings";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const ForgotPassword = () => {
    const router = useRouter();
  const [step, setStep] = useState(1);

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
    console.log("Form submitted:", formData1);
    const main = new Listings();
        const response = main.ForgotPassword({
            email: formData1.email,
        });
        response.then((res) => {
          if (res && res.data && res.data.status) {
            toast.success(res.data.message);
            nextStep();
          } else {
            toast.error(res?.data.message)
            setformData1({
                email: "",
            });
          }
        }).catch((error) => {
          console.log("error", error);
          toast.error(error.message);
          toast.error(error?.response.data);
        })
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
    console.log("Form submitted:", formData2);
    const main = new Listings();
    const response = main.ForgotPasswordOTP({
        email: formData1.email,
        forgot_otp: formData2.otp,
    });
    response.then((res) => {
      if (res && res.data && res.data.status) {
        toast.success(res.data.message);
        nextStep();
      } else {
        toast.error(res?.data.message)
        setformData2({
            otp: "",
        });
      }
    }).catch((error) => {
      console.log("error", error);
      toast.error(error.message);
      toast.error(error?.response.data);
    })
  };

   // Form 3
   const [formData3, setformData3] = useState({
    email: "",
    password:"",
    confirmPassword:"",
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
    console.log("Form submitted:", formData3);
    const main = new Listings();
    const response = main.UpdateForgotPassword({
        email: formData1.email,
        password: formData3.password,
        confirm_password: formData3.confirmPassword,
    });
    response.then((res) => {
      if (res && res.data && res.data.status) {
        toast.success(res.data.message);
        router.push("/");
      } else {
        toast.error(res?.data.message)
        setformData2({
            otp: "",
        });
      }
    }).catch((error) => {
      console.log("error", error);
      toast.error(error.message);
      toast.error(error?.response.data);
    })
  };

  const nextStep = () => {
    setStep(step + 1);
  };

 
  return (
    <div>
      {step === 1 && (
         <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
         <div className="mt-7 bg-white rounded-xl shadow-lg ">
           <div className="p-4 sm:p-7">
             <div className="text-center">
               <h1 className="block text-2xl font-bold text-gray-800 ">
                 Forgot password?
               </h1>
               <p className="mt-2 text-sm text-gray-600 ">
                 Remember your password?
                 <a
                   className="text-blue-600 decoration-2 hover:underline font-medium"
                   href="/login"
                 >
                   Login here
                 </a>
               </p>
             </div>
   
             <div className="mt-5">
               <form onSubmit={handleSubmit1}>
                 <div className="grid gap-y-4">
                   <div>
                     <label
                       htmlFor="email"
                       className="block text-sm font-bold ml-1 mb-2"
                     >
                       Email address
                     </label>
                     <div className="relative">
                       <input
                         type="email"
                         id="email"
                         name="email"
                         value={formData1.email}
                         onChange={handleChange1}
                         className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                         required
                         aria-describedby="email-error"
                       />
                     </div>
                   </div>
                   <button
                     type="submit"
                     className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                   >
                     Next
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </main>
      )}

      {step === 2 && (
         <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
         <div className="mt-7 bg-white rounded-xl shadow-lg ">
           <div className="p-4 sm:p-7">
             <div className="text-center">
               <h1 className="block text-2xl font-bold text-gray-800 ">
                 Enter OTP
               </h1>
               <p className="mt-2 text-sm text-gray-600 ">
                 Enter the OTP sent on your registered email 
               </p>
             </div>
   
             <div className="mt-5">
               <form onSubmit={handleSubmit2}>
                 <div className="grid gap-y-4">
                   <div>
                     <label
                       htmlFor="otp"
                       className="block text-sm font-bold ml-1 mb-2"
                     >
                       OTP
                     </label>
                     <div className="relative">
                       <input
                         type="number"
                         id="otp"
                         name="otp"
                         value={formData2.otp}
                         onChange={handleChange2}
                         className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                         required
                         aria-describedby="otp-error"
                       />
                     </div>
                   </div>
                   <button
                     type="submit"
                     className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                   >
                     Next
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </main>
      )}

      {step === 3 && (
         <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
         <div className="mt-7 bg-white rounded-xl shadow-lg ">
           <div className="p-4 sm:p-7">
             <div className="text-center">
               <h1 className="block text-2xl font-bold text-gray-800 ">
                 Password
               </h1>
               <p className="mt-2 text-sm text-gray-600 ">
                 Enter your New Password 
               </p>
             </div>
       
             <div className="mt-5">
               <form onSubmit={handleSubmit3}>
                 <div className="grid gap-y-4">
                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm font-bold ml-1 mb-2"
                     >
                       Password
                     </label>
                     <div className="relative">
                       <input
                         type="password"
                         id="password"
                         name="password"
                         value={formData3.password}
                         onChange={handleChange3}
                         className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                         required
                         aria-describedby="password-error"
                       />
                     </div>
                   </div>
                   <div>
                     <label
                       htmlFor="confirmPassword"
                       className="block text-sm font-bold ml-1 mb-2"
                     >
                     Confirm Password
                     </label>
                     <div className="relative">
                       <input
                         type="password"
                         id="confirmPassword"
                         name="confirmPassword"
                         value={formData3.confirmPassword}
                         onChange={handleChange3}
                         className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                         required
                         aria-describedby="confirmPassword-error"
                       />
                     </div>
                   </div>
                   <button
                     type="submit"
                     className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                   >
                     Next
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </main>
      )}
    </div>
  );
};

export default ForgotPassword;
