import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import { useRouter } from "next/router";
import AdminLayout from "../AdminLayout";
import Element from "../element";
import Link from "next/link";
import Booking from "./booking";
import Payment from "./payment";
import Image from 'next/image';

import { motion } from "framer-motion";

function index() {
  const Router = useRouter();
  const { slug } = Router.query;
  const [record, setRecord] = useState("");

  useEffect(() => {
    if(slug){
      const main = new Listing();
      const response = main.userdetails(slug);
      response
        .then((res) => {
          setRecord(res?.data?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [slug]);

  const [activeTab, setActiveTab] = useState("Booking");

  return (
    <AdminLayout heading={"User Details  "}>
      <div className="antialiased mt-16">
        <div className="container mx-auto profile-payment">
          <div className="h-60 w-full profile-cover" >
          <Image
          blurDataURL="/images/profile-cover-img.jpg?q=1"
            src="/images/profile-cover-img.jpg"
            alt="Description of image"
         className="profile-cover-image"
            loading="lazy"
            width={10000}
            height={1000}
          />
          </div>
          <div >
            <div className=" relative  pb-6 rounded-lg  mx-auto">
              <div className="flex justify-center">
                <Image
                  src={
                    record?.image_url
                      ? record?.image_url
                      : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                  }
                  alt="User"
                  className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                  width={128}
                  height={128}
                />
              </div>
              <div className="mt-16">
                <h1 className="font-bold text-center text-capitalize text-3xl text-white-900">
                  {" "}
                  {record?.name}
                </h1>
                {record?.status === 1 ? (
                  <div className="flex justify-center my-2">
                    <div class="flex w-fit items-center gap-1 border rounded-full p-1 px-4">
                      <p class="text-xs">Activate</p>{" "}
                      <svg
                        class="text-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <p className="text-center text-sm text-white-400 font-medium">
                  {record?.email}
                </p>
                <p className="text-center text-sm text-white-400 font-medium">
                  {record?.phone_no}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex text-xl font-medium relative  rounded-lg py-0 mt-4">
          <button
            onClick={() => setActiveTab("Booking")}
            className={`z-10 w-32 px-4 py-2  ${
              activeTab === "overview" ? "" : ""
            }`}
          >
            Booking
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`z-10 w-32  px-4 py-3   rounded-lg ${
              activeTab === "payment" ? "" : ""
            }`}
          >
            Payment{" "}
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`z-10 w-32 px-2 py-2  ${
              activeTab === "rewards" ? "" : ""
            }`}
          ></button>
          <div className="absolute items-center top-0 left-0 w-32 h-full flex">
            <motion.div
              animate={{
                x:
                  activeTab === "Booking"
                    ? 0
                    : activeTab === "rewards"
                    ? "200%"
                    : "100%",
              }}
              className="w-full h-full bg-white border bg-indigo-300 h-7 rounded-lg transform"
            />
          </div>
        </div>
        <div className=" ">
          {activeTab === "Booking" && (
            <div className=" ">
              <Booking record={record?.id} />
            </div>
          )}
          {activeTab === "payment" && (
            <div>
              <Payment record={record?.id} />
            </div>
          )}
          {activeTab === "Rewards" && <div></div>}
        </div>
      </div>
    </AdminLayout>
  );
}

export default index;
