import React, { useState } from "react";
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import  Listing from "../AdminApi/Listing"
export default function  Login() {
  const [record, setRecord] = useState({
    email: "",
    password: "",
  });

  

  const router = useRouter();


  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRecord((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const main = new Listing();
    const formData = new FormData();
    formData.append("email", record.email);
    formData.append("password", record.password);
    const response = main.adminlogin(formData);
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          router.push("/admin")
          toast.success(res.data.message)
          localStorage && localStorage.setItem("token", res?.data?.token)
        } else {
          toast.error(res.data.message)

        }
        setRecord({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log("error", error);
      });

  };

  return (
    <>

      <div className="  h-dvh flex items-center justify-center w-full dark:bg-gray-950">
        <div className="  rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-3xl font-medium ml-4 text-bold mb-4">
            {" "}
            Sign in to your account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={record.email}
                onChange={handleInputs}
                id="email"
                className="mt-1 p-4 border rounded-full w-full "
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={record.password}
                onChange={handleInputs}
                id="password"
                className="mt-1 p-4 border rounded-full w-full "

                placeholder="Enter your password"
                required
              />
              {/* <a href="#"
					className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
					Password?</a> */}
            </div>
            {/* <div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked/>
					<label for="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
				</div>
				<a href="#"
					className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
					Account</a>
			</div> */}
            <button
              type="submit"
              className="font-inter font-lg leading-tight text-center text-black-400 w-96 bg-orange-300  border-2 p-4 rounded-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


