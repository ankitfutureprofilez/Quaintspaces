import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import Property from "../add/Property";
import { IoArrowBack } from "react-icons/io5";

export default function Edit() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [editguide, setEditguide] = useState("space"); // State to manage selected tab
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [record, setRecord] = useState({
    loading: true,
    data: {},
  });

  // Fetch property data
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

  // Toggle function to expand/collapse sections
  const toggleExpanded = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if already expanded
    } else {
      setExpandedIndex(index); // Expand the clicked item
    }
  };

  // Function to handle tab clicks
  const handleTabClick = (value) => {
    setEditguide(value);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-center">
            <IoArrowBack />
            <h2>Listing Editor </h2>
          </div>
          <div className="your-space">
            <div className="flex justify-center space-x-4">
              {/* Tab buttons */}
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
          </div>

          {/* Content based on selected tab */}
          {editguide === "space" && (
            <div className="flex">
              {/* Left panel with all sections */}
              <div className="w-1/4 p-4">
                <div
                  className={`cursor-pointer ${expandedIndex === 0 ? "w-1/4" : "w-3/4"}`}
                  onClick={() => toggleExpanded(0)}
                >
                  <h2>Title 1</h2>
                  <p>Title 1 description</p>
                </div>
                <div
                  className={`cursor-pointer ${expandedIndex === 1 ? "w-1/4" : "w-3/4"}`}
                  onClick={() => toggleExpanded(1)}
                >
                  <h2>Title 2</h2>
                  <p>Title 2 description</p>
                </div>
                <div
                  className={`cursor-pointer ${expandedIndex === 2 ? "w-1/4" : "w-3/4"}`}
                  onClick={() => toggleExpanded(2)}
                >
                  <h2>Title 3</h2>
                  <p>Title 3 description</p>
                </div>
              </div>

              {/* Right panel with the expanded section */}
              <div className="w-3/4 p-4">
                {expandedIndex !== null && (
                  <>
                    <h2>Expanded Section {expandedIndex + 1}</h2>
                    <p>Additional details for section {expandedIndex + 1}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
