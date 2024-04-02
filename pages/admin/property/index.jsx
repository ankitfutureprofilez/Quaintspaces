import React, { useEffect, useState } from "react";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Link from "next/link";
import Modal  from  "../hook/Modal"
import AdminLayout from "../AdminLayout"; // Assuming this is a custom layout component

export default function Index() {
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (uuid) => {
    setSelectedProperty(uuid);
    setShowConfirmation(true);
  };

  const deleteProperty = (uuid) => {
    const main = new Listing();
    main
      .propertydelete(uuid)
      .then((response) => {
        if (response.data.status === true) {
          toast.success(response.data.message);
          setRecord(record.filter((item) => item.uuid !== uuid));
        } else {
          toast.error(response.data.message);
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
  };

  return (
    <>
      <AdminLayout heading="Properties">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
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
                    <h3 className="text-sm font-medium desc-property">
                      {item.description}
                    </h3>
                    <p className="text-sm text-gray-600 mt-3 capitalize">
                      {item?.type ? `${item?.type?.replace("_", " ")} .` : ""}
                      {item.bedrooms} Bedrooms· {item.beds} Beds
                    </p>
                    <p className="text-sm text-gray-600 mt-3">
                      {item?.price} as per night
                    </p>
                    <div className="explor-btn-link ">
                      <Link href={`/property/${item?.uuid}`}>
                        View{" "}
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.6069 1.9997L0 10.6066L1.41421 12.0208L10.0211 3.41391V10.9998H12.0208V0H1.02106L1.02106 1.9997H8.6069Z"
                            fill="#667eea"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showConfirmation && (

<div className="fixed inset-0 z-50 flex items-center justify-center mt-6 mb-6">
<div className="absolute inset-0 bg-gray-800 opacity-50"></div>
<div className="bg-white px-8  rounded shadow-lg z-50 relative rounded-lg max-w-[33%]">
  {/* <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
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
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button> */}
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
