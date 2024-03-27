import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Listing from "../api/Listing";
import AdminLayout from "./../AdminLayout";
import Element from "./../element";

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
    if (loading == true) {
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
    <>
      <AdminLayout>
        <Element />
        <div className="container mx-auto">
          <div className="my-3 sm:my-6 md:my-12 profile-text">
            <h1>Update Password</h1>
            <p>
              Increase the security of your account by updating password etc.
            </p>
          </div>
        </div>
        <div className=" container mx-auto">
          <div className="w-full sm:w-3/5 security-box-form">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 "
                >
                  Current password
                </label>
                <input
                  type="password"
                  id="email"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  className="mt-1 p-4 border rounded-full w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  New password
                </label>
                <input
                  type="password"
                  id="email"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="mt-1 p-4 border rounded-full w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="email"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="mt-1 p-4 border rounded-full w-full"
                  required
                />
              </div>
              <button
                className={
                  "font-inter font-lg leading-tight update-btn text-center text-black-400 w-full sm:w-96 bg-orange-300  border-0 p-4 rounded-full mt-10 mb-12"
                }
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
