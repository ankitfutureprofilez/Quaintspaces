import Image from "next/image";
import { Edit2, Heart, MagicStar, Send2 } from "iconsax-react";
import { motion } from "framer-motion";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Listing from "../../api/Listing";

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
      <div className="border bg-lightBorderColor h-[30vh] w-full p-3 rounded-2xl "></div>
    ) : (
    <div className="border text-gray-500 w-full p-3 rounded-2xl space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-2">
          <MagicStar size={18} />
          <p className="text-gray-800 font-medium">Top Booking Users({totaluser})</p>
        </div>
        <Link
          href="/admin/user-history"
          className="border flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
        >
          <Send2 size={14} />
          All
        </Link>
      </div>

      {/* <hr className='bg-gray-400 my-4' /> */}

      {/* content */}
      <div className="space-y-3">
        {/* comment 1 */}
        {record &&
          record?.map((item) => (
            <div className="flex items-center justify-between w-full select-none cursor-pointer">
              <div className="flex items-center gap-2 proerty-img">
                <Image
                  src={
                    item?.image_url
                      ? item?.image_url
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt="profile-image for user"
                  height={30}
                  width={30}
                  className="rounded-full"
                />
                <div className="font-medium">
                  <p className="text-xxs text-gray-500">{item?.name}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    {item?.email}
                  </p>
                </div>
              </div>
            </div>
          ))}

        <hr className="bg-gray-400" />

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
