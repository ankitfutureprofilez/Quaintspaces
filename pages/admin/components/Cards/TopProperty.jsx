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

function StatusTracker({ property_count }) {
  const [propertylist, setPropertylist] = useState([]);
  const [proerty_count, setPropertyCount] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const main = new Listing();
    const response = main.Top3Properties();
    response
      .then((res) => {
        setPropertylist(res?.data?.data);
        setPropertyCount(res?.data?.property_count);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    
    <>
      {loading ? (
        <div className="border bg-lightBorderColor h-[40vh] w-full p-3 rounded-2xl "></div>
      ) : (
        <div className="border text-gray-500 h-full w-full p-3 rounded-2xl">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm gap-2">
              <House size={18} />
              <p className="text-gray-800 font-medium">
                Top Properties({property_count})
              </p>
            </div>
            <Link
              href="/admin/property"
              className="border px-2 py-1 rounded-lg text-xs"
            >
              See all
            </Link>
          </div>

          <hr className="bg-gray-400 my-4" />
          <div className="space-y-3">
            {propertylist && propertylist?.length > 0 ? (
              propertylist.map((item) => (
                <div className="space-y-3" key={item.uuid}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 proerty-img">
                      <Image
                        src={
                          item?.image
                            ? item?.image
                            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                        }
                        alt="Property"
                        height={30}
                        width={30}
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
            <hr className="bg-gray-400" />
          </div>
        </div>
      )}
    </>
    
  );
}

export default StatusTracker;