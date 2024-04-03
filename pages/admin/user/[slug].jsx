import React, { useState, useEffect } from 'react';
import Listing from "../api/Listing";
import { useRouter } from "next/router";
import AdminLayout from "../AdminLayout";
import Element from "../element";
import Link from "next/link"
import Booking from "./booking"
import { motion } from 'framer-motion'

function index() {
  const Router = useRouter();
  const { slug } = Router.query;
  const [record, setRecord] = useState("");

  useEffect(() => {
    const main = new Listing();
    const response = main.userdetails(slug);
    response.then((res) => {
      setRecord(res?.data?.data);
    }).catch((error) => {
      console.log("error", error);
    });
  }, [slug]);

  const [activeTab, setActiveTab] = useState('Booking')

  return (
    <AdminLayout >
      <div className="bg-gray-300 antialiased">
      <div className="container mx-auto my-20">
        <div>
          <div className=" relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center">
              <img src={record?.image_url ? record?.image_url : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"} alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
            </div>
            
            <div className="mt-16">
              <h1 className="font-bold text-center  text-3xl text-white-900"> {record?.name}</h1>
              <p className="text-center text-sm text-white-400 font-medium">{record?.email}</p>
              <p className="text-center text-sm text-white-400 font-medium">{record?.phone_no}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='flex text-xl font-medium relative p-4 rounded-lg py-2'>
                <button onClick={() => setActiveTab('Booking')} className={`z-10 w-full px-4 py-2 ${activeTab === 'overview' ? '' : ''}`}>Booking</button>
                <button onClick={() => setActiveTab('payment')} className={`z-10 w-full  px-4 py-3   rounded-lg ${activeTab === 'payment' ? '' : ''}`}>Payment </button>
                <button onClick={() => setActiveTab('rewards')} className={`z-10 w-full px-2 py-2  ${activeTab === 'rewards' ? '' : ''}`}></button>

                <div className='absolute items-center px-1 top-0 left-0 w-full h-full flex'>
                    <motion.div
                        animate={{ x: activeTab === 'Booking' ? 0 : activeTab === 'rewards' ? '200%' : '100%' }}
                        className='w-1/3 bg-white border h-7 rounded-lg transform'
                    />
                </div>

        
            </div>

          <div className="
           container mx-auto ">
            {activeTab === 'Booking' && (
              <div className ="container mx-auto">
                <Booking record = {record?.id}/>
              </div>
            )}
            {activeTab === 'Payment' && (
              <div>
              </div>
            )}
            {activeTab === 'Rewards' && (
              <div>
              </div>
            )}
          </div>
    </AdminLayout>
  );
}

export default index;
