import React, { useState } from "react";
import Layout from "../layout/Layout.js";
import Heading from "../elements/Heading.js";
import Image from "next/image";
import ContactUs from "../../public/images/ContactUs.png";
import { useRouter } from "next/router";
import Button from "../elements/Button.js";
import toast from "react-hot-toast";
import Listings from "../api/laravel/Listings.js";
import Head from "next/head";
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
      <Head>
        <title>Contact Us - QS Jaipur</title>
      </Head>
      {/* Hero sec component */}
      <div className="relative w-full lg:h-[670px] md:h-[550px] sm:h-[450px] h-[350px]">
        <Image
          src="/images/banner/Banner1.JPG"
          alt="property-image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="justify-center items-center flex flex-col hero-sec px-2">
            <h1>Discover the Art of Luxurious Living</h1>
            <p className="max-w-[800px] m-auto text-center">
              Experience exceptional stays curated for your comfort and style,
              where every detail is crafted to perfection.
            </p>
          </div>
        </div>
      </div>
      {/* Why Book with us */}
      <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-center text-2xl font-semibold mb-8">Why Book With Us</h2>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-pink-200 p-6 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">Unmatched Quality</h3>
          <p className="text-sm">Each property is meticulously selected to ensure the highest standards of luxury and comfort.</p>
        </div>
        <div className="bg-gray-200 p-6 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">Personalized Experience</h3>
          <p className="text-sm">Enjoy tailored services designed to meet your unique preferences and needs.</p>
        </div>
        <div className="bg-gray-400 p-6 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">Seamless Booking</h3>
          <p className="text-sm">Our user-friendly platform makes finding and booking your perfect stay effortless.</p>
        </div>
        <div className="bg-blue-200 p-6 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">24/7 Support</h3>
          <p className="text-sm">Our dedicated team is available around the clock to assist with any inquiries or requests.</p>
        </div>
      </div>
    </div>
    {/* Easy Steps */}
    <div className="bg-[#E0E0B0] py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2 px-6">
          <h2 className="text-center md:text-left text-2xl font-semibold mb-8">Book Your Home In 3 Easy Steps</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">01 Explore Our Listings</h3>
              <p className="text-sm">Browse through our curated selection of luxurious properties to find your perfect stay.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">02 Check Availability</h3>
              <p className="text-sm">Easily check availability and choose the dates that best suit your travel plans.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">03 Secure Your Booking</h3>
              <p className="text-sm">Complete your reservation with our seamless and secure booking process.</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 px-6 mt-8 md:mt-0">
          <div className="flex flex-col space-y-4">
            <img src="/images/EasySteps1.png" alt="Luxurious living room" className="rounded-lg shadow-lg" />
            <img src="/images/EasySteps2.png" alt="Modern living space" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
      {/* Old Code */}
      <div className="container flex mx-auto w-full flex-wrap md:flex-nowrap space-x-7 mt-10">
        <div className="md:w-6/12 w-full">
          <Image className="w-full" src={ContactUs} alt="QS Jaipur Logo" />
        </div>
        <div className="md:w-6/12 w-full !ml-0 md:!ml-8 mt-4 md:mt-0">
          <h2
            className="text-xl sm:text-3xl text-lg  text-center font-semibold mb-4 lg:mb-8 mt-2.5 border-b pb-3 lg:pb-6"
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
              <button className=" hover:bg-[#fff] border border-[#E0C4C3] bg-[#E0C4C3] text-[#fff] hover:text-[#E0C4C3] btn w-7/12 !py-2 lg:!py-3 flex mx-auto justify-center">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
