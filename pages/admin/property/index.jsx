import React, { useEffect, useState } from "react";
import Element from "../element";
import Layout from "../AdminLayout";
import Listing from "../api/Listing";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from 'next/image';
import AdminLayout from "../AdminLayout";
import Property from "./add/Property";

export default function index() {

  const [record, setRecord] = useState([]);

  useEffect(() => {
    const main = new Listing();
    main
      .Adminproperty()
      .then((res) => {
        let properties = res?.data?.data; 
        if (properties) {
          setRecord(properties);
        } else {
          toast.error("No properties found");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const togglePopup = (uuid) => {
    setSelectedProperty(uuid);
    setIsPopupOpen(!isPopupOpen);
  };

  const deleteProperty = (uuid) => {
    const main = new Listing();
    main
      .propertydelete(uuid)
      .then((response) => {
        console.log("response.data.message", response.data.message)
        toast.success(response.data.message);
        setRecord(record.filter(item => item.uuid !== uuid));
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
      });
  };

  const handleDelete = (uuid) => {
    deleteProperty(uuid);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = () => {
    deleteProperty(selectedProperty);
    setShowConfirmation(false);
  }

  console.log("selectedProperty",selectedProperty)
  const handleCancel = () => {
    setShowConfirmation(false);
  }

  return (
    <>
      <AdminLayout>
        <Element text={"Property List"} />
        <div>
          <div className="flex flex-wrap mt-5 px-4 py-5">
            {record &&
              record.map((item, index) => (
                <ul className="w-full sm:w-1/2 md:w-1/3 px-3" key={index}>
                  <li>
                    <div className="banipark-box">
                      <div className="w-full"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >

                        <img
                          loading="lazy"
                          width="100"
                          height="300"
                          decoding="async"
                          data-nimg="1"
                          srcSet={item?.property_image[0]?.image_url}
                          src={item?.property_image[0]?.image_url}
                          style={{
                            color: "transparent",
                            width: "100% !important",
                            height: "100% !important",
                          }}
                        />
                      </div>

                      <div className="flat-info">
                        <h5>{item.location}</h5>
                        <h3 className="line-limit">{item.name}</h3>
                        <p>
                          {item.bedrooms} Bedrooms · {item.beds} Bed
                        </p>
                        <h4>
                          From <span> ₹ {item.price}</span> /night
                        </h4>
                      </div>
                      <div className="explor-btn">
                        <Link
                          className="block"
                          href={`/property/${item.uuid}`}
                        >
                          View {" "}
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.6069 1.9997L0 10.6066L1.41421 12.0208L10.0211 3.41391V10.9998H12.0208V0H1.02106L1.02106 1.9997H8.6069Z"
                              fill="#DCAC81"
                            ></path>
                          </svg>
                        </Link>

                      </div>
                    </div>
                    <div>
                      <div>
                      <button
                                className="hover:border hover:border-black bg-red-600 rounded-full transition-none m-1 p-2"
                                onClick={() => setShowConfirmation(true)}
                            >
                                Delete
                            </button>
                            {showConfirmation &&
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                                    <div className="bg-black text-white p-6 rounded-lg">
                                        <p>Are you sure you want to delete this property?</p>
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                className="mr-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                onClick={handleConfirmation}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        </div>
                        <button
                          onClick={() => togglePopup(item.uuid)}
                          className="hover:border hover:border-black bg-green-600 rounded-full transition-none m-1 p-2"
                        >
                          Update
                        </button>
                        {isPopupOpen && selectedProperty === item.uuid && (
                          <div className="fixed updateproperty inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                            <div className="bg-gray-200 rounded-lg flex flex-col items-center justify-center p-8 property-popup">
                            <Property 
                              name={item?.name} 
                              beds={item.beds}
                              price={item?.price}
                              latitude={item?.latitude}
                              longitudes={item?.longitudes}
                              location={item?.location}
                              properties_type={item?.properties_type}
                              bedrooms={item?.bedrooms}
                              bathrooms={item?.bathrooms}
                              city_id={item?.city_id}
                              area_id={item?.area_id}
                              description={item?.description}
                              amenities={item?.amenities}
                              adults={item?.adults}
                              children={item?.children}
                              no_of_pet_allowed={item?.no_of_pet_allowed}
                              property_image={item?.property_image}
                              localarea={item?.area}
                              LocaLcity={item?.city}
                              uuid={item?.uuid}
                              onClose={() => setIsPopupOpen(false)}
                            />
                            </div>
                          </div>
                        )}
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
