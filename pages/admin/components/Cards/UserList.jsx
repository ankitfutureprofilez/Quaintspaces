import Image from "next/image";
import { Edit2, Heart, MagicStar, Send2 } from "iconsax-react";
import { motion } from "framer-motion";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import DashboardNoData from "../../hook/DashboardNoData";


function UserList({totaluser}) {
  const [record, setRecord] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = new Listing();
    main
      .Top3Users()
      .then((r) => {
        setRecord(r?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    {loading ? (
      <div className="border bg-gray-100 h-[30vh] w-full p-3 rounded-2xl "></div>
    ) : (
    <div className="border text-gray-500 w-full p-3 rounded-2xl space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-2">
          <MagicStar size={18} />
          <p className="text-gray-800 font-medium">Most  Booking Users </p>
        </div>
        <Link
          href="/admin/user-history"
          className="border flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
        >
          <Send2 size={14} />
         See  All {totaluser}
        </Link>
      </div>

      {/* <hr className='bg-gray-400 my-4' /> */}

      {/* content */}
      <div className="space-y-3">
        {/* comment 1 */}
        {record && record?.length >0 ? (
          record?.map((item) => (
            <div className="flex items-center justify-between w-full select-none cursor-pointer border-b last:border-0 pb-3">
              <div className="flex items-center gap-2 img-book">
                <img
                  src={
                    item?.image_url
                      ? item?.image_url
                      : "/images/profile-no-image.jpg"
                  }
                  alt="profile-image for user"
                  className="rounded-full admin-user-img"
                />
                <div className="font-medium">
                  <p className="text-xxs text-gray-500">{item?.name}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    {item?.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <DashboardNoData/>
        ) }
       
        

        {/* comment button */}
        {/* <Link
          href="/admin/user-history"
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

export default UserList;
