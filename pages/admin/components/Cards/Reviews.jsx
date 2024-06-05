import { Add, Calendar2, NoteText, TickCircle } from "iconsax-react";
import Link from "next/link";
import Listing from "../../api/Listing";
import { useEffect, useState } from "react";
import Image from "next/image";
import StartRating from "../../../elements/StartRating";
function Reviews() {
  const [record, setRecord] = useState("");
  const [ratingCount, SetRatingCount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = new Listing();
    main
      .Top3rating()
      .then((r) => {
        setRecord(r?.data?.data);
        SetRatingCount(r?.data?.rating_count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getLocation = (locationStr) => {
    try {
      const location = typeof locationStr === 'string' ? JSON.parse(locationStr) : locationStr;
      const daat = JSON?.parse(location)
      return daat.location;
    } catch (error) {
      console.error("Error accessing location:", error);
      return "Invalid location data";
    }
  };

  return (
    <>
      {loading ? (
        <div className="border bg-gray-100 h-[40vh] w-full p-3 rounded-2xl "></div>
      ) : (
        <div className="border text-gray-500 w-full  p-3 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm gap-2">
              <NoteText size={18} />
              <p className="text-gray-800 font-medium">
                User Reviews
              </p>
            </div>
            <Link
              href="/admin/review"
              className="border px-2 py-1 rounded-lg text-xs"
            >
              See all ({ratingCount})
            </Link>
          </div>
          <hr className="bg-gray-400 my-4" />
          <div className="space-y-3">
            {record &&
              record?.map((item) => (
                <>
                  <div className="flex items-start gap-3 w-full ">
                    <Link className="img-book" href={`/admin/property/${item?.get_property_review?.uuid}`}>
                    <img
                      src={item?.get_property_review?.property_image[0]?.image_url
                        || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                      alt="property Quant-stay"
                      className="rounded-full"
                    />
                    </Link>
                    <div className="w-full space-y-1">
                      <p className="text-sm text-black font-medium capitalize">
                        {item?.rating_user?.name}
                      </p>
                      <p className="text-xs text-black leading-relaxed capitalize">
                        <span className="font-bold">

                        {item?.get_property_review?.name}
                        </span>
                        {" - "}
                        {getLocation(item?.get_property_review?.location)}
                      </p>
                      <p className="text-xs text-black line-limit leading-relaxed">
                        {item?.review_text}
                      </p>
                      <div className="flex justify-between items-end">
                        <div className="space-x-2 font-medium">

                          <div className="flex text-xs px-2 py-0.5 rounded-full bg-white-100 text-black">
                            <StartRating
                              value={parseFloat(
                                item && item?.rating && item?.rating?.toFixed(2)
                              )}
                            />
                          </div>
                        </div>
                        <p className="flex items-center gap-1 text-xs text-black">
                          <Calendar2 size={12} />
                          {item?.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="bg-gray-400" />
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
