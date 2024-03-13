import React from 'react'
import { useEffect, useState } from "react";
import Star from "../../public/_svgs/star"
import Heading from '../elements/Heading';
import Button from '../elements/Button';
export default function Confirm() {
  const [dateModel, setDateModel] = useState(false);

  const [formData, setFormData] = useState({
    selectOption: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      file: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <main className="max-w-[1150px] min-h-screen py-[3.6rem] mx-auto">
        <Heading text={"Confirm and pay"} />
        <div className="flex mt-14 px-3 gap-10">
          <div className="w-8/12">
            <h1 className="text-xl mb-4 font-medium">Your trip</h1>
            <div className="flex items-center justify-between w-full py-2">
              <div>
                <h5 className="text-lg text-blackColor font-medium">Dates</h5>
                {/* <h5 className="text-md text-blackColor">{infos.checkin && infos.checkout ?
  `${format(new Date(infos.checkin), "MMM dd")} - ${format(new Date(infos.checkout), "MMM dd")}`
  : "Dates not specified"}</h5> */}
                <h5 className="text-md text-blackColor"> 9 Apr - 15 may</h5>

              </div>
              <button
                onClick={() => setDateModel(true)}
                className="underline text-md font-medium"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
              <div>
                <h5 className="text-lg text-blackColor font-medium">Guests</h5>
                {/* <h5 className="text-md text-blackColor">
                  {`${+infos.numberOfAdults + +infos.numberOfChildren} guests ${
                    +infos.numberOfInfants
                      ? ", " + infos.numberOfInfants + " infants"
                      : ""
                  } ${
                    +infos.numberOfPets
                      ? ", " + infos.numberOfPets + " pets"
                      : ""
                  }`}
                </h5> */}
                <h5 className="text-md text-blackColor">
                  1 Guest
                </h5>
              </div>
              <button
                onClick={() => setGuestsModel(true)}
                className="underline text-md font-medium"
              >
                Edit
              </button>
            </div>
            <h1 className="text-xl mb-4 font-medium mt-5">Upload ID</h1>
            <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
              <div className="grid grid-cols-2">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="selectOption" className="block text-lg font-medium text-gray-700">
                      Select Option
                    </label>
                    <select
                      id="selectOption"
                      name="selectOption"
                      value={formData.selectOption}
                      onChange={handleChange}
                      className="mt-1 p-4 border rounded-full w-full"
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="fileUpload" className="block text-lg font-medium text-gray-700">
                      Upload File
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      name="fileUpload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="mt-1 p-4 border rounded-full w-full"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <h1 className="text-xl mb-4 font-medium mt-5">Required for your trip</h1>
            <div className='flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor'>

              <div className="ml-3 mt-4">
                <h1 className="text-lg ">
                  Message the host
                </h1>
                <div className="flex flex-wrap justify-between">
                  <p>Share why you're travelling, who's coming with you and what you love about the space.
                  </p>
                  <p style={{ color: "#DCAC81", borderColor: "#DCAC81" }} className="border-solid border-b-2">
                    ADD
                  </p>
                </div>

                <h1 className="text-lg ">
                  Phone number
                </h1>
                <div className="flex flex-wrap justify-between">
                  <p>
                    Add and confirm your phone number to get trip updates.
                  </p>
                  <p style={{ color: "#DCAC81", borderColor: "#DCAC81" }} className="border-solid border-b-2">
                    ADD
                  </p>
                </div>
              </div>

            </div>
          <div className='flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor'>
            <div className="ml-3 mt-4">
              <h1 className="text-lg ">
              Cancellation policy
              </h1>
              <div className="flex flex-wrap ">
                <p>Share whThis reservation is non-refundable.
                </p>
                <p style={{ color: "#DCAC81", borderColor: "#DCAC81" }} className="border-solid border-b-2">
                Learn More
                </p>
              </div>
            </div>
          </div>
          </div>
          <div className="w-5/12 border border-borderColor rounded-xl shadow p-8">
            <div className="flex gap-3 pb-4 border-b border-borderColor">
              <img src="https://a0.muscache.com/im/pictures/ed3c3933-428a-435b-9161-196722bcf63d.jpg?aki_policy=large" alt="aa" />
              {/* <img
                src={
                  listing?.images?.length > 0
                    ? listing.images[0].url
                    : "https://a0.muscache.com/im/pictures/ed3c3933-428a-435b-9161-196722bcf63d.jpg?aki_policy=large"
                }
                className="w-32 h-28 rounded-lg object-cover"
              /> */}
              <div>
                <h4 className="text-md mb-1">Luxurious Boutique 2BHK Flat in Bani Park, Jaipur</h4>
                <span className="flex text-sm items-center gap-1">
                  <span>
                    <Star />
                  </span>
                  <span>
                    4.5 (141 reviews)
                    {/* {listing?.rating || "4.5"} ({listing?.reviews_length || 141} reviews) */}
                  </span>
                </span>
              </div>
            </div>
            <div className="py-4 border-b border-borderColor">
              <h1 className="text-xl font-semibold">Price Details</h1>{" "}
              <div className="flex gap-3 mt-2">
                <div className="flex items-center justify-between w-full">
                  <span className="block text-blackColor">
                    {/* {listing?.price} x
                    {` ${
                      infos.checkout &&
                      infos.checkin &&
                      differenceInDays(
                        new Date(infos.checkout),
                        new Date(infos.checkin)
                      )
                    } `} */}
                    nights
                  </span>
                  <span className="block text-blackColor font-medium">
                    $
                    {/* {infos.checkout &&
                      infos.checkin &&
                      +listing?.price?.split("$")[1] *
                        differenceInDays(
                          new Date(infos.checkout),
                          new Date(infos.checkin)
                        )} */}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between">
              <span className="text-md font-semibold">Total(USD)</span>
              <span className="text-md font-medium">
                $
                {/* {infos.checkout &&
                  infos.checkin &&
                  +listing?.price?.split("$")[1] *
                    differenceInDays(
                      new Date(infos.checkout),
                      new Date(infos.checkin)
                    )} */}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
