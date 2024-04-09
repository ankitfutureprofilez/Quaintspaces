import React, { useState } from "react";
import Layout from "../layout/Layout.js";
import Heading from "../elements/Heading.js";
import Image from "next/image";
import ContactUs from "../../public/images/ContactUs.png";
import { useRouter } from "next/router";
import Button from "../elements/Button.js";
import toast from "react-hot-toast";
import Listings from "../api/laravel/Listings.js";
export default function index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading == true) {
      return;
    }
    setLoading(true);
    const main = new Listings();
    const response = main.ContactUs({
      name: formData?.name,
      email: formData?.email,
      message: formData?.message,
    });
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res?.data?.message);
          router.push("/");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        } else {
          toast.error(res?.data?.message);
          // console.log(res?.data.message);
          setLoading(false);
        }
       
      })
      .catch((error) => {
        toast.error(error?.response?.data);
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="pt-3 sm:pt-6 md:pt-12">
          <Heading text={"Contact "} handleClick={() => router.back()} />
        </div>
      </div>
      <div className="bg-orange-300 justify-between w-full py-6 md:py-12 my-6 md:my-12">
      <div className="container mx-auto">
        <div className="flex justify-between flex-wrap sm:flex-nowrap">
        <div className="flex items-center w-full mb-3 sm:mb-0">
          <svg
            width="50"
            height="50"
            viewBox="0 0 63 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="31.5" cy="31" r="31" fill="#3F2A17" />
            <path
              d="M26.12 29.79C27.56 32.62 29.88 34.93 32.71 36.38L34.91 34.18C35.18 33.91 35.58 33.82 35.93 33.94C37.05 34.31 38.26 34.51 39.5 34.51C40.05 34.51 40.5 34.96 40.5 35.51V39C40.5 39.55 40.05 40 39.5 40C30.11 40 22.5 32.39 22.5 23C22.5 22.45 22.95 22 23.5 22H27C27.55 22 28 22.45 28 23C28 24.25 28.2 25.45 28.57 26.57C28.68 26.92 28.6 27.31 28.32 27.59L26.12 29.79Z"
              fill="white"
            />
          </svg>
          <span className="ml-2 font-medium">+98-9745678912</span>
        </div>
        <div className="flex items-center w-full mb-3 sm:mb-0">
          <svg
            width="50"
            height="50"
            viewBox="0 0 63 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="31.5" cy="31" r="31" fill="#3F2A17" />
            <path
              d="M40 23H24C22.9 23 22.01 23.9 22.01 25L22 37C22 38.1 22.9 39 24 39H40C41.1 39 42 38.1 42 37V25C42 23.9 41.1 23 40 23ZM40 27L32 32L24 27V25L32 30L40 25V27Z"
              fill="white"
            />
          </svg>
          <span className="ml-2 font-medium">quientstay@gmail.com</span>
        </div>
        <div className="flex items-center w-full mb-3 sm:mb-0">
          <svg
            width="50"
            height="50"
            viewBox="0 0 63 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="31.5" cy="31" r="31" fill="#3F2A17" />
            <mask
              id="mask0_959_183"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="22"
              y="21"
              width="20"
              height="20"
            >
              <path d="M22.5 21.5H41.5V40.5H22.5V21.5Z" fill="white" />
            </mask>
            <g mask="url(#mask0_959_183)">
              <path
                d="M33.79 21.64L33.22 21.56C31.5069 21.3127 29.7588 21.5574 28.1795 22.2656C26.6002 22.9738 25.2548 24.1163 24.3 25.56C23.2842 26.94 22.6786 28.5788 22.553 30.2877C22.4274 31.9967 22.7868 33.7063 23.59 35.22C23.6722 35.3717 23.7234 35.5383 23.7405 35.71C23.7577 35.8817 23.7405 36.055 23.69 36.22C23.28 37.63 22.9 39.05 22.5 40.54L23 40.39C24.35 40.03 25.7 39.67 27.05 39.34C27.3349 39.2808 27.6311 39.3087 27.9 39.42C29.1112 40.0111 30.4348 40.3363 31.782 40.3738C33.1293 40.4113 34.4689 40.1601 35.7111 39.6372C36.9533 39.1144 38.0692 38.3318 38.9841 37.3421C39.899 36.3525 40.5915 35.1785 41.0153 33.8992C41.4392 32.6198 41.5844 31.2646 41.4414 29.9244C41.2983 28.5843 40.8703 27.2903 40.1859 26.1292C39.5016 24.9681 38.5769 23.9668 37.4737 23.1925C36.3706 22.4183 35.1146 21.8889 33.79 21.64ZM36.31 34.76C35.9466 35.0854 35.5034 35.3087 35.0256 35.407C34.5478 35.5054 34.0524 35.4754 33.59 35.32C31.4946 34.73 29.6766 33.4152 28.46 31.61C27.9953 30.9715 27.6217 30.2715 27.35 29.53C27.2029 29.0998 27.1763 28.6375 27.2733 28.1933C27.3702 27.749 27.587 27.3398 27.9 27.01C28.0524 26.8155 28.2598 26.6714 28.4953 26.5965C28.7307 26.5216 28.9832 26.5194 29.22 26.59C29.42 26.64 29.56 26.93 29.74 27.15C29.886 27.563 30.057 27.967 30.25 28.36C30.3964 28.5605 30.4576 28.8108 30.4201 29.0563C30.3826 29.3017 30.2496 29.5223 30.05 29.67C29.6 30.07 29.67 30.4 29.99 30.85C30.6974 31.8692 31.6736 32.6723 32.81 33.17C33.13 33.31 33.37 33.34 33.58 33.01C33.67 32.88 33.79 32.77 33.89 32.65C34.47 31.92 34.29 31.93 35.21 32.33C35.503 32.453 35.787 32.597 36.06 32.76C36.33 32.92 36.74 33.09 36.8 33.33C36.8577 33.5904 36.8425 33.8616 36.7561 34.1139C36.6696 34.3662 36.5153 34.5898 36.31 34.76Z"
                fill="white"
              />
            </g>
          </svg>
          <span className="ml-2 font-medium">+98-9745678912</span>
        </div>
        </div>
        </div>
      </div>
      <div className="container flex mx-auto w-full flex-wrap md:flex-nowrap space-x-7">
        <div className="md:w-6/12 w-full">
          <Image className="w-full" src={ContactUs} alt="QS Jaipur Logo" />
        </div>
        <div className="md:w-6/12 w-full !ml-0 md:!ml-8 mt-4 md:mt-0">
          <h2
            className="text-xl sm:text-3xl text-lg font-semibold mb-4 lg:mb-8 mt-2.5 border-b pb-3 lg:pb-6"
            style={{ color: "#3F2A17" }}
          >
            Write to Us
          </h2>
          <div className="w-full security-box-form">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 lg:mb-6">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-600 "
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="mt-3 p-3 lg:p-4 border rounded-full w-full"
                  required
                />
              </div>
              <div className="mb-3 lg:mb-6">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-600"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  className="mt-3 p-3 lg:p-4 border rounded-full w-full"
                  required
                />
              </div>
              <div className="mb-3 lg:mb-6">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData?.message}
                  onChange={handleChange}
                  className="mt-3 p-3 lg:p-4 border rounded-3xl min-h-32 lg:min-h-52  w-full"
                  required
                  rows={4} // Set the number of rows as needed
                />
              </div>
              <button className="filter btn w-7/12 !py-2 lg:!py-3">
                {loading?"Submitting...":"Submit"}
                </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
