import React, { useState } from "react";
import Listing from './../AdminApi/Listing';
import { useRouter } from 'next/router';
function Login() {
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
    // console.log("Form submitted:", record);
    const main = new Listing();
    const formData = new FormData();
    formData.append("email", record.email);
    formData.append("password", record.password);
    const response = main.adminlogin(formData);
    response
      .then((res) => {
        // console.log("res", res);
        if(res?.data?.status){
            router.push("/admin")
            localStorage && localStorage.setItem("token",res?.data?.token)
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
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            {" "}
            Sign in to your account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={record.email}
                onChange={handleInputs}
                id="email"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={record.password}
                onChange={handleInputs}
                id="password"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
