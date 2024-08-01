import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import RoomListings from "../home/RoomListings";
import Filter from "../home/Filter";
import { PostBody } from "../../components";
import { FaAngleDown } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import Listings from "../api/laravel/Listings";
import format from "date-fns/format";
import Head from "next/head";
import PwaFooter from "../elements/PwaFooter.js";
import Modal from "../elements/Modal.js";

export default function Index() {
  // Sort By Button Logic
  const SortByButton = ({ sortBy, setSortBy, sortingOptions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (value) => {
      setSortBy(value);
      setIsOpen(false); // Close the dropdown after selecting an option
    };

    return (
      <div className="relative inline-block w-full sm:w-auto max-w-[50%] text-left sm:text-center">
      <Head>
        <title>Apartments | Best Properties in Town - Quaintspaces Jaipur</title>
      </Head>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="sort w-full btn flex items-center justify-center sm:justify-start mr-2 hover:bg-[#efa3a3] hover:border-[#efa3a3] hover:text-[#fff]"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            {sortingOptions.find((option) => option.key === sortBy).label}
            {/* Icon to indicate dropdown */}
            <IoChevronDownSharp className="-mr-1 ml-[0.25rem] mt-[3.5px] h-4 w-4" />
          </button>
        </span>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="sortlist absolute right-0 mt-2 w-56 text-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1 sm:text-center" role="none">
            {sortingOptions.map((option) => (
              <button
                key={option.key}
                className="block w-full text-left px-4 py-2 text-sm sm:text-center text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => handleSortChange(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
    );
  };

  let minVal, maxVal;

  const [sortBy, setSortBy] = useState("popularity");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);// State variable for modal visibility
  const [lowPrice, setLowPrice] = useState(null);
  const [highPrice, setHighPrice] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [selection, setSelection] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectEnd, setSelectEnd] = useState(null);

  const sortingOptions = [
    { key: "popularity", label: "Popularity" },
    { key: "priceLow", label: "Low to High" },
    { key: "priceHigh", label: "High to Low" },
    { key: "rating", label: "Rating" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    setLowPrice(minVal);
    setHighPrice(maxVal);
    setFetch(!fetch);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [loading, setloading] = useState(false);
  const [listings, setListings] = useState([]);

  async function fetchLists() {
    setloading(true);
    let url = "";
    if (lowPrice != null) {
      url += `min_price=${lowPrice}&`;
    }
    if (highPrice != null) {
      url += `max_price=${highPrice}&`;
    }
    if (selectedDay != null) {
      url += "check_in=" + format(selectedDay, "yyyy-MM-dd") + "&";
    }
    if (selectEnd != null) {
      url += "check_out=" + format(selectEnd, "yyyy-MM-dd") + "&";
    }
    if (sortBy === "popularity") {
      url += "popularity_sort=desc";
    } else if (sortBy === "rating") {
      url += "rating_sort=desc";
    } else if (sortBy === "priceLow") {
      url += "price_sort=asc";
    } else {
      url += "price_sort=desc";
    }

    const main = new Listings();
    main
      .PropertyListing(url)
      .then((r) => {
        const data = r?.data?.data;
        let filteredListings = [];

        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item?.status === 1) {
              filteredListings.push(item);
            }
          });
        }

        if (filteredListings.length > 0) {
          setListings(filteredListings);
        } else {
          setListings(filteredListings);
        }

        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchLists();
    return () => controller.abort();
  }, [sortBy, fetch]);




  return (
    <Layout>
      <PwaFooter />
      <div className="container mx-auto">
        <div className="mt-6 sm:mt-10">
          <div className="items-center flex-row sm:flex justify-between mb-10 filter-box">
            <h2 className="listing-heading text-left font-bold pb-4 sm:pb-0">Our Properties</h2>
            <div className="w-full sm:w-auto button-group filter-btn-select sm:justify-end flex">
              <SortByButton
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortingOptions={sortingOptions}
              />
              <button
                className="w-full max-w-[50%] filter btn ms-2 hover:bg-[#fff] border-[#efa3a3] hover:text-[#efa3a3] border-2 text-[14px]"
                onClick={openModal}
              >
                Filter
              </button>
            </div>
          </div>
          <PostBody loading={loading} listings={listings} />
        </div>
      </div>
      {/* Render the modal component conditionally */}
            {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
<<<<<<< HEAD
          <div className="bg-white pb-2 sm:pb-6 rounded-lg shadow-lg filter-popup">
            <div className="relative pt-4 bg-[#efa3a3] text-[#ffff]">
              <h2 className="p-2 text-[#fff] align-center text-center text-2xl font-medium bg-[#efa3a3]">Filter</h2>
=======
          <div className="bg-white pb-2 sm:pb-6 rounded-lg shadow-lg filter-popup overflow-hidden">
            <div className="relative bg-[#9e8383] text-[#ffff]">
              <h2 className="p-3 bg-[#c48b58] text-[#fff] align-center text-center text-2xl font-medium bg-[#efa3a3]">Filter</h2>
>>>>>>> b7e87b28f0af3aefc0c0ea107568c2f02fad01fb
              <div className="absolute top-[18px] right-[18px]">
                <button
                  className="text-[#ffff]"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <Filter
              selection={selection}
              setSelection={setSelection}
              selectedDay={selectedDay}
              selectEnd={selectEnd}
              setSelectedDay={setSelectedDay}
              setSelectEnd={setSelectEnd}
              min={0}
              max={20000}
              onClick={handleClick}
              onChange={({ min, max }) => {
                minVal = min;
                maxVal = max;
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}


{/**/ }