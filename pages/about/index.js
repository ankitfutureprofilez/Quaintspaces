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
          // router.push("/");
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

  const compantdetails = [
    { key: 'phone', value: ' 9521410122' },
    { key: 'address', value: 'D-105, Golden Oak II, Devi Marg, Near Station Road, Bani Park, Jaipur-302019' },
    // { key: 'services', value: 'Management Services' }
  ]


  return (
    <Layout>
      <Head>
        <title>About Us - Quaintspaces Jaipur</title>
      </Head>
      {/* Hero sec component */}
      <div className="bg-cover bg-no-repeat bg-center contact-about" style={{ backgroundImage: `url(/images/banner/Banner1.JPG)` }} >
        <div className="py-[95px] px-[13px] bg-[#00000087]">
          {/* 10015 */}
          <div className="">
            <h1 className="">Discover the Art of Luxurious Living</h1>
            <p className=" max-w-[800px] m-auto text-[16px] text-[#fff]">
              Experience exceptional stays curated for your comfort and style,
              where every detail is crafted to perfection.
            </p>
          </div>
        </div>
      </div>
      {/* Why Book with us */}
      <div className="lg:py-[80px] md:py-[40px] py-[30px]">
        <div className="container mx-auto">
          <h2 className="sm:mb-4 mb-2 text-[26px] sm:text-[30px] md:text-[40px] text[#3F2A17] text-center font-[400] font-['Baskervville']"> Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="h-[250px] md:h-[398px] rounded-[10px]" style={{ backgroundImage: `url(/images/About1.webp)` ,backgroundPosition: 'center'  }} >
              <div className="bg-[#00000073] rounded-[10px] h-full py-[20px] xxl:py-[50px] px-[20px] xxl:px-[40px] flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-start">
                <h3 className="text-[20px] lg:text-[24px] text-[#fff] mb-[8px] mb-[10px] xxl:mb-[15px]">Unmatched Quality</h3>
                <p className="text-[14px] lg:text-[16px] text-[#fff]">Each property is meticulously selected to ensure the highest standards of luxury and comfort.</p>
              </div>
            </div>
            <div className="h-[250px] md:h-[398px] rounded-[10px]" style={{ backgroundImage: `url(/images/About2.webp)`, backgroundPosition: 'center' }} >
              <div className="bg-[#00000073] rounded-[10px] h-full py-[20px] xxl:py-[50px] px-[20px] xxl:px-[40px] flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-start">
                <h3 className="text-[20px] lg:text-[24px] text-[#fff] mb-[8px] mb-[10px] xxl:mb-[15px]">Personalized Experience</h3>
                <p className="text-[14px] lg:text-[16px] text-[#fff]">Enjoy tailored services designed to meet your unique preferences and needs.</p>
              </div>
            </div>
            <div className="md:h-[398px] grid grid-cols-1 gap-4 md:flex flex-col justify-between ">
              <div className="h-[250px] md:h-[190px] rounded-[10px]" style={{ backgroundImage: `url(/images/About3.webp)`, backgroundPosition: 'center' }}>
                <div className=" bg-[#00000073] rounded-[10px] h-full py-[20px] xxl:py-[50px] px-[20px] xxl:px-[40px] flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-start">
                  <h3 className="text-[20px] lg:text-[24px] text-[#fff] mb-[8px] mb-[10px] xxl:mb-[15px]">Seamless Booking</h3>
                  <p className="text-[14px] lg:text-[16px] text-[#fff]">Our user-friendly platform makes finding and booking your perfect stay effortless.</p>
                </div>
              </div>
              <div className="h-[250px] md:h-[190px] rounded-[10px]" style={{ backgroundImage: `url(/images/About4.webp)`, backgroundPosition: 'center' }}>
                <div className=" bg-[#00000073] rounded-[10px] h-full py-[20px] xxl:py-[50px] px-[20px] xxl:px-[40px] flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-start">
                  <h3 className="text-[20px] lg:text-[24px] text-[#fff] mb-[8px] mb-[10px] xxl:mb-[15px]">24/7 Support</h3>
                  <p className="text-[14px] lg:text-[16px] text-[#fff]">Our dedicated team is available around the clock to assist with any inquiries or requests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Easy Steps */}
      <div className="bg-[#E0E0B0] lg:py-[60px] py-[40px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 flex justify-start md:justify-end pl-[50px] lg:px-6 mb-[30px] md:mb-0">
              <div className="flex flex-col space-y-4 relative">
                <div className="xl:max-w-[380px] lg:max-w-[320px] sm:max-w-[200px] max-w-[200px] border-[6px] absolute top-0 left-[-50px] lg:left-[-100px] border-[#E0E0B0]">
                  <img src="/images/EasySteps2.JPG" alt="Modern living space" className="w-full h-[300px]" />
                </div>
                <img src="/images/EasySteps1.jpg" alt="Luxurious living room" className="h-[200px] !mt-[159px] w-full max-w-[350px]" />
              </div>
            </div>
            <div className="md:w-6/12 w-full px-0 md:px-6">
              <div>
                <h3 className="md:text-[24px] text-[20px] text-[#3F2A17] mb-[20px] text-[#000000]">Tenx Management</h3>
                <p className="text-[16px] flex text-[#000000] mb-[10px] max-w-xs">
                  <svg className="w-5 h-5 inline-block m-1.5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"></path>
                  </svg>
                  9521410122
                </p>
                <p className="text-[16px] flex text-[#000000] mb-[10px] max-w-xs">
                  <svg width="20" height="20" className="min-w-[20px] w-5 h-5 inline-block m-1.5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  D-105, Golden Oak II, Devi Marg, Near Station Road, Bani Park, Jaipur 302019
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Old Code */}
      <div className="bg-[#f7f8f9] lg:py-[80px] md:py-[60px] sm:py-[40px] py-[25px]">
        <div className="container flex mx-auto w-full flex-wrap items-center md:flex-nowrap space-x-7 mt-10">
          <div className="md:w-6/12 w-full mb-[15px] md:mb-0">
            {/* <h2 className="text-[#3F2A17] md:text-[32px] sm:text-[26px] text-[24px] border-b lg:pb-[30px] sm:pb-[20p] pb-[15] lg:mb-[50px] sm:mb-[40] mb-[20px]">
              Company info
            </h2>
            <div>
              {compantdetails?.map((item,index)=>(
                <>
                <p className="capitalize text-[15px] text-[#7A746E] mb-[10px]">
                {item?.key}
                </p>
                <h3 className="md:text-[24px] text-[20px] text-[#3F2A17] md:mb-[35px] sm:mb-[28px] mb-[20px]"
                  >
              {item?.value}
                </h3>
                </> 
              ))}
            
              
            </div> */}
            <div className="flex flex-col space-y-4 relative">
              <div className="xl:max-w-[380px] lg:max-w-[320px] md:max-w-[200px] w-[60%] border-[6px] absolute top-0 left-0 border-[#e0e0b0] ">
                <img src="/images/EasySteps2.JPG" alt="Modern living space" className="w-full max-h-[350px]" />
              </div>
              <img src="/images/EasySteps1.jpg" alt="Luxurious living room" className=" ml-[100px] !mt-[159px]" />
            </div>
          </div>
          <div className="md:w-6/12 lg:pl-[50px] w-full !ml-0 md:!ml-8 mt-4 md:mt-0">
            <h2 className="text-[#3F2A17] md:text-[32px] sm:text-[26px] text-[24px] border-b lg:pb-[30px] sm:pb-[20p] pb-[15] lg:mb-[50px] sm:mb-[40] mb-[20px]">
              Write to Us
            </h2>
            <div className="w-full security-box-form">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 lg:mb-6">
                  <label
                    htmlFor="name"
                    className="capitalize text-[15px] text-[#7A746E] sm:mb-[10px] mb-[8px]"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    className="sm:p-[16px] p-[12px]  mt-[10px] rounded-full w-full"
                    required
                  />
                </div>
                <div className="mb-3 lg:mb-6">
                  <label
                    htmlFor="email"
                    className="capitalize text-[15px] text-[#7A746E] sm:mb-[10px] mb-[8px]"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    className="sm:p-[16px] p-[12px]   mt-[10px] rounded-full w-full"
                    required
                  />
                </div>
                <div className="mb-3 lg:mb-6">
                  <label
                    htmlFor="message"
                    className="capitalize text-[15px] text-[#7A746E] sm:mb-[10px] mb-[8px]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData?.message}
                    onChange={handleChange}
                    className="sm:p-[16px] p-[12px]  mt-[10px] rounded-3xl min-h-32 lg:min-h-52  w-full"
                    required
                    rows={4} // Set the number of rows as needed
                  />
                </div>
                <div className="flex items-center justify-center h-full">
                  <button className="hover:bg-[#fff] border border-[#efa3a3] bg-[#efa3a3] text-[#fff] hover:text-[#efa3a3] btn w-7/12 !py-2 lg:!py-3">
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
