import { Add, Calendar2, NoteText, TickCircle } from "iconsax-react";
import Link from "next/link";
import Listing from "../../api/Listing";
import { useEffect, useState } from "react";

function Reviews() {
  const [record, setRecord] = useState("");

  useEffect(() => {
    const main = new Listing();
    main
      .getrating()
      .then((r) => {
        console.log("data", r?.data?.data);
        setRecord(r?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="border text-gray-500 w-full  p-3 rounded-2xl">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-2">
          <NoteText size={18} />
          <p className="text-gray-800 font-medium">User Reviews</p>
        </div>
        <Link
          href="/admin/review"
          className="border px-2 py-1 rounded-lg text-xs"
        >
          See all
        </Link>
      </div>

      <hr className="bg-gray-400 my-4" />

      {/* content */}
      <div className="space-y-3">
        {/* note 1 */}
        {/* <div className='flex items-start gap-3 w-full'>
                    <div className='w-full space-y-1'>
                        <p className='text-sm text-black font-medium'>Landing page</p>
                        <p className='text-xs'>Search for inspiration to create landing page for AI startup.</p>
                        <div className='flex justify-between items-end'>
                            <div className='space-x-2 font-medium'>
                                <button className='text-xxs px-2 py-0.5 rounded-full bg-white-100 text-black'>Today</button>
                                <button className='text-xxs px-2 py-0.5 rounded-full bg-white-100 text-black'>To-do</button>
                            </div>
                            <p className='flex items-center gap-1 text-xxs text-black'>
                                <Calendar2 size={12} />
                                26 Oct
                            </p>
                        </div>
                    </div>
                </div> */}

        {/* <hr className='bg-gray-400' /> */}

        {/* note 2 */}
        {record &&
          record?.slice(2, 5)?.map((item) => (
            <>
              <div className="flex items-start gap-3 w-full opacity-70">
                {/* <button className='w-4 shrink-0 mt-1 h-4 border-2 border-gray-300 rounded-full' /> */}
                <TickCircle
                  size={22}
                  variant="Bold"
                  className="text-green-500"
                />
                <div className="w-full space-y-1">
                  <p className="text-sm text-black font-medium">
                    Meeting with CTO
                  </p>
                  <p className="text-xs text-black">
                    Discuss about application architecture and approach.
                  </p>
                  <div className="flex justify-between items-end">
                    <div className="space-x-2 font-medium">
                      <button className="text-xxs px-2 py-0.5 rounded-full bg-white-100 text-black">
                        Today
                      </button>
                      <button className="text-xxs px-2 py-0.5 rounded-full bg-white-100 text-black">
                        Meeting
                      </button>
                    </div>
                    <p className="flex items-center gap-1 text-xxs text-black">
                      <Calendar2 size={12} />
                      26 Oct
                    </p>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-400" />
            </>
          ))}
      </div>
    </div>
  );
}

export default Reviews;
