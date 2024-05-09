import React, { useEffect, useState } from "react";
import Button from "../elements/Button";
import Heading from "../elements/Heading.js";
import { useRouter } from "next/router";
import Listings from "../api/laravel/Listings";
import Link from "next/link";
import AuthLayout from "../layout/AuthLayout.js";
import Modal from "../elements/Modal.js";
import NoData from "../elements/NoData.js";
import { formatMultiPrice } from "../../hooks/ValueData.js";
import Head from "next/head";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("upcoming");
  const [listings, setListings] = useState([]);
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState("All Dates");
  const [fetch, setFetch] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2023 },
    (_, index) => currentYear - index
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFetch(!fetch);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleGroupChange = (buttonType) => {
    setSelectedButton(buttonType);
  };

  const [hasmore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetching = async (pg) => {
      setLoading(true);
      let url = "";
    if (selectedOption === "All Dates") {
    } else if (selectedOption === "Last 30 Days") {
      url += "booking_time=thirty-day&";
    } else if (selectedOption === "Last 3 Months") {
      url += "booking_time=three_month&";
    } else if (selectedOption === "Last 1 Year") {
      url += "booking_time=after_one_year&";
    } else {
      url += `booking_year=${selectedOption}&`;
    }

    if (selectedButton === "upcoming") {
        url += "booking_event=upcoming&";
      } else if (selectedButton === "completed") {
        url += "booking_event=completed&";
      } else {
        url += "booking_status=cancelled&";
      }

    const main = new Listings();
    main
      .BookingHistory(pg, url)
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
      fetching(1);
  }, [selectedButton, fetch]);

  

  const loadMore = () => {
    if (!loading && page) {
      fetching(page + 1);
    }
  };


  const BookingTable = () => {
    return (
      <>
        {loading ? (
          <div className="flex items-center justify-center w-full h-full relative top-0 left-0 z-10 min-w-1200px">
            <div className="flex justify-center items-center space-x-1 text-gray-700">
              <div className="text-lg">Loading...</div>
            </div>
          </div>
        ) : (
          <>
            {listings && listings.length > 0 ? (
              <div className="table-responsive">
                <table className="table-fixed w-full booking-table">
                  <thead>
                    <tr>
                      <th>Booking Date</th>
                      <th>Title</th>
                      <th>Check In & Out</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {listings.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td className="px-4 py-2">{item?.booking_date}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <div className="text ml-2">
                              <div className="title capitalize ">
                                <Link href={`/property/${item?.booking_property?.uuid}`}>
                                  {item?.booking_property?.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2">{item?.check_in} || {item?.check_out}</td>
                        <td className="px-4 py-2 capitalize">
                          <Button
                            text={`${item?.booking_status}`}
                            design="font-inter capitalize text-blue-700 font-medium leading-tight text-center w-32 p-3 rounded-full"
                          />
                        </td>
                        <td className="px-4 py-2">
                          {formatMultiPrice(item?.price)}
                        </td>
                        <td className="px-4 py-2">
                          <Button
                            text="Cancel"
                            design="font-inter text-red-700 font-medium leading-tight text-center w-32 border-red-500 p-3 rounded-full"
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            ) : (
              <NoData
                Heading={"Booking History not found"}
                content={"You have not done any bookings yet. Click below to go to the home page"}
              />
            )}
          </>
        )}

        {hasmore && !loading && (
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
        <title>Bookings - QS Jaipur</title>
      </Head>
      <div className="container mx-auto">
        <div className=" account-btn ">
          <div className=" pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
            <Heading
              text={"My Booking"}
              value={"/account"}
              handleClick={() => router.back()}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="  flex align-items-center my-4 py-2 space-x-4 upcomming-box">
            <Button
              design={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${
                selectedButton === "upcoming"
                  ? "bg-orange-300 text-white"
                  : "text-black"
              }`}
              onClick={() => handleGroupChange("upcoming")}
              text={"Upcoming"}
            />

            <Button
              text={"Completed"}
              design={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${
                selectedButton === "completed"
                  ? "bg-orange-300 text-white"
                  : "text-black"
              } `}
              onClick={() => handleGroupChange("completed")}
            />

            <Button
              design={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${
                selectedButton === "cancelled"
                  ? "bg-orange-300 text-white"
                  : "text-black"
              } `}
              onClick={() => handleGroupChange("cancelled")}
              text={"Cancelled"}
            />
          </div>
          <div className="me-2 my-4 py-2">
            <button className="font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full bg-orange-300 text-white " onClick={openModal}>
              Filter By Booking Date
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
              <div className="mb-4 mt-10">
                {["All Dates", "Last 30 Days", "Last 3 Months", "Last 1 Year"].map((option) => (
                  <div key={option} className="mb-2">
                    <input
                      type="radio"
                      id={option}
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
                {years.map((year) => (
                  <div key={year} className="mb-2">
                    <input
                      type="radio"
                      id={`${year}`}
                      name="option"
                      value={`${year}`}
                      checked={selectedOption === `${year}`}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    <label htmlFor={`year${year}`}>{year}</label>
                  </div>
                ))}
              </div>
              <div className="mb-4 flex justify-center"></div>
            </Modal>
          </div>
        </div>

        <div className="">
          <BookingTable />
        </div>
      </div>
    </AuthLayout>
  );
}
