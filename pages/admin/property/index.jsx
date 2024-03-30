import React, { useEffect, useState } from "react";
import Element from "../element";
import Layout from "../AdminLayout";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Link from "next/link";
import AdminLayout from "../AdminLayout";
import Property from "./add/Property";

export default function index() {
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const main = new Listing();
    main.Adminproperty()
      .then((res) => {
        let properties = res?.data?.data;
        if (properties) {
          setRecord(properties);
          setIsLoading(false); 
        } else {
          toast.error("No properties found");
          setIsLoading(false);  
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false); 
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
        console.log("response.data.message", response.data.message);
        toast.success(response.data.message);
        setRecord(record.filter((item) => item.uuid !== uuid));
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
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <AdminLayout heading="Properties" >
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-wrap px-4 py-5 pt-0">
            {record.map((item, index) => (
              <div className="w-full sm:w-1/2 md:w-1/3 px-3 mt-4" key={index}>
                <div className="border rounded-lg overflow-hidden shadow-md">
                  <img
                    className="w-full h-48 object-cover object-center"
                    src={item?.property_image[0]?.image_url}
                    alt={item?.name}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-medium mb-2">{item.name}</h2>
                    <h3 className="text-sm font-medium ">{item.location}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.bedrooms} Bedrooms · {item.beds} Beds
                    </p>
                    <div className="flex justify-between items-center">
                      <Link href={`/property/${item.uuid}`}>
                        <div className="text-blue-500 hover:text-blue-600">
                          View
                        </div>
                      </Link>
                      <div>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-700"
                          onClick={() => setShowConfirmation(true)}
                        >
                          Delete
                        </button>
                        {showConfirmation && (
                          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg">
                              <p className="text-lg font-semibold mb-4">
                                Are you sure you want to delete this property?
                              </p>
                              <div className="flex justify-center">
                                <button
                                  className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700"
                                  onClick={handleConfirmation}
                                >
                                  Delete
                                </button>
                                <button
                                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                          onClick={() => togglePopup(item.uuid)}
                        >
                          Update
                        </button>
                        {isPopupOpen && selectedProperty === item.uuid && (
                          <>
                            <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50"></div>
                            <div className="fixed updateproperty inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 overflow-x-auto">
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
}
