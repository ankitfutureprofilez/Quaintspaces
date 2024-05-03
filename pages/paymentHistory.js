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
import Head from "next/head";

export default function paymentHistory() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const router = useRouter();
  const [hasmore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const fetching = async(pg) =>{
    setLoading(true);
    const main = new Listings();
    main
      .PaymentHistory(pg)
      .then((r) => {
        setLoading(false);
        const newdata = r?.data?.data?.data|| [];
        setListings((prevData) => {
          if (pg === 1) {
            return newdata;
          } else {
            return [...prevData, ...newdata];
          }
        });
        setHasMore(r?.data?.current_page < r?.data?.last_page);
        setPage(r?.data?.current_page);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setHasMore(false);
        setPage(false);
        console.log(err);
      });
  } 

  useEffect(() => {
     if (listings && listings?.length < 1) {
      fetching(page + 1);
     }
  }, []);

  const loadMore = () => {
    if (!loading && page) {
      fetching(page + 1);
    }
  };

  const BookingTable = () => {
    return (
      <>
        <div className="table-responsive">
          <table className=" w-full booking-table">
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
                        <div className="text-gray-800 font-medium text-left capitalize">
                          {item?.booking_history?.booking_property?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item?.payment_date}</td>
                  <td className="px-4 py-2 text-sm">
                    {DateComponent(item?.booking_history?.check_in)}
                  </td>
                  <td className="px-4 py-2 capitalize">{item?.method}</td>
                  <td className="px-4 py-2 capitalize">{item?.status}</td>
                  <td className="px-4 py-2">{formatMultiPrice(item?.price)}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        {hasmore &&  (
                <div className="load-more mt-5 text-center ">
                  <button className="btn btn-outline-success" onClick={loadMore}>
                    Load More
                  </button>
                </div>
              )}
      </>
    );
  };

  return (
    <AuthLayout>
      <Head>
        <title>Payment History - QS Jaipur</title>
      </Head>
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
            <div className="flex items-center justify-center w-full h-full relative top-0 left-0 z-10 min-w-1200px">
            <div className="flex justify-center items-center space-x-1 text-gray-700">
              <div className="text-lg">Loading...</div>
            </div>
          </div>
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
