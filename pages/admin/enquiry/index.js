import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Loading from "../hook/spinner";
import Nodata from "../hook/NoRecord";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Modal from "../hook/Modal";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Function to fetch data from server
  const fetchData = async (pg) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.UserMessages(pg);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  // Use effect to fetch initial data
  useEffect(() => {
    fetchData(page + 1);
  }, []);

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
                <div className="border border-gray-200 md:rounded-lg">
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
                             className="px-4 py-4 text-sm text-gray-500">
                              {item?.createdAt}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              <div className="text-gray-800 font-medium capitalize">
                                {item?.name}
                              </div>
                              <div className="text-sm">{item?.email}</div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {item?.message}
                            </td>
                            {item?.reply_message !== "N/A" ? (
                              <td className="px-4 py-4 text-sm text-gray-500">
                                {item?.reply_message}
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
                className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white"
                onClick={loadMore}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
          {!hasMore && !loading && (
            <div className="flex justify-center">
              <button className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white">
                No More Data
              </button>
            </div>
          )}
        </section>
      </AdminLayout>

      {selectedEnquiry && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="my-3 lg:my-6 flex flex-col">
            <label
              htmlFor="message"
              className="mx-auto mb-8 block text-lg font-medium text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              className="mt-3 p-3 lg:p-4 border rounded-3xl min-h-32 lg:min-h-52 w-full"
              required
              placeholder="Type your response here"
              rows={2}
            />
            <button
              className="btn filter mt-8 w-2/4 mx-auto"
              onClick={() => handleInquiryAcceptance(selectedEnquiry)}
            >
              {loading ? "Loading..." : "Proceed"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
