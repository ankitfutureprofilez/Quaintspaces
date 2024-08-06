import React, { useEffect, useState } from "react";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Link from "next/link";
import NoRecord from "../hook/NoRecord";
import AdminLayout from "../AdminLayout";
import Loading from "../hook/loading";
import { useRouter } from "next/router";
import { MdAdd } from "react-icons/md";
import { FaTableCellsLarge } from "react-icons/fa6";
import { CgViewComfortable } from "react-icons/cg";
import { formatMultiPrice } from "../../../hooks/ValueData";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Modal from "../hook/Modal";

export default function Index() {
  const router = useRouter();
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('card');

  const toggleView = () => {
    setView(view === 'card' ? 'table' : 'card');
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    // fetchProperties(searchTerm);
  };

  // { search: searchTerm }
  const fetchProperties = async (signal) => {
    const main = new Listing();
    try {
      setIsLoading(true);
      const response = await main.Adminproperty({ signal });
      let properties = response?.data?.data;

      if (properties) {
        setRecord(properties);
      } else {
        toast.error("No properties found");
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error("Error fetching properties:", error);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchProperties(signal);
    return () => {
      controller.abort();
    };
  }, [router.pathname]);
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

  const handleEditEntireProperty = (uuid) => {
    router.push(`/admin/property/edit/${uuid}`);
  };

  const CardView = () => {
    return (
      <div className="flex flex-wrap ">
        {record &&
          record.map((item, index) => (
            <div
              className="w-full sm:w-1/1 lg:w-1/2 xl:w-1/3 sm:px-3 mt-4"
              key={index}
            >
              <div className="relative border rounded-lg overflow-hidden shadow-md">
                <img
                  className="w-full h-48 object-cover object-center"
                  src={
                    item?.property_image[0]?.image_url
                      ? item?.property_image[0]?.image_url
                      : "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-2000x1333.jpg"
                  }
                  alt={item?.name}
                />
                <button
                  className="absolute text-xs top-3 right-3 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
                  onClick={() => setShowConfirmation(true) || setSelectedProperty(item?.uuid)}
                >
                  Remove
                </button>
                {item?.status !== 1 ? (
                  <button className="absolute text-xs top-3 left-3 bg-indigo-600 text-white px-3 py-2 rounded-md">
                    In Progress
                  </button>
                ) : (
                  <button className="absolute text-xs top-3 left-3 bg-green-600 text-white px-3 py-2 rounded-md">
                    Completed
                  </button>
                )}
                <div className="p-4">
                  <div className="space-x-1">
                    <h2 className="text-lg font-medium mb-2 heading-property">
                      {item.name}
                    </h2>
                    {/* <div className="flex tooltip-container">

                      <div className="tooltip-text text-sm max-w-fit py-2">
                        <span><span className="text-base">🛈</span> Booking method: Instant </span>
                        <span>
                          Property Status:
                          {item?.status !== 1
                            ? "In Progress"
                            : "Completed"}
                        </span>
                      </div>
                    </div> */}
                  </div>
                  <h3 className="text-sm font-medium desc-property">
                    {item?.description}
                  </h3>
                  <p className="text-sm text-gray-600 mt-3 capitalize">
                    {item?.type ? `${item?.type?.replace("_", " ")} .` : ""}
                    {item.bedrooms} Bedrooms. {item.beds} Beds.{" "}
                    {item.guests} guests. {item.bathrooms} Bathrooms.{" "}
                    {item.no_of_pet_allowed} Pets
                  </p>
                  <p className="text-sm text-gray-600 mt-3 font-bold">
                    {formatMultiPrice(item?.price)} Night
                  </p>
                  <div className="mt-4">
                    <Link href={`/admin/property/${item?.uuid}`}>
                      <div className="text-normal text-underline btn sort rounded text-gray-500 w-full mt-3 px-5 py-2 cursor-pointer font-medium">
                        View
                      </div>
                    </Link>
                    <button
                      className="text-normal text-underline btn sort rounded text-gray-500 px-5 py-2 w-full mt-3 cursor-pointer font-medium"
                      onClick={() => handleEditEntireProperty(item?.uuid)}
                    >
                      Edit Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  };

  return (
    <AdminLayout heading="Your listings">
      {isLoading ? (
        <div className="flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="">
            {view === 'table' ? <TableView /> : <CardView />}
          </div >
        </>
      )}
      {showConfirmation && (

        <Modal isOpen={showConfirmation} onClose={handleCancel}>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-[#efa3a3] w-full">
              <label
                htmlFor="message"
                className="mx-auto block text-lg font-medium text-[#fff] text-center"
              >
                Delete This Property?
              </label>
            </div>
            <div className="flex justify-center mb-5 mt-4 space-x-2 md:space-x-4 w-full">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
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
        </Modal>

      )}

    </AdminLayout>
  );
}