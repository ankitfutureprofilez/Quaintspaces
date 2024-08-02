import React, { useEffect, useState } from "react";
import Heading from "./elements/Heading.js";
import { useRouter } from "next/router";
import Listings from "./api/laravel/Listings.js";
import AuthLayout from "./layout/AuthLayout.js";
import NoData from "./elements/NoData.js";
import Link from "next/link";
import { formatMultiPrice } from "../hooks/ValueData.js";
import Head from "next/head";
import { TableLoading } from "../components/Loading/ListingsLoading.jsx";
import Moment from 'moment';

export default function paymentHistory() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetching = async (pg) => {
    setLoading(true);
    const main = new Listings();
    main
      .PaymentHistory(pg)
      .then((r) => {
        setLoading(false);
        const newdata = r?.data?.data?.data || [];
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
  };

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


  
  const formatDateTime = (datetime) => {
    const date = Moment(datetime).format('D MMMM YYYY');
    const time = Moment(datetime).format('h:mm A');
    return (
      <div>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{date}</div>
        <div className="text-center whitespace-nowrap overflow-hidden text-ellipsis">{time}</div>
      </div>
    );
  };



  const BookingTable = () => {
    return (
      <>
        <div className="table-responsive">
          <table className="w-full booking-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Property Name</th>
                <th>Payment Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Method</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            {listings?.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td className="px-2 md:px-4 py-2">
                    <div className="flex items-center">
                      <div className="text ml-2">
                        <div className="title">{item?.payment_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <div className="items-center img-data flex gap-2 text-base">
                      <div className="text-gray-800 font-medium text-left capitalize">
                        <div className="title">
                          <Link href={`/property/${item?.booking_history?.booking_property?.uuid}`}>
                            {item?.booking_history?.booking_property?.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2 text-sm">
                    {formatDateTime(item?.payment_date)}
                  </td>
                  <td className="px-2 md:px-4 py-2 text-sm">
                    {formatDateTime(item?.booking_history?.check_in)}
                  </td>
                  <td className="px-2 md:px-4 py-2 text-sm">
                    {formatDateTime(item?.booking_history?.check_out)}
                  </td>
                  <td className="px-2 md:px-4 py-2 capitalize">
                    <div>
                      {item?.method}
                    </div>
                  </td>
                  <td className={`px-2 md:px-4 py-2 capitalize font-bold ${item?.payment_status === "success" ? "text-green-600" : "text-red-600"}`}>
                    {item?.payment_status}
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <div>
                      {formatMultiPrice(item?.price)}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        {hasMore && (
          <div className="load-more mt-5 text-center">
            <button className="btn btn-outline-success cursor-pointer" onClick={loadMore}>
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
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <title>Payment History - Quaintspaces Jaipur</title>
      </Head>
      <div className="container mx-auto">
        <div className="account-btn">
          <div className="pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
            <Heading text={"Payment History"} handleClick={() => router.back()} />
          </div>
        </div>
        <div className="tble-ma">
          {loading ? (
            <TableLoading />
          ) : listings && listings.length > 0 ? (
            <BookingTable />
          ) : (
            <NoData
              url={"/apartments"}
              Heading={"No Data Found"}
              content={"You have not done any payment yet. Click below to go to the page"}
            />
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
