import Image from "next/image";
import { Clock, MinusCirlce, House } from "iconsax-react";
import Avatar1 from "../assets/avatars/avatar1.png";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { formatMultiPrice } from "../../../../hooks/ValueData";
import DashboardNoData from "../../hook/DashboardNoData";

function StatusTracker() {

  const [propertyList, setPropertyList] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = (signal) => {
    const main = new Listing();
    const response = main.Top3Properties();
    response
      .then((res) => {
        setPropertyList(res?.data?.data);
        setPropertyCount(res?.data?.property_count);
        setLoading(false);
      })
      .catch((error) => {
        if (signal.aborted) {
          console.log("Fetch aborted");
        } else {
          console.log("Error fetching data:", error);
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => controller.abort();
  }, []);
  return (
    <>
      {loading ? (
        <div className="border  bg-gray-100  h-[40vh] w-full p-3 rounded-2xl "></div>
      ) : (
        <div className="border text-gray-500 h-full w-full p-3 rounded-2xl">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm gap-2">
              <House size={18} />
              <p className="text-gray-800 font-medium">
                Top Properties
              </p>
            </div>
            <Link
              href="/admin/property"
              className="border px-2 py-1 rounded-lg text-xs"
            >
              See all ({propertyCount})
            </Link>
          </div>
          <hr className="bg-gray-400 my-4" />
          <div className="space-y-3">
            {propertyList && propertyList?.length > 0 ? (
              propertyList.map((item) => (
                <div className="space-y-3 !mt-0 border-b py-2 last:border-0" key={item.uuid}>
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-2 img-book ">

                      <img
                        src={
                          item?.image
                            ? item?.image
                            : "/images/profile-no-image.jpg"
                        }
                        alt="Property"
                        className="rounded-full"
                      />
                      <div className="font-medium">
                        <Link href={`/property/${item?.uuid}`}>
                          <p className="text-sm text-gray-800 capitalize">
                            {item?.name}
                          </p>
                          <p className="text-sm text-gray-600 capitalize line-limit leading-relaxed">
                            {item?.location}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <DashboardNoData />
            )}
          </div>
        </div>
      )}
    </>

  );
}

export default StatusTracker;