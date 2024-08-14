import React, { useContext, useState } from "react";
import Heading from "../elements/Heading";
import Button from "../elements/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Listings from "../api/laravel/Listings";
import AuthLayout from "../layout/AuthLayout";
import Modal from "../elements/Modal.js";
import { Context } from "../_app.js";
import Head from "next/head";
export default function index() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const {setAuth} = useContext(Context);

  const DeleteAccount = (e) => {
    const main = new Listings();
    const response = main.DeactivateAccount();
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          localStorage && localStorage.removeItem("token");
          toast.success(res?.data?.message);
          setAuth(null);
          router.push("/login");
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.message);
        toast.error(error?.response?.data);
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading == true) {
      return;
    }
    setLoading(true);
    const main = new Listings();
    const response = main.ResetPassword({
      old_password: formData?.current_password,
      password: formData?.new_password,
      confirm_password: formData?.confirm_password,
    });
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res?.data?.message);
          router.push("/");
          setFormData({
            new_password: "",
            confirm_password: "",
            current_password: "",
          });
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.message);
        toast.error(error?.response?.data);
        setLoading(false);
      });
  };
  return (
    <AuthLayout>
      <Head>
        <title>Security - Quaint Spaces Jaipur</title>
      </Head>
      <div className="py-4 sm:py-8 md:py-12">
        <div className="container mx-auto">
        <div className="w-full m-auto md:rounded-3xl rounded-2xl md:mt-6 mt-4">
          <div className="mb-6">
            <Heading text={"Security "} handleClick={() => router.back()} />
          </div>
          <div className="mb-6 profile-text">
            <h1>Update Password</h1>
            <p className="security-text">
              Increase the security of your account by updating password etc.
            </p>
          
          </div>
          
            <div className="w-full  security-box-form">
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
                    value={formData?.current_password}
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
                    value={formData?.new_password}
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
                    value={formData?.confirm_password}
                    onChange={handleChange}
                    className="mt-1 p-4 border rounded-full w-full"
                    required
                  />
                </div>
                <div className="flex justify-start">
                <Button
                  text={loading ? "Updating..." : "Update Password"}
                  design={
                    "font-inter hover:bg-[#efa3a3] border-2 border-[#efa3a3] hover:border-[#efa3a3] text-[#efa3a3] hover:text-[#fff] font-normal leading-tight text-center w-full sm:w-96  sm:p-4 p-3 rounded-full mb-8 mt-4"
                  }
                />
                </div>
              </form>
              {/* <div className="border-b-2 border-solid border-zinc-300"></div>
              <div className="mt-6 profile-text mb-6 ">
                <h1 className="text-lg ">Deactivate Account</h1>
                <div className="flex flex-wrap justify-between">
                  <p className="security-text">Deactivate your account here</p>
                  <button onClick={openModal} className="edit-color underline ">
                    Deactivate
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="w-full my-5 px-4">
            <h2 className="sm:text-2xl text-md font-medium text-bold my-2">
              Deactivation Confirmation
            </h2>
            <p className="security-text text-sm mb-2">Are you sure you want to deactivate your account?</p>
            <p className="security-text text-base">
              Please note that deactivating your account is an irreversible
              change. Should you wish to restore your account in the future, you
              will need to contact our technical team for assistance.
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  closeModal();
                }}
                className="btn bg-green-300"
              >
                Cancel
              </button>
              <button onClick={DeleteAccount} className="btn bg-red-500">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AuthLayout>
  );
}
