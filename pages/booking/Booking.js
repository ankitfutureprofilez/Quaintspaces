import { useEffect, useState } from "react";
import Button from "../elements/Button";
import Heading from "../elements/Heading";
import { useRouter } from "next/router";
import Listings from "../api/laravel/Listings";

function Booking() {
  const [selectedButton, setSelectedButton] = useState("upcoming");
  const [listings, setListings] = useState([]);
  const router = useRouter();
  const handleGroupChange = (e) => {
    setSelectedButton(e);
  };
  useEffect(() => {
    // setloading(true);
    const main = new Listings();
    main
      .BookingHistory()
      .then((r) => {
        //   setloading(false)
        setListings(r.data.data);
      })
      .catch((err) => {
        //   setloading(false);
        console.log(err);
      });
  }, []);
  const BookingTable = () => {
    return (
      <div className="table-responisve">
        <table className="table-fixed w-full booking-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Check In</th>
              <th>Check Out </th>
              <th>Status </th>
              <th>Price </th>
              <th>Action </th>
            </tr>
          </thead>
          {listings &&
            listings.map((item) => (
              <tbody>
                <tr className="">
                  <td className="flex items-center">
                    <img src="image_source" alt="alt" />
                    <div className="text ml-2">
                      <div class="title">title_text</div>
                      <div class="description">2bhk_description</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.check_in}</td>
                  <td className="px-4 py-2">{item.check_out}</td>
                  <td className="px-4 py-2">
                    <Button
                      text={`${item.booking_status}`}
                      design={
                        "font-inter text-blue-700 font-medium leading-tight text-center w-32 p-3 rounded-full "
                      }
                    />
                  </td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">
                    {" "}
                    <Button
                      text={"Cancel"}
                      design={
                        "font-inter text-red-700 font-medium leading-tight text-center w-32  border-red-500 p-3 rounded-full "
                      }
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto account-btn ">
        <div className=" pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
          <Heading
            text={"My Booking"}
            value={"/account"}
            handleClick={() => router.back()}
          />
        </div>
      </div>

      <div className=" container mx-auto flex align-items-center my-4 mx-4 py-2 space-x-4 upcomming-box">
        <Button
          design={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${
            selectedButton === "upcoming"
              ? "bg-orange-300 text-white"
              : "text-black"
          }`}
          onClick={() => handleGroupChange("upcoming")}
          text={"Upcoming"}
        />

        <Button
          text={"Completed"}
          design={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${
            selectedButton === "completed"
              ? "bg-orange-300 text-white"
              : "text-black"
          } `}
          onClick={() => handleGroupChange("completed")}
        />

        <Button
          design={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${
            selectedButton === "canceled"
              ? "bg-orange-300 text-white"
              : "text-black"
          } `}
          onClick={() => handleGroupChange("canceled")}
          text={"Canceled"}
        />
      </div>

      {selectedButton === "upcoming" && (
        <div className="container mx-auto">
          <BookingTable />
        </div>
      )}
      {selectedButton === "completed" && (
        <div className="container mx-auto">2ccompleted</div>
      )}
      {selectedButton === "canceled" && (
        <div className="container mx-auto">3</div>
      )}
    </>
  );
}

export default Booking;
