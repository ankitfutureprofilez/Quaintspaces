import React, { useEffect, useState } from "react";
import Button from "../elements/Button";
import Heading from "../elements/Heading";
import { useRouter } from "next/router";
import Listings from "../api/laravel/Listings";
import AuthLayout from "../layout/AuthLayout.js";
import Modal from "../elements/Modal.js";

export default function index() {
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
    console.log(event.target.value)
  };

  const handleClick = (event) => {
    setFetch(!fetch);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleGroupChange = (e) => {
    setSelectedButton(e);
  };

  useEffect(() => {
    let url = "";

    if(selectedOption=="All Dates"){}
    if(selectedOption=="Last 30 Days"){url+="booking_time=thirty-day&"}
    else if(selectedOption=="Last 3 Months"){url+="booking_time=three_month&"}
    else if(selectedOption=="Last 3 Months"){url+="booking_time=three_month&"}
    else if(selectedOption=="Last 1 Year"){url+="booking_time=after_one_year&"}
    else {url+=`booking_year=${selectedOption}&`}

    if (selectedButton === "upcoming") {url += "booking_event=upcoming&";} 
    else if (selectedButton === "completed") {url += "booking_event=completed&";}
    else {url += "booking_status=canceled&";}
    const main = new Listings();
    main
      .BookingHistory(url)
      .then((r) => {
        setListings(r.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedButton, fetch]);

  const BookingTable = () => {
    return (
      <div className="table-responisve">
        <table className="table-fixed w-full booking-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Check In</th>
              <th>Check Out </th>
              <th>Status </th>
              <th>Price </th>
              <th>Action </th>
            </tr>
          </thead>
          {listings &&
            listings.map((item) => (
              <tbody>
                <tr className="">
                  <td className="flex items-center">
                    {/* <img src="image_source" alt="alt" /> */}
                    <div className="text ml-2">
                      <div class="title">{item?.booking_property?.name}</div>
                      {/* <div class="description">2bhk_description</div> */}
                    </div>
                  </td>
                  <td className="px-4 py-2">{item?.check_in}</td>
                  <td className="px-4 py-2">{item?.check_out}</td>
                  <td className="px-4 py-2">
                    <Button
                      text={`${item?.booking_status}`}
                      design={
                        "font-inter text-blue-700 font-medium leading-tight text-center w-32 p-3 rounded-full "
                      }
                    />
                  </td>
                  <td className="px-4 py-2">{item?.price}</td>
                  <td className="px-4 py-2">
                    {" "}
                    <Button
                      text={"Cancel"}
                      design={
                        "font-inter text-red-700 font-medium leading-tight text-center w-32  border-red-500 p-3 rounded-full "
                      }
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    );
  };
  return (
    <div>
      <AuthLayout>
        <div className="container mx-auto account-btn ">
          <div className=" pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
            <Heading
              text={"My Booking"}
              value={"/account"}
              handleClick={() => router.back()}
            />
          </div>
        </div>

        <div className="flex me-10">
          <div className=" container mx-auto flex align-items-center my-4 mx-4 py-2 space-x-4 upcomming-box">
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
                selectedButton === "canceled"
                  ? "bg-orange-300 text-white"
                  : "text-black"
              } `}
              onClick={() => handleGroupChange("canceled")}
              text={"Canceled"}
            />
          </div>
          <div className="me-2 my-4 py-2">
            <button className="filter btn ms-2 w-[146px]" onClick={openModal}>
              Filter By Date
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
              {/* <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-4 p-4"
              > */}
              <div className="mb-4 mt-10">
                <h1 className="listing-heading mb-2">Select an option</h1>
                {[
                  "All Dates",
                  "Last 30 Days",
                  "Last 3 Months",
                  "Last 1 Year",
                ].map((option) => (
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
              <div className="mb-4 flex justify-center">
                <button
                  type="submit"
                  className="filter btn"
                  onClick={handleClick}
                >
                  Submit
                </button>
              </div>
              {/* </form> */}
            </Modal>
          </div>
        </div>

        {/* {selectedButton === "upcoming" && ( */}
        <div className="container mx-auto">
          <BookingTable />
        </div>

        {/* {selectedButton === "completed" && (
        <div className="container mx-auto">2ccompleted</div>
      )}
      {selectedButton === "canceled" && (
        <div className="container mx-auto">3</div>
      )} */}
      </AuthLayout>
    </div>
  );
}
