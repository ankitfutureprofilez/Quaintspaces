import { Book, Diagram } from "iconsax-react";
import RadialProgress from "../RadialProgress.jsx";
import { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import Link from "next/link";

function CourseProgress() {
  const [activeUser, setActiveUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = new Listing();
    const response = main.ActiveUser();
    response
      .then((res) => {
        setActiveUser(res?.data?.activeUser);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);


  const fetchData = (signal) => {
    const main = new Listing();
    const response = main.ActiveUser();
    response
      .then((res) => {
        setActiveUser(res?.data?.activeUser);
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
        <div className="border bg-gray-100 h-[30vh] w-full p-3 rounded-2xl "></div>
      ) : (
        <div className="border text-gray-500 w-full p-3 rounded-2xl">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm gap-2">
              <Book size={18} />
              <p className="text-gray-800 font-medium">Active Users Month </p>
            </div>
            <Link
              href="/admin/users"
              className="border px-2 py-1 rounded-lg text-xs"
            >
              See all
            </Link>
          </div>

          <hr className="bg-gray-400 my-4" />

          {/* content */}
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <RadialProgress progress={activeUser?.toFixed(0)} />

              <div className="space-y-1">
                <p className="text-sm text-gray-800   text-black font-semibold">
                  Active Users
                </p>
                <p className="text-xs  text-black">Active Users for this month</p>
                <Link
                  href="/admin/users"
                  className="text-xs  text-black text-primary underline font-semibold underline-offset-2"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseProgress;
