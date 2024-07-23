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
import { toast } from "react-hot-toast";
import DateComponent from "../elements/DateFormat.jsx";
import { TableLoading } from "../../components/Loading/ListingsLoading.jsx";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("upcoming");
  const [listings, setListings] = useState([]);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("All Dates");
  const [fetch, setFetch] = useState(false);
  const [SelectBooking, SetSelectBooking] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [refend, setRefend] = useState("")
  const [houseRule, SetHouseRules] = useState({})
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 2023 },
    (_, index) => currentYear - index
  );

  const handleHouseRules = (uuid) => {
    if (!uuid || !uuid.id || !uuid.properties_id) {
      console.error("Invalid UUID object");
      return;
    }
    handleSubmit({
      booking_id: uuid.id,
      property_id: uuid.properties_id,
    });
    setIsConfirmOpen(true);
  };


  const handleSubmit = (houseBook) => {
    const main = new Listings();
    const response = main.user_house_rule(houseBook);
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          SetHouseRules(res?.data?.data)
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        }
        setLoading(false); // Ensure setLoading is defined in your component's state
      });
  };



  const handleCanceled = (uuid) => {
    SetSelectBooking(uuid);
    setAmount()
    setShowConfirmation(true);
    setRefend(uuid?.refund_amount);
  };
  const [amount, setAmount] = useState(0); // Initialize with a default value

  useEffect(() => {
    if (SelectBooking && SelectBooking.booking_property && SelectBooking.days_difference) {
      const calculatedAmount = SelectBooking.booking_property.cleaning_fee * SelectBooking.days_difference;
      setAmount(calculatedAmount);
    }
  }, [SelectBooking]);
  const handleConfirmation = () => {
    cancelBooking(SelectBooking?.id,amount);
    setShowConfirmation(false);
  };

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

  const handleCancel = () => {
    setShowConfirmation(false);
    setIsConfirmOpen(false);
  };

  const handleGroupChange = (buttonType) => {
    setSelectedButton(buttonType);
  };

  const [hasmore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [key, setKey] = useState("")
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
    } else if (selectedButton === "ongoing") {
      url += "booking_event=ongoing&";
    }
    else {
      url += "booking_event=cancelled&";
    }

    const main = new Listings();
    main
      .BookingHistory(pg, url)
      .then((r) => {
        setLoading(false);
        setKey(r?.data?.request_key);
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


  // booking-cancel/42

  const cancelBooking = async (id,amount) => {
    setLoading(true);
    const main = new Listings();
    const response = main.Booking_cancel(id,amount);
    try {
      const res = await response;
      if (res?.data?.status === true) {
        toast.success(res?.data?.message);
        fetching(page);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while canceling the booking.");
    } finally {
      setLoading(false);
    }
  };
  


  const loadMore = () => {
    if (!loading && page) {
      fetching(page + 1);
    }
  };


  const BookingTable = () => {
    return (
      <>
        {loading ? (
          <TableLoading/>
        ) : (
          <>
            {listings && listings.length > 0 ? (
              <div className="table-responsive">
                <table className="table-fixed w-full booking-table">
                  <thead>
                    <tr>
                      <th>Booking Date</th>
                      <th>Booking Number</th>
                      <th>Property Name</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                      <th>Price</th>
                      {(key ==="upcoming") && <th>Action</th>}
                      {/* {} */}
                      {key === "ongoing" &&
                        <th>House details</th>}
                    </tr>
                  </thead>
                  {listings.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td className="px-4 py-2">
                          <DateComponent item=
                            {item?.booking_date} />
                        </td>
                        <td className="px-2 md:px-4 py-2"><div className="flex items-center"><div className="text ml-2"><div className="title">{item?.booking_number}</div></div></div></td>
                        <td className="px-2 md:px-4 py-2">
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
                        <td className="px-4  md:px-4 py-2">
                          <DateComponent item=
                            {item?.check_in} /> </td>
                        <td className="px-2 py-2 md:px-4">
                          <DateComponent item=
                            {item?.check_out} />
                        </td>

                        <td className="px-2 py-2 md:px-4 ">
                          <td
                            className={`capitalize inline-flex items-center rounded-full py-3 w-max px-4 text-xs text-white  ${item?.booking_status === "completed"
                              ? "bg-green-700"
                              : item?.booking_status === "cancelled"
                                ? "bg-red-600"
                                : item?.booking_status === "confirmed"
                                  ? "bg-green-600"
                                  : item?.booking_status === "pending"
                                    ? "bg-slate-600"
                                    : "bg-blue-600"
                              }`}
                          >
                            {item?.booking_status}
                          </td>
                        </td>
                        <td className="px-2 py-2 md:px-4">
                          <div>

                          {formatMultiPrice(item?.price)}
                          </div>
                        </td>
                        {key === "upcoming" &&
                          (
                            <td className="px-2 py-2 md:px-4">
                              {

                                item?.booking_status !== "cancelled" ? (
                                  <button
                                    className="font-inter text-red-700 font-medium leading-tight text-center px-5 border-red-500 p-3 rounded-full"
                                    onClick={() => handleCanceled(item)}
                                  >
                                    {loading ? ("loading") : ("Cancel")}
                                  </button>
                                ) : (
                                  <p className="title capitalize">
                                    AllReady Taken
                                  </p>
                                )
                              }


                            </td>)}
                        {key === "ongoing" &&
                          <td className="px-2 py-2 md:px-4">
                            <span className="text-4xl ml-1" style={{ cursor: "pointer" }} onClick={() => handleHouseRules(item)}>🛈</span>
                          </td>}
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            ) : (
              <NoData
                url={"/apartments"}
                Heading={"Booking History Not Found"}
                content={
                  selectedButton === "cancelled" ? (
                    "You have not cancelled any booking yet."
                  ) : (
                    "You have not made any bookings yet. Please click the link below to visit the apartment page."
                  )}

              />
            )}
          </>
        )}

        {hasmore && !loading && (
          <div className="load-more mt-5 text-center ">
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
        <title>Bookings - Quaintspaces </title>
      </Head>
      <div className="container mx-auto">
        <div className=" account-btn ">
          <div className=" pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
            <Heading
              text={"My Booking "}
              value={"/account"}
              handleClick={() => router.back()}
            />
          </div>
        </div>

        <div className="flex  flex-col md:flex-row justify-between mb-6">
          <div className="flex-wrap  flex align-items-center py-2 sm:space-x-4 space-x-1 upcomming-box">
            <Button
              design={`font-inter text-gray-400 font-medium sm:text-[16px] text-[14px] leading-tight text-center lg:w-52 px-4 border-2 p-3 mb-2 rounded-full ${selectedButton === "upcoming"
                ? "bg-orange-300 text-white"
                : "text-black"
                }`}
              onClick={() => handleGroupChange("upcoming")}
              text={"Upcoming"}
            />
            <Button
              text={"Completed"}
              design={`font-inter text-gray-400 font-medium sm:text-[16px] text-[14px] leading-tight text-center lg:w-52 px-4 border-2 p-3 mb-2 rounded-full ${selectedButton === "completed"
                ? "bg-orange-300 text-white"
                : "text-black"
                } `}
              onClick={() => handleGroupChange("completed")}
            />
            <Button
              design={`font-inter text-gray-400 font-medium sm:text-[16px] text-[14px] leading-tight text-center lg:w-52 px-4 border-2 p-3 mb-2 rounded-full ${selectedButton === "cancelled"
                ? "bg-orange-300 text-white"
                : "text-black"
                } `}
              onClick={() => handleGroupChange("cancelled")}
              text={"Cancelled"}
            />
            <Button
              design={`font-inter text-gray-400 font-medium sm:text-[16px] text-[14px] leading-tight text-center lg:w-52 px-4 border-2 p-3 mb-2 rounded-full ${selectedButton === "ongoing"
                ? "bg-orange-300 text-white"
                : "text-black"
                } `}
              onClick={() => handleGroupChange("ongoing")}
              text={"Ongoing"}
            />
          </div>
          <div className=" py-2">
            <button className="font-inter text-[#fff] sm:text-[16px] text-[14px] bg-[#efa3a3] font-medium leading-tight text-center border-[#efa3a3] lg:w-[auto] px-6 border-2 p-3 rounded-full " onClick={openModal}>
              Filter By Booking Date
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
              <p className="text-lg text-white font-semibold p-6 py-4 bg-[#efa3a3]">
                Filter By Booking Date
              </p>
              <div className=" ">
                {["All Dates", "Last 30 Days", "Last 3 Months", "Last 1 Year"].map((option) => (
                  <div key={option} className="px-6 py-2">
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
                <div className="px-6 py-2">
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
              </div>
              <div className="mb-4 flex justify-center"></div>
            </Modal>
          </div>
        </div>

        <div className="tble-ma">
          <BookingTable />
        </div>
      </div>

      {
        showConfirmation && (
          <Modal isOpen={showConfirmation} onClose={handleCancel}>
            <p className="text-lg text-white font-semibold p-6 py-4 bg-[#efa3a3]">
              Are you sure you want to cancel your booking?
            </p>
            <p className="text-xl text-center font-semibold  py-8  capatalize">
              <div>
                {refend === 0 ? (
                  <>

                    <h2>
                      Only the cleaning fee will be refunded:

                    </h2>
                    <span className="text-green-600">
                      {formatMultiPrice(SelectBooking?.booking_property?.cleaning_fee * SelectBooking?.days_difference)}
                    </span>.
                  </>

                ) : (
                  <div>
                    Your Refunded amount is <span className="text-green-600">{formatMultiPrice(refend)}</span>
                  </div>
                )}
              </div>

            </p>

            <div className="flex justify-center mb-5">
              <button
                className="bg-red-600 text-white px-2 py-2 md:px-4 rounded-md mr-2 hover:bg-red-700"
                onClick={handleConfirmation}
              >
                Cancel Booking
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-2 py-2 md:px-4 rounded-md hover:bg-gray-400"
                onClick={handleCancel}
              >
                Back
              </button>
            </div>
          </Modal>
        )
      }
      {
        isConfirmOpen && (
          <Modal isOpen={isConfirmOpen} onClose={handleCancel}>
            <p className="text-lg text-white font-semibold p-6 py-4 bg-[#efa3a3]">
              House Rules
            </p>
            <div className="p-6 overflow-auto">
              {(houseRule?.check_in) ?
                (
                  <>
                    <p className="text-sm  font-normal  mb-4 ">
                      <span className="font-bold">
                        Wifi-Username :-
                      </span>
                      {houseRule?.property_details?.property_rule?.wifi_username}
                    </p>
                    <p className="text-sm  font-normal  mb-4 capatalize">
                      <span className="font-bold">
                        Password :-
                      </span>
                      {houseRule?.property_details?.property_rule?.wifi_password}
                    </p>

                    <p className="text-sm  font-normal  mb-4">
                      <span className="font-bold">
                        house manuals :-
                      </span>
                      {houseRule?.property_details?.property_rule?.house_manuals}
                    </p>
                  </>
                ) : (
                  <>
                  </>
                )}
              {houseRule?.booking_date ?
                (
                  <>
                    <p className="text-sm  font-normal  mb-4">
                      <span className="font-bold">
                        Direction :-
                      </span>
                      {houseRule?.property_details?.property_rule?.direction}
                    </p>
                    <p className="text-sm  font-normal  mb-4">
                      <span className="font-bold">
                        check-in method:-
                      </span>
                      <span>
                        {houseRule?.property_details?.check_in_method} &nbsp;
                      </span>
                      and  {houseRule?.property_details?.check_in_description}
                    </p>
                  </>
                ) : (
                  <p> Show in check in Date  </p>)}
              {(houseRule?.check_out) ?
                (
                  <>
                    <p className="text-sm  font-normal  mb-4">
                      <span className="font-bold">
                        Direction :-
                      </span>
                      {houseRule?.property_details?.property_rule?.direction}
                    </p>
                  </>
                ) : (
                  <> </>)}

            </div>
          </Modal>
        )
      }
    </AuthLayout>
  );
}
