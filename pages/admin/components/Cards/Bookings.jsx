import { useEffect, useState } from "react";
import Image from "next/image";
import { MagicStar, Send2, Calendar2 } from "iconsax-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Listing from "../../api/Listing";
import DateFormat from "../../hook/Dateformat";
import { formatMultiPrice } from "../../../../hooks/ValueData";
import Spinner from "../../hook/spinner";
import DashboardNoData from "../../hook/DashboardNoData";

function Bookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [record, setRecord] = useState("");
  const [bookingCount, setBookingCount] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    const main = new Listing();
    const response = main.Top3Bookings(activeTab);
    response
      .then((res) => {
        setRecord(res?.data?.data);
        setBookingCount(res?.data?.booking_count);
        setLoading(false);
        setDataLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setDataLoading(false);
      });
  }, [activeTab]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-600 text-white  capitalize";
      case "confirm":
        return "bg-indigo-600  text-white capitalize";
      case "pending":
        return "bg-blue-600  text-white  capitalize";
      case "cancelled":
        return "bg-red-600  text-white capitalize";
      case "upcoming":
        return "bg-blue-600  text-white capitalize";
      default:
        return "";
    }
  };

  return (
    <>
      {loading ? (
        <div className="border bg-gray-100 h-[40vh] w-full p-3 rounded-2xl "></div>
      ) : (
        <div className="border text-gray-500 w-full p-3 rounded-2xl space-y-4">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm gap-2">
              <MagicStar size={18} />
              <p className="text-gray-800 font-medium">Bookings</p>
            </div>
            <Link
              href="/admin/booking-history"
              className="border flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
            >
              <Send2 size={14} />
              See All {bookingCount}
            </Link>
          </div>

          {/* tabs */}
          <div className="flex text-xs font-medium relative bg-gray-100 p-2 rounded-lg py-1">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`z-10 w-full px-2 py-1 rounded-lg ${activeTab === "upcoming" ? "bg-white text-blue-600" : "text-black"
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`z-10 w-full px-2 py-1 rounded-lg ${activeTab === "completed" ? "bg-white text-green-600" : "text-black"
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`z-10 w-full px-2 py-1 rounded-lg ${activeTab === "cancelled" ? "bg-white text-red-600" : "text-black"
                }`}
            >
              Cancelled
            </button>
            <button
              onClick={() => setActiveTab("current")}
              className={`z-10 w-full px-2 py-1 rounded-lg ${activeTab === "current" ? "bg-black text-white" : "text-black"
                }`}
            >
              Current
            </button>
          </div>

          {/* content */}
          {dataLoading ? (
            <div className="h-[30vh] flex items-center justify-center">
              <p className="text-base">Loading...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* comment 1 */}
              {record && record.length > 0 ? (
                record.map((item) => (
                  <div key={item.booking_number}>
                    <div className="flex items-center justify-between w-full select-none cursor-pointer">
                      <div className="flex items-center gap-2 img-book">
                        <Link href={`/admin/property/${item?.propertyUuid}`}>
                        <img
                          src={
                            item?.propertyImage ||
                            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                          }
                          alt="user"
                          className="rounded-full"
                        />
                        </Link>
                        <div className="font-medium">
                          <p className=
                            "text-sm ">
                            {item?.userName}
                          </p>
                          <p className={`text-sm ${getStatusClasses(item?.booking_status)}`}>
                            {item?.booking_status}
                          </p>
                          <p className="text-xs text-gray line-limit !pb-0 leading-relaxed">
                            {item?.propertyName}
                            <span className="ml-4">
                              {formatMultiPrice(item?.price)}
                            </span>
                          </p>
                          <div className="flex text-xs gap-1">
                            <Calendar2 size={16} />
                            <DateFormat item={item?.check_in} /> -{" "}
                            <DateFormat item={item?.check_out} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="bg-gray-400" />
                  </div>
                ))
              ) : (
                <DashboardNoData />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Bookings;
