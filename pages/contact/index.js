import React, { useState } from "react";
import Layout from "../layout/Layout.js";
import Heading from "../elements/Heading.js";
import Image from "next/image";
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

  const compantdetails =[
    { key: 'name', value: 'Tenx Management' },
    { key: 'phone', value: '9521410122' },
    { key: 'address', value: 'D-105, Golden Oak II, Devi Marg, Near Station Road, Bani Park, Jaipur-302019' },
    { key: 'services', value: 'Management Services' }
  ]
  
  
  return (
    <Layout>
      <Head>
        <title>Contact Us - QS Jaipur</title>
      </Head>
      {/* Hero sec component */}
      <div className="bg-cover bg-no-repeat bg-center contact-about" style={{ backgroundImage: `url(/images/banner/Banner1.JPG)` }} >

        <div className="py-[200px] bg-[#00000087]">
          <div className="">
            <h1 className="">Discover the Art of Luxurious Living</h1>
            <p className=" max-w-[800px] m-auto">
              Experience exceptional stays curated for your comfort and style,
              where every detail is crafted to perfection.
            </p>
          </div>
        </div>
      </div>
      {/* Why Book with us */}
      <div className="max-w-6xl mx-auto py-[100px]">
        <h2 className="mb-4 text-[40px] text[#3F2A17] text-center font-[400] font-['Baskervville']">Why Book With Us</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#efa3a3] py-[50px] px-[40px] flex flex-col items-start ">
            <h3 className="text-[24px] text-[#3F2A17] mb-[15px]">Unmatched Quality</h3>
            <p className="text-[16px] text-[#3F2A17]">Each property is meticulously selected to ensure the highest standards of luxury and comfort.</p>
          </div>
          <div className=""  style={{ backgroundImage: `url(/images/Book1.jpg)` }} >
            <div className="py-[50px] bg-[#00000073] h-full px-[40px] flex flex-col items-start">
                <h3 className="text-[24px] text-[#fff] mb-[15px]">Personalized Experience</h3>
                <p className="text-[16px] text-[#fff]">Enjoy tailored services designed to meet your unique preferences and needs.</p>
            </div>
          </div>
          <div>
            <div   style={{ backgroundImage: `url(/images/Book.jpg)` }}>
              <div className="py-[50px] bg-[#00000073] h-full px-[40px] mb-4 flex flex-col items-start">
                  <h3 className="text-[24px] text-[#fff] mb-[15px]">Seamless Booking</h3>
                  <p className="text-[16px] text-[#fff]">Our user-friendly platform makes finding and booking your perfect stay effortless.</p>
              </div>
            </div>
            <div className="bg-[#B1BBC2] py-[50px] px-[40px] flex flex-col items-start">
              <h3 className="text-[24px] text-[#3F2A17] mb-[15px]">24/7 Support</h3>
              <p className="text-[16px] text-[#3F2A17]">Our dedicated team is available around the clock to assist with any inquiries or requests.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Easy Steps */}
      <div className="bg-[#E0E0B0] py-[100px]">
        <h2 className="mb-4 text-[40px] text[#3F2A17] text-center font-[400] mb-[50px] font-['Baskervville']">Book Your Home In 3 Easy Steps</h2>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-2/5 px-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-[24px] text-[#3F2A17] mb-[10px]"><span className="text-[34px] font-['Baskervville']">01</span> Explore Our Listings</h3>
                <p className="text-[16px] text-[#666360] ">Browse through our curated selection of luxurious properties to find your perfect stay.</p>
              </div>
              <div>
                <h3 className="text-[24px] text-[#3F2A17] mb-[10px]"><span className="text-[34px] font-['Baskervville']">02</span> Check Availability</h3>
                <p className="text-[16px] text-[#666360]">Easily check availability and choose the dates that best suit your travel plans.</p>
              </div>
              <div>
                <h3 className="text-[24px] text-[#3F2A17] mb-[10px]"><span className="text-[30px] font-['Baskervville']">03</span> Secure Your Booking</h3>
                <p className="text-[16px] text-[#666360]">Complete your reservation with our seamless and secure booking process.</p>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 px-6 mt-8 md:mt-0">
            <div className="flex flex-col space-y-4 relative">
              <div className="max-w-[380px] border-[6px] absolute top-0 left-0 border-[#e0e0b0] ">
              <img src="/images/EasySteps2.JPG" alt="Modern living space" className="w-full" />
              </div>
              <img src="/images/EasySteps1.jpg" alt="Luxurious living room" className=" ml-[100px] !mt-[159px]" />
            </div>

          </div>
        </div>
      </div>
      {/* Old Code */}
      <div className="bg-[#f7f8f9] py-[80px]">
        <div className="container flex mx-auto w-full flex-wrap md:flex-nowrap space-x-7 mt-10">
          <div className="md:w-6/12 w-full">
            <h2 className="text-[#3F2A17] text-[32px] border-b pb-[30px] mb-[50px]">
              Company info
            </h2>
            <div>
              {compantdetails?.map((item,index)=>(
                <>
                <p className="capitalize text-[15px] text-[#7A746E] mb-[10px]">
                {item?.key}
                </p>
                <h3 className="text-[24px] text-[#3F2A17] mb-[35px]"
                  >
              {item?.value}
                </h3>
                </> 
              ))}
            
              
            </div>

          </div>
          <div className="md:w-6/12 w-full !ml-0 md:!ml-8 mt-4 md:mt-0">
            <h2 className="text-[#3F2A17] text-[32px] border-b pb-[30px] mb-[57px]">
              Write to Us
            </h2>
            <div className="w-full security-box-form">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 lg:mb-6">
                  <label
                    htmlFor="name"
                    className="capitalize text-[15px] text-[#7A746E] mb-[10px]"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    className="p-[16px] mt-[10px] rounded-full w-full"
                    required
                  />
                </div>
                <div className="mb-3 lg:mb-6">
                  <label
                    htmlFor="email"
                    className="capitalize text-[15px] text-[#7A746E] mb-[10px]"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    className="p-[16px] mt-[10px] rounded-full w-full"
                    required
                  />
                </div>
                <div className="mb-3 lg:mb-6">
                  <label
                    htmlFor="message"
                    className="capitalize text-[15px] text-[#7A746E] mb-[10px]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData?.message}
                    onChange={handleChange}
                    className="p-[16px] mt-[10px] rounded-3xl min-h-32 lg:min-h-52  w-full"
                    required
                    rows={4} // Set the number of rows as needed
                  />
                </div>
                <button className=" hover:bg-[#fff] border border-[#efa3a3] bg-[#efa3a3] text-[#fff] hover:text-[#efa3a3] btn w-7/12 !py-2 lg:!py-3 flex  justify-center">
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
