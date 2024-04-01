import React, { useEffect, useState } from "react";
import Element from "../element";
import Layout from "../AdminLayout";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Link from "next/link";
import AdminLayout from "../AdminLayout";
import Property from "./add/Property";
import ListingsLoading from './../../../components/Loading/ListingsLoading';

export default function index() {
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const[showConfirmation ,setShowConfirmation]= useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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


  const handleDelete = (uuid) => {
    setSelectedProperty(uuid);
    setShowConfirmation(true);
  };

  
  const togglePopup = (uuid) => {
    
    setIsPopupOpen(!isPopupOpen);
  };
  
  const deleteProperty = (uuid) => {
    const main = new Listing();
    main
      .propertydelete(uuid)
      .then((response) => {
        if(response.data.status ===true){
          toast.success(response.data.message);
          setRecord(record.filter((item) => item.uuid !== uuid));
        }else{
          toast.error(response.data.message)
        }
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
      });
  };
  
  const handleConfirmation = () => {
    deleteProperty(selectedProperty);
    setShowConfirmation(false);
  };
  
  const handleCancel = () => {
    setShowConfirmation(false);
  }
  return (
    <>
      <AdminLayout heading="Properties" >
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
         <ListingsLoading/>
          </div>
        ) : (
          <div className="flex flex-wrap px-4 py-5 pt-0">
            {record.map((item, index) => (
              <div className="w-full sm:w-1/2 md:w-1/3 px-3 mt-4" key={index}>
                 <div className="relative border rounded-lg overflow-hidden shadow-md">
                  <img
                    className="w-full h-48 object-cover object-center"
                    src={item?.property_image[0]?.image_url}
                    alt={item?.name}
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(item?.uuid)}
                  >
                  Delete
                  </button>
                  <div className="p-4">
                    <h2 className="text-lg font-medium mb-2">{item.name}</h2>
                    <h3 className="text-sm font-medium desc-property ">{item.description}</h3>
                    <p className="text-sm text-gray-600 mt-3">
                      {item?.type ? `${item?.type?.replace("_" ," ")} .` : ""} 
                      {item.bedrooms} Bedrooms· {item.beds} Beds  
                    </p>
                    <p  className="text-sm text-gray-600 mt-3">
                      {
                      item?.price } as per night
                      </p>
                    <div className="flex justify-between items-center mt-4">
                      <Link href={`/property/${item.uuid}`}>
                      <div
                          className="text-xl  rounded text-gray-800 px-4 py-2 font-medium hover:text-black-300"
                         
                        >
                          View
                        </div>
                      </Link>
                      <div>
                      {showConfirmation && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
    <div className="bg-white-800   bg-opacity-50 p-6 rounded-lg w-64 sm:w-auto">
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

                        {/* <div
                          className="text-sm  rounded text-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
                          onClick={() => togglePopup(item?.uuid)}
                        >
                          edit
                        </div> */}
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
