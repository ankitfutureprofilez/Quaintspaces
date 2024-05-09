import { useEffect, useState } from "react";
import Image from "next/image";
import { Edit2, Heart, MagicStar, Send2 } from "iconsax-react";
import { motion } from "framer-motion";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Link from "next/link";
import Listing from "../../api/Listing";

function Bookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [comment1Liked, setComment1Liked] = useState(true);
  const [comment2Liked, setComment2Liked] = useState(false);
  const [record, setRecord] = useState("");
const[bookingCount,SetbookingCount] = useState("")
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = new Listing();
    const response = main.Top3Bookings(activeTab);
    response
      .then((res) => {
        setRecord(res?.data?.data);
        SetbookingCount(res?.data?.booking_count)
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [activeTab]);
  return (
    <>
    {loading ? (
      <div className="border bg-lightBorderColor h-[40vh] w-full p-3 rounded-2xl "></div>
    ) : (
    <div className="border text-gray-500 w-full p-3 rounded-2xl space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-2">
          <MagicStar size={18} />
          <p className="text-gray-800 font-medium">Bookings {bookingCount}</p>
        </div>
        <Link
          href="/admin/booking-history"
          className="border flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
        >
          <Send2 size={14} />
          All
        </Link>
      </div>

      {/* <hr className='bg-gray-400 my-4' /> */}

      {/* tabs */}
      <div className="flex text-xs font-medium relative bg-gray-100 p-2 rounded-lg py-1">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`z-10 w-full px-2 py-1  text-black ${
            activeTab === "upcoming" ? "" : ""
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`z-10 w-full px-2 py-1.5 rounded-lg  text-black ${
            activeTab === "completed" ? "" : ""
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`z-10 w-full px-2 py-1   text-black ${
            activeTab === "cancelled" ? "" : ""
          }`}
        >
          Cancelled
        </button>

        <div className="absolute items-center px-1 top-0 left-0 w-full h-full flex">
          <motion.div
            animate={{
              x:
                activeTab === "upcoming"
                  ? 0
                  : activeTab === "cancelled"
                  ? "200%"
                  : "100%",
            }}
            className="w-1/3 bg-white border h-7 rounded-lg transform"
          />
        </div>
      </div>

      {/* content */}
      <div className="space-y-3">
        {/* comment 1 */}
        {record &&
          record?.map((item) => (
            <>
              <div className="flex items-center justify-between w-full select-none cursor-pointer">
                <div className="flex items-center gap-2">
                  <Image
                    src={item?.userImage
                      || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    alt="loom"
                    height={36}
                    width={36}
                    className="rounded-full"
                  />
                  <div className="font-medium">
                    <p className="text-xxs text-gray-500">{item?.userName}  ({item?.booking_number})</p>
                    <p className="text-xs text-gray line-limit leading-relaxed">
                    {item?.propertyName}
                    </p>
                  </div>
                </div>
                {/* <button onClick={() => setComment1Liked(!comment1Liked)} className={`${comment1Liked ? 'text-red-500' : 'text-black-500'} duration-200 active:scale-50`}>
                      <Heart size={20} variant={comment1Liked ? 'Bold' : 'Linear'} /> 
                    </button> */}
              </div>
              <hr className="bg-gray-400" />
            </>
          ))}

        {/* comment button */}
        {/* <Link
          href="/admin/booking-history"
          className="border flex items-center justify-center w-full gap-2 p-2 text-gray-600 font-medium rounded-lg text-xs"
        >
          <Edit2 size={14} />
          Show All
        </Link> */}
      </div>
    </div>
    )}
    </>
  );
}

export default Bookings;
