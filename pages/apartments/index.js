import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import RoomListings from "../home/RoomListings";
import Filter from "../home/Filter";
import { PostBody } from "../../components";
import Listings from "../api/laravel/Listings";
import format from "date-fns/format";
import Head from "next/head";
import PwaFooter from "../elements/PwaFooter.js"

export default function index() {
  // Sort By Button Logic
  const SortByButton = ({ sortBy, setSortBy, sortingOptions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (value) => {
      setSortBy(value);
      setIsOpen(false); // Close the dropdown after selecting an option
    };

    return (
      <div className="relative inline-block text-left">
        <Head>
          <title>Apartments | Best Properties in Town - QS Jaipur</title>
        </Head>
        <div>
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              className="sort btn flex mr-2 hover:bg-[#c48b58] hover:border-[#c48b58] hover:text-[#fff]"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Sort by:{" "} */}
              {sortingOptions.find((option) => option.key === sortBy).label}
              {/* Icon to indicate dropdown */}
              <svg
                className="-mr-1 mt-1.3 sml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className="sortlist "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              {sortingOptions.map((option) => (
                <button
                  key={option.key}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 w-32"
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility
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
    if(lowPrice!=null){
      url+=`min_price=${lowPrice}` + `&`;
    }
    if(highPrice!=null){
      url+=`max_price=${highPrice}`+ `&`;
    }
    if (selectedDay != null) {
      url +="check_in="+ format(selectedDay, "yyyy-MM-dd")+"&";
    }
    if (selectEnd != null) {
      url +="check_out="+ format(selectEnd, "yyyy-MM-dd")+"&";
    }
    if (sortBy == "popularity") {
      url += "popularity_sort=desc";
    } else if (sortBy == "rating") {
      url += "rating_sort=desc";
    } else if (sortBy == "priceLow") {
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
          data.forEach(item => {
            if (item?.status === 1 ) {
              filteredListings.push(item);
            }
          });
        }
  
        if (filteredListings.length > 0) {
          setListings(filteredListings);
          console.log(filteredListings);
        } else {
          console.log("No listings match the status and step conditions.");
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
      <div className="container mx-auto ">
        <div className="mt-6 sm:mt-10">
          <div className="flex justify-between mb-10 filter-box">
            <h2 className="listing-heading text-left">
              Explore our Apartments
            </h2>
            <div className="button-group filter-btn-select">
              <SortByButton
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortingOptions={sortingOptions}
              />
              {/* Filter button to open the modal */}
              <button className="filter btn ms-2 hover:bg-[#fff] border-[#c48b58] hover:text-[#c48b58] border-2 text-[14px]" onClick={openModal}>
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
          <div className="bg-white pb-2 pt-4 sm:p-6 rounded-lg shadow-lg filter-popup">
            <div className="relative ">
              <h2 className="listing-heading  text-center">Filter</h2>
              <div className="absolute top-0 right-0">
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
              min={1}
              max={20001}
              onClick={handleClick}
              onChange={({ min, max }) => {
                minVal = min;
                maxVal = max;
                // setLowPrice(min);
                // setHighPrice(max);
                // console.log(`min = ${min}, max = ${max}`);
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
