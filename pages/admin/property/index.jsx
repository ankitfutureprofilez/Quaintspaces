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



  const TableView = () => {
    return (
      <div className="mytable w-full table-responsive">
        {record && record?.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                  S. No.
                </th>
                <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                  Property Name
                </th>


                <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                  Edit
                </th>
                <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                  Delete
                </th>

                <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {record && record.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <Link href={`/admin/property/edit/${item?.uuid}`}>
                      <div className="flex items-center space-x-4">
                        <img
                          className="w-16 h-16 object-cover rounded-md"
                          src={
                            item?.property_image[0]?.image_url
                              ? item?.property_image[0]?.image_url
                              : "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-2000x1333.jpg"
                          }
                          alt={item?.name}
                        />
                        <span className="text-left text-sm   ">{item?.name}</span>
                      </div>
                    </Link>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                    <button
                      className="text-sm px-3 py-1 text-white bg-black rounded hover:bg-blue-700"
                      onClick={() => handleEditEntireProperty(item?.uuid)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                    <button
                      className="text-sm px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      onClick={() => {
                        setShowConfirmation(true);
                        setSelectedProperty(item?.uuid);
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </td>

                  <td className="px-4 py-4 text-sm  whitespace-nowrap">
                    {item?.status !== 1 ? (
                      <p className="text-indigo-600">In Progress</p>
                    ) : (
                      <p className="text-green-600">Completed</p>
                    )}
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        ) : (
          <Nodata heading={"No Property"} />
        )}
      </div>
    );
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
                    {item?.bedrooms} Bedroom{item?.bedrooms > 1 ? "s" : ""}{" "}
                    ·{item?.beds} Bed{item?.beds > 1 ? "s" : ""} ·
                    {item?.guests} Guest{item?.guests > 1 ? "s" : ""} ·
                    {item?.no_of_pet_allowed} Pet
                    {item?.no_of_pet_allowed > 1 ? "s" : ""}
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
    <AdminLayout heading="Your Listings">
      {isLoading ? (
        <div className="flex">
          <Loading />
        </div>
      ) : (
        <>
          {/* <div className="flex flex-wrap mt-[40px] items-center justify-between">
            <h3 className="text-[32px] font-[500] text-[#222222] capitalize ">
            </h3>
            <div className="flex items-center"> */}
              {/* <div
                onClick={toggleView}
                className="view-toggle-button hover:bg-gray-400 active:bg-gray-400 mx-2 cursor-pointer bg-[#f7f7f7] rounded-3xl w-9 h-9 flex justify-center items-center"
              >
                {view === 'table' ? <CgViewComfortable /> : <FaTableCellsLarge />}
              </div> */}
              {/* <CgViewComfortable /> */}
              {/* <div
                onClick={() => {
                  router.push("/admin/property/become");
                }}
                className="bg-gray-3
            00 rounded-3xl w-9 h-9 flex justify-center items-center cursor-pointer hover:bg-gray-400 active:bg-gray-400"
              >
                <MdAdd />
              </div> */}
            {/* </div>
          </div> */}

          {/* <div className="mt-3">

        {view === 'table' ? <TableView /> : <CardView />}
      </div > */}
          <CardView />
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