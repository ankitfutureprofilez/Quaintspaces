import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Loading from "../hook/spinner";
import Nodata from "../hook/NoRecord";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Modal from "../hook/Modal";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  // Function to fetch data from server
  const fetchData = async (pg, signal) => {
    if (pg === 1) { setLoading(true); }
    setLoadingButton(true);
    try {
      const main = new Listing();
      const response = await main.UserMessages(pg, { signal }); // Pass the signal to API
      const newData = response?.data?.data?.data || [];
      setContent((prevData) => {
        if (pg === 1) {
          return newData;
        } else {
          return [...prevData, ...newData];
        }
      });
      setHasMore(response?.data?.current_page < response?.data?.last_page);
      setPage(response?.data?.current_page);
    } catch (error) {
      if (error.name !== 'AbortError') { // Only handle abort errors in a special way
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoadingButton(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchData(page, signal);

    return () => {
      controller.abort(); // Cancel the request if the component unmounts
    };
  }, [page]);

  const ShowToolTip = ({ text, messageId }) => {
    const isExpanded = expandedMessageId === messageId;

    const toggleExpanded = () => {
      if (isExpanded) {
        setExpandedMessageId(null); // Close the currently open message
      } else {
        setExpandedMessageId(messageId); // Open the new message
      }
    };

    return (
      <>
        <div className={`tooltip-text ${isExpanded ? "open" : "closed"}`}>
          <h2 className="mb-3 text-black">Message</h2>
          {text}
          <button className="close-tooltip text-black text-3xl absolute top-4 right-4" onClick={toggleExpanded}>
            &times;
          </button>
        </div>
        <button
          onClick={toggleExpanded}
          className="text-blue-500 underline ml-2" >
          View Message
        </button>
      </>
    );
  }

  // Function to handle loading more data
  const loadMore = () => {
    if (!loading && hasMore) {
      setLoading(true);
      fetchData(page + 1);
    }
  };

  const handleInquiryAcceptance = async (enquiry) => {
    const { id, name, email } = enquiry;

    if (!message || message.trim().length === 0) {
      toast.error("Message can't be empty!");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("contact_id", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.enqiry_info(formData);
      if (response?.data?.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error processing inquiry:", error);
      toast.error("Failed to process inquiry. Please try again later.");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const openModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setMessage("");
    setIsModalOpen(false);
    fetchData(page);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <AdminLayout heading="Enquiry">
        <section className="p-2 sm:p-4">
          <div className="flex flex-col">
            {loading && page === 0 ? (
              <div className="flex flex-wrap justify-center">
                <Loading />
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="table-responsive mytable">
                  <table className="min-w-[1200px] overflow-x-auto table-auto divide-y divide-gray-200">
                    <thead className="bg-indigo-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal whitespace-nowrap text-left text-white"
                        >
                          S.No
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm whitespace-nowrap font-normal text-left text-white"
                        >
                          Message Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm whitespace-nowrap font-normal text-left text-white"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="min-w-[30%] px-4 py-3.5 whitespace-nowrap text-sm font-normal text-left text-white" // Adjusted width for Message column
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="min-w-[30%] px-4 py-3.5 whitespace-nowrap text-sm font-normal text-left text-white" // Adjusted width for Reply Message column
                        >
                          Reply Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {content && content.length > 0 ? (
                        content.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {index + 1}
                            </td>
                            <td
                              className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                              {item?.createdAt}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              <div className="text-gray-800 font-medium capitalize">
                                {item?.name}
                              </div>
                              <div className="text-sm">{item?.email}</div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              <ShowToolTip text={item?.message} messageId={item?.id} />
                            </td>
                            {item?.reply_message !== "N/A" ? (
                              <td className="px-4 py-4 text-sm text-gray-500">
                                <ShowToolTip text={item?.reply_message} messageId={item?.id} />
                              </td>
                            ) : (
                              <td className="px-4 py-2 text-sm text-gray-500">
                                <div
                                  onClick={() => openModal(item)}
                                  className="capitalize cursor-pointer text-red-500 flex items-center w-fit gap-2 border rounded-full p-1 px-4"
                                >
                                  Message
                                </div>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <Nodata heading={"No Request"} />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          {hasMore && !loading && (
            <div className="flex justify-center">
              <button
                className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white cursor-pointer"
                onClick={loadMore}
              >
                {loadingButton ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </section>
      </AdminLayout>

      {selectedEnquiry && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className=" flex flex-col ">
            <div className="p-4 bg-[#efa3a3]">
              <label
                htmlFor="message"
                className="mx-auto block text-lg font-medium text-[#fff]"
              >
                Message
              </label>
            </div>
            <div className="p-4">
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                className="mt-3 p-3 lg:p-4 border rounded-2xl min-h-32 lg:min-h-52 w-full"
                required
                placeholder="Type your response here"
                rows={2}
              />
              <div className="flex justify-center">
                <button
                  className="btn filter mt-6 mb-4 w-2/4 mx-auto"
                  onClick={() => handleInquiryAcceptance(selectedEnquiry)}
                >
                  {loading ? "Loading..." : "Proceed"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
