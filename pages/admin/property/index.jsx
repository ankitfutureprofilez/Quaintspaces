import React, { useEffect, useState } from "react";
import Element from "../element";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Link from "next/link";
import Property from "./add/Property"
import Modal from "../hook/Modal"
import NoRecord from "../hook/NoRecord"
import AdminLayout from "../AdminLayout";
import Loading from "../hook/loading"
import { useRouter } from "next/router";
import { formatMultiPrice } from "../../../hooks/ValueData"

export default function Index() {
  const router = useRouter();
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPropertyLoading, setIsPropertyLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [step, setStep] = useState(0);

  const fetchProperties = () => {
    const main = new Listing();
    main.Adminproperty()
      .then((res) => {
        let properties = res?.data?.data;
        console.log("properties", properties)
        if (properties) {
          setRecord(properties);
          setIsLoading(false);
        } else {
          toast.error("No properties found");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchProperties();
  }, [router && router.pathname]);

  const handleDelete = (uuid) => {
    setSelectedProperty(uuid);
    setShowConfirmation(true);
  };

  const togglePopup = (uuid, step = 0) => {
    setSelectedProperty(uuid);
    setStep(step);
    setIsPopupOpen(!isPopupOpen);
  };

  const deleteProperty = (uuid) => {
    const main = new Listing();
    main.propertydelete(uuid).then((response) => {
      if (response.data.status === true) {
        toast.success(response.data.message);
        setRecord(record.filter((item) => item.uuid !== uuid));
      } else {
        toast.error(response.data.message);
      }
    }).catch((error) => {
      console.error("Error deleting property:", error);
    });
  };

  const handleConfirmation = () => {
    deleteProperty(selectedProperty);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleEditEntireProperty = (uuid) => {
router.push(`/admin/property/edit/${uuid}`)
  };

  const handleEditImage = () => {
    setStep(2);
    setIsPopupOpen(true);
  };

  return (
    <>
      <AdminLayout heading="Properties">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-wrap px-4 py-5 pt-0">
            {record.length ? (
              record.map((item, index) => (
                <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 px-3 mt-4" key={index}>
                  <div className="relative border rounded-lg overflow-hidden shadow-md">
                    <img
                      className="w-full h-48 object-cover object-center"
                      src={item?.property_image[0]?.image_url}
                      alt={item?.name}
                    />
                    <button className="absolute text-xs top-3 right-3 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700" onClick={() => handleDelete(item?.uuid)}>Remove</button>
                    {item?.step_completed !== 9 ? (
                      <button className="absolute text-xs top-3 left-3 bg-indigo-600 text-white px-3 py-2 rounded-md " >
                        In Progress
                      </button>
                    ) : (
                      <button className="absolute text-xs top-3 left-3 bg-green-600 text-white px-3 py-2 rounded-md " >
                        Completed
                      </button>
                    )}
                    <div className="p-4">
                      <h2 className="text-lg font-medium mb-2 heading-property">{item.name}</h2>
                      <h3 className="text-sm font-medium desc-property">
                        {item.description}
                      </h3>
                      <p className="text-sm text-gray-600 mt-3 capitalize">
                        {item?.type ? `${item?.type?.replace("_", " ")} .` : ""}
                        {item.bedrooms} Bedrooms· {item.beds} Beds
                      </p>
                      <p className="text-sm text-gray-600 mt-3 font-bold">{
                        formatMultiPrice(item?.price)
                      } Night</p>
                      <div className="mt-4">
                        <Link href={`/admin/property/${item?.uuid}`}>
                          <div className="text-normal text-underline btn sort rounded text-gray-500 w-full mt-3 px-5 py-2 cursor-pointer font-medium 0" >Public View</div>
                        </Link>
                        <button className="text-normal text-underline btn sort rounded text-gray-500 px-5 py-2 w-full mt-3 cursor-pointer font-medium 0" onClick={() => handleEditEntireProperty(item?.uuid)}>Edit Property</button>
                        {isPopupOpen && selectedProperty === item.uuid && (
                          <>
                            <div className="fixed inset-0 z-50 bg-opacity-50"></div>
                            <div className="fixed updateproperty bg-white inset-0 flex justify-center items-center py-16 overflow-x-auto">
                              <div className="fixed top-4 right-4 p-2 cursor-pointer" onClick={() => togglePopup(null)}>&times; Close</div>
                              <div className="rounded-lg flex flex-col items-center justify-center p-8 property-popup">
                                {isPropertyLoading ? (
                                  <Loading />
                                ) : (
                                  <Property fetchProperties={fetchProperties} isEdit={true} p={item} onClose={() => togglePopup(null)} step={step} />
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoRecord heading={"No Record Found !!"} />
            )}
          </div>
        )}
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center mt-6 mb-6">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white px-8 rounded shadow-lg z-50 relative rounded-lg max-w-[33%]">
              <p className="text-lg font-semibold mb-4 mt-6">
                Are you sure you want to delete this property?
              </p>
              <div className="flex justify-center mb-5">
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
      </AdminLayout>

     
    </>
  );
}
