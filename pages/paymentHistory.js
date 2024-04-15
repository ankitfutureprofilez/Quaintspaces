import React, { useEffect, useState } from "react";
import Button from "./elements/Button.js";
import Heading from "./elements/Heading.js";
import { useRouter } from "next/router";
import Listings from "./api/laravel/Listings.js";
import AuthLayout from "./layout/AuthLayout.js";
import Modal from "./elements/Modal.js";
import NoData from "./elements/NoData.js";
import { formatMultiPrice } from "../hooks/ValueData.js";
import Image from "next/image";
import DateComponent from "./admin/hook/Dateformat.jsx";

export default function paymentHistory() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const main = new Listings();
    main
      .PaymentHistory()
      .then((r) => {
        setLoading(false);
        setListings(r?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // console.log("listings", listings);
  }, []);
  // {listings && listings.length > 0 ? ():()
  const BookingTable = () => {
    return (
      <>
        {/* {listings && listings.length > 0 ? ( */}
        <div className="table-responsive">
          <table className="table-fixed w-full booking-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Property</th>
                <th>Payment Date</th>
                <th>Check In</th>
                <th>Method</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            {listings?.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div className="text ml-2">
                        <div className="title">{item?.payment_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {" "}
                    <div className="items-center flex gap-2 text-base">
                      <Image
                        width={35}
                        height={35}
                        className="top-2 right-2 p-1 rounded-full"
                        src={
                          item?.booking_history?.booking_property
                            ?.property_image[0]?.image_url
                        }
                        alt="Property"
                      />
                      <div>
                        <div className="text-gray-800 font-medium text-left">
                          {item?.booking_history?.booking_property?.name}
                        </div>
                        {/* <div className="text-sm">
                          {
                            item?.booking_history?.booking_property
                              ?.properties_type
                          }
                        </div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item?.payment_date}</td>
                  <td className="px-4 py-2 text-sm">
                    {DateComponent(item?.booking_history?.check_in)}
                  </td>
                  <td className="px-4 py-2">{item?.method}</td>
                  <td className="px-4 py-2">{item?.status}</td>
                  <td className="px-4 py-2">{formatMultiPrice(item?.price)}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {/* ) : ( */}
        {/* )} */}
      </>
    );
  };

  return (
    <AuthLayout>
      <div className="container mx-auto">
        <div className=" account-btn ">
          <div className=" pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
            <Heading
              text={"Payment History"}
              handleClick={() => router.back()}
            />
          </div>
        </div>
        <div className="">
          {loading ? (
            <p>loading...</p>
          ) : listings && listings.length > 0 ? (
            <BookingTable />
          ) : (
            <NoData
              Heading={"No Data Found"}
              content={
                "You have not done any payment yet. Click below to go to the home page"
              }
            />
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
