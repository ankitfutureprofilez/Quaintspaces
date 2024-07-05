import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { House, Add } from "iconsax-react";

import {
  FaBuilding,
  FaHome,
  FaWarehouse,
  FaDoorOpen,
  FaHotel,
  FaBed,
  FaCouch,
} from "react-icons/fa";

const propertyTypes = [
  { value: "flat", label: "Flat & Apartment" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "farm", label: "Farm" },
  { value: "breakfast", label: "Bed & Breakfast" },
];

export default function Edit() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [editguide, setEditguide] = useState("space");
  const [record, setRecord] = useState({
    loading: true,
    data: {},
  });

  console.log("record",record)
  const fetchProperty = async (slug) => {
    if (slug) {
      setLoading(true);
      const main = new Listing();
      try {
        const response = await main.viewproperty(slug || "");
        setRecord({
          loading: false,
          data: response?.data?.data,
        });
      } catch (err) {
        setRecord({
          loading: true,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProperty(slug);
  }, [slug]);

  useEffect(() => {
    if (!record.loading) {
      setItem({
        Guests: record?.data?.guests||"",
        name: record?.data?.name || "",
        about: record?.data?.description || "",
        propertytype: record?.data?.property_type || "flat",
      });
      setPType(record?.data?.property_type || "flat");
    }
  }, [record]);

  const [PType, setPType] = useState(record?.data?.property_type || "flat");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const [item, setItem] = useState({
    about: "",
    propertytype: "",
    name: "",
    Guests:"",
    Beds:"",
    Bedrooms:"",
    Bathrooms:"",
    
  });

  const handleTabClick = (value) => {
    setEditguide(value);
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <IoArrowBack />
            <h2>Listing Editor</h2>
          </div>
          <div className="flex justify-center space-x-4 my-4">
            <button
              id="tab--navigation-tabs--0"
              value={"space"}
              onClick={() => handleTabClick("space")}
              className={`py-2 px-4 rounded-lg focus:outline-none ${editguide === "space"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
                }`}
              role="tab"
              aria-selected={editguide === "space"}
            >
              Your space
            </button>
            <button
              id="tab--navigation-tabs--1"
              value={"guide"}
              onClick={() => handleTabClick("guide")}
              className={`py-2 px-4 rounded-lg focus:outline-none ${editguide === "guide"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
                }`}
              role="tab"
              aria-selected={editguide === "guide"}
            >
              Arrival guide
            </button>
          </div>

          {editguide === "guide" && (
            <div className="flex">
              <div className="w-1/3 p-4">
                <div
                  className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 0 && "hover:text-black bg-border-600"
                    }`}
                  onClick={() => toggleExpanded(0)}
                >
                  <h3 className="font-bold text-2xl mt-3 mb-2">Title</h3>
                  <p className="font-normal text-sm">{record?.data?.name}</p>
                </div>
                <div
                  className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 1 && "hover:text-black bg-border-600"
                    }`}
                  onClick={() => toggleExpanded(1)}
                >
                  <h3>Direction</h3>
                  <p>Add Details</p>
                </div>
                <div
                  className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 2 && "hover:text-black bg-border-600"
                    }`}
                  onClick={() => toggleExpanded(2)}
                >
                  <h3>House Manual</h3>
                  <p>Add Details</p>
                </div>
              </div>
              <div className="w-2/3 p-4">
                {expandedIndex === 0 && (
                  <div className="p-4">
                    <textarea
                      className="w-full h-64 p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your text here..."
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
          )}
          {editguide === "space" && (
            <div className="flex">
              <div className="w-1/3 p-4">
                <div
                  className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 0 && "hover:text-black bg-border-600"
                    }`}
                  onClick={() => toggleExpanded(0)}
                >
                  <h3 className="font-bold text-2xl mt-3 mb-2">Title</h3>
                  <p className="font-normal text-sm">{record?.data?.name}</p>
                </div>

                <div
                  className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 1 && "hover:text-black bg-border-600"
                    }`}
                  onClick={() => toggleExpanded(1)}
                >
                  <h3 className="font-bold text-2xl mt-3 mb-2 ">Property Type</h3>
                  <p className="font-normal text-sm ">{record?.data?.type} {PType} </p>
                </div>

                <div
                  className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 2 && "hover:text-black bg-border-600"
                    }`}
                  onClick={() => toggleExpanded(2)}
                >
                  <h3 className="font-bold text-2xl mt-3 mb-2">Description </h3>
                  <p className="font-normal text-sm">{record?.data?.description}</p>
                </div>


                <div
                  className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 4 && "hover:text-black bg-border-600"
                    }`}
                  onClick={() => toggleExpanded(4)}
                >
                  <h3 className="font-bold text-2xl mt-3 mb-2">Number of Guests  </h3>
                  <p className="font-normal text-sm">{record?.data?.guests}</p>
                </div>
              </div>
              <div className="w-2/3 p-4">
                {expandedIndex === 0 && (
                  <div className="p-4">
                    <textarea
                      required
                      id="about"
                      name="name"
                      minCol={"5"}
                      minRow={"5"}
                      value={item?.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                    />
                    <div className="flex flex-wrap justify-between">
                      <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                        {item?.name ? (
                          <span>{item?.name.length}/32 characters</span>
                        ) : (
                          <span>0/32 characters</span>
                        )}
                      </label>
                      <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                        Minimum 32 words.
                      </label>
                    </div>
                  </div>
                )}

                {expandedIndex === 2 && (
                  <div className="p-4">
                    <textarea
                      required
                      id="about"
                      name="about"
                      minCol={"8"}
                      minRow={"8"}
                      value={item?.about}
                      onChange={handleInputChange}
                      placeholder="You'll have a great time at this comfortable place to stay."
                      className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                    />
                    <div className="flex flex-wrap justify-between">
                      <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                        {item?.about ? (
                          <span>{item?.about.length}/500 characters</span>
                        ) : (
                          <span>0/500 characters</span>
                        )}
                      </label>
                      <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                        Minimum 500 words.
                      </label>
                    </div>
                  </div>
                )}
                {expandedIndex === 1 && (
                  <div className="p-4">
                    <h2 className="text-black font-bold capitalize text-2xl mt-2 mb-2 ">
                      Property type
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                      {propertyTypes &&
                        propertyTypes.map((p, i) => (
                          <div key={i} className="">
                            <div
                              onClick={() => setPType(p?.value)}
                              className={`property-type-wrap cursor-pointer p-4 hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px] ${p?.value === PType
                                  ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700"
                                  : ""
                                }`}
                            >
                              {p.value === "flat" && (
                                <FaBuilding
                                  style={{ color: "#222222", fontSize: "30px" }}
                                />
                              )}
                              {p.value === "house" && (
                                <FaHome
                                  style={{ color: "#222222", fontSize: "30px" }}
                                />
                              )}
                              {p.value === "unique_space" && <House size={30} />}
                              {p.value === "guest_house" && (
                                <FaDoorOpen
                                  style={{ color: "#222222", fontSize: "30px" }}
                                />
                              )}
                              {p.value === "hotel" && (
                                <FaHotel
                                  style={{ color: "#222222", fontSize: "30px" }}
                                />
                              )}
                              {p.value === "single_room" && (
                                <FaBed
                                  style={{ color: "#222222", fontSize: "30px" }}
                                />
                              )}
                              {p.value === "boutique_hotel" && (
                                <FaCouch
                                  style={{ color: "#222222", fontSize: "30px" }}
                                />
                              )}
                              {p.value === "breakfast" && (
                                <MdOutlineFreeBreakfast size={30} />
                              )}
                              {p.value === "farm" && (
                                <FaWarehouse style={{ fontSize: "30px" }} />
                              )}
                              <h2
                                className={`text-[16px] mt-[10px] font-normal ${p.value === PType
                                    ? "text-[#222222]"
                                    : "text-[#222222]"
                                  }`}
                              >
                                {p.label}
                              </h2>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
