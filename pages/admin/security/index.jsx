import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Listing from "../api/Listing";
import AdminLayout from "./../AdminLayout";
import Element from "./../element";
import Link from 'next/link';

export default function Security() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
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
    if (loading === true) {
      return;
    }
    setLoading(true);
    const main = new Listing();
    const response = main.Adminpasschange({
      old_password: formData.current_password,
      password: formData.new_password,
      confirm_password: formData.confirm_password,
    });
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          router.push("/admin/login");
          setFormData({
            new_password: "",
            confirm_password: "",
            current_password: "",
          });
        } else {
          toast.error(res?.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <AdminLayout>
      <Element text="Security" />
      <section className="bg-white-50 dark:bg-white-900">
        <div className="flex flex-col items-center justify-center  mx-auto  lg:py-0">
          <div className="w-full p-6 dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 ">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                <input type="password" name="current_password" value={formData.current_password} onChange={handleChange} id="current_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <input type="password" name="new_password" value={formData.new_password} onChange={handleChange} id="new_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
