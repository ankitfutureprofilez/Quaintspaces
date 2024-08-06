import React, { useState, useEffect } from "react";
import AuthLayout from "../layout/AuthLayout";
import { formatMultiPrice } from "../../hooks/ValueData";
import { useRouter } from "next/router";
import Listings from "../api/laravel/Listings";
import toast from "react-hot-toast";
// import DateComponent from "../admin/hook/Dateformat";
import LoadingSpinner from "../admin/hook/spinner";
import { Link } from "iconsax-react";
import SuccessDate from "./SuccessDate";

function calculateTotalDays(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const differenceMs = checkOut - checkIn;
  const days = differenceMs / (1000 * 60 * 60 * 24);
  return Math?.round(days);
}

const success = () => {
  const [loading, setloading] = useState(false);
  const [record, setRecord] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("response");
    if (data) {
      const main = new Listings();
      handleSubmit(main, data);
    }
  }, []);

  const handleSubmit = (main, data) => {
    setloading(true);
    const parsedData = JSON.parse(data);
    const { razorpay_payment_id, razorpay_order_id } = parsedData;
    main
      .user_success_payment({
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      })
      .then((res) => {
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          setRecord(res?.data?.data);
          setloading(false);
        } else {
          toast.error(res?.data.message);
          setloading(false);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      });
  };

  const totalStay = calculateTotalDays(record?.check_in, record?.check_out);
  console.log("record", record)
  return (
    <AuthLayout>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className=" container mx-auto thankspage">
          <div className="pt-16 pb-16">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <linearGradient
                  id="5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1"
                  x1="9.858"
                  x2="38.142"
                  y1="9.858"
                  y2="38.142"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#efa3a3"></stop>
                  <stop offset="1" stop-color="#efa3a3"></stop>
                </linearGradient>
                <path
                  fill="url(#5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1)"
                  d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                ></path>
                <path
                  d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z"
                  opacity=".05"
                ></path>
                <path
                  d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z"
                  opacity=".07"
                ></path>
                <path
                  fill="#fff"
                  d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"
                ></path>
              </svg>
            </div>
            <h2 className=" text-center mt-4 ">
              Your Booking is Confirmed!
            </h2>
            <p className="text-[#efa3a3] text-center mt-2">
              We have sent your booking confirmation to your email address.
            </p>
            <div className=" pt-16 sm:text-xl text-sm   flex flex-wrap justify-center m-auto max-w-[600px]">
              <div className="w-full flex justify-between mb-4 flex-wrap  ">
                <p className="text-black-400 font-bold  capitalize">
                  Booking Number
                </p>
                <p className="text-start text-black-400 font-semibold">
                  {record?.booking_number}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  Booking Date{" "}
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  {record?.payment_date}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  Customer Name
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  {record?.name}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  Property Name
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  {record?.property_name ? (
                    `${record?.property_name}, Jaipur`
                  ) : (
                    <></>
                  )}{" "}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">Check in </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  <SuccessDate item=
                    {record?.check_in} />{" "}
                  {/* {DateComponent(record?.check_in)}{" "} */}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  Check out{" "}
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  <SuccessDate item=
                    {record?.check_out} />{" "}
                  {/* {DateComponent(record?.check_out)} */}
                </p>
              </div>

              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  Amount Paid
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  {formatMultiPrice(record?.price)}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  Total Members (Guests & infants)
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  {record?.guests} & {record?.infants}{" "}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  Total Pets
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  {record?.no_of_pet}
                </p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-black-400 font-bold capitalize">
                  no. of nights
                </p>
                <p className="text-start text-black-400 font-bold font-semibold">
                  {totalStay} Nights
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default success;
