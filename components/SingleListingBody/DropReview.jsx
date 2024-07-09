import React, { useState } from "react";
import RatingStar from "../../pages/elements/Star";
import toast from "react-hot-toast";
import Listings from "../../pages/api/laravel/Listings";
import { useRouter } from "next/router";

const DropReview = ({ closeModal, listing, getSelfreview }) => {

  console.log("listing",listing)
  const [clean, setClean] = useState(listing?.cleaning || 0);
  const [communcation, setCommuncation] = useState(listing?.communication || 0);
  const [checkin, setCheckin] = useState(listing?.review_check_in || 0);
  console.log("checkin",checkin)
  const [accuracy, setAccuracy] = useState(listing?.accuracy || 0);
  const [location, setlocation] = useState(listing?.location || 0);
  const [value, setValue] = useState(listing?.value || 0);
  const [mainRating, setMainRating] = useState(listing?.rating || 0);
  const [reviewText, setReviewText] = useState(listing?.review_text || "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const id = router.query.slug;

  const handleChange = (event) => {
    setReviewText(event?.target?.value);
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (mainRating === 0 || reviewText?.trim() === "") {
        toast.error("Please fill in all the required fields.");
        setLoading(false);
        return;
      }
      const main = new Listings();
      const response = await main.AddRating({
        properties_uuId: id,
        review_text: reviewText,
        rating: mainRating,
        cleaning: clean,
        accuracy: accuracy,
        check_in: checkin,
        communication: communcation,
        location: location,
        value: value,
      });
      if (response && response?.data && response?.data?.status) {
        toast.success(response?.data?.message);
        closeModal && closeModal();
        getSelfreview && getSelfreview();
      } else {
        toast.error(response?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col align-center w-full">
      {/* <h1 className="mb-8 mx-auto align-center sm:text-2xl text-md font-medium text-bold">
        Please drop your review
      </h1> */}

      <h2
        className=" w-full p-4 bg-[#E0C4C3] text-[#fff] align-center text-lg text-base font-medium"
      
      >
        Overall Rating
      </h2>
      <div className="p-5 ">

      <div className="flex flex-col">
        <RatingStar
          size="40"
          rating={mainRating}
          setRating={setMainRating}
          showemoji={true}
          className="w-1/2"
        />
      </div>

      <div className="my-10">
        <textarea
          id="review"
          name="review"
          placeholder="Please drop your detailed review"
          value={reviewText}
          onChange={handleChange}
          className="mt-1 p-4 border rounded-lg w-full h-full"
          required
          rows={4} // Set the number of rows as needed
        />
      </div>

      <div className="flex items-center mb-4">
        <h2
          className=" w-1/2 align-center text-md text-base font-medium"
          style={{ color: "#3F2A17" }}
        >
          Cleanliness
        </h2>
        <RatingStar
          rating={clean}
          setRating={setClean}
          showemoji={false}
          className="w-1/2"
        />
      </div>
      <div className="flex items-center mb-4">
        <div className="w-1/2">
          <h2
            className="mr-4 align-center text-md text-base font-medium"
            style={{ color: "#3F2A17" }}
          >
            Communication
          </h2>
        </div>
        <div className="w-1/2">
          <RatingStar
            rating={communcation}
            setRating={setCommuncation}
            showemoji={false}
          />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <h2
          className=" w-1/2 align-center text-md text-base font-medium"
          style={{ color: "#3F2A17" }}
        >
          Check-in
        </h2>
        <RatingStar
          rating={checkin}
          setRating={setCheckin}
          showemoji={false}
          className="w-1/2"
        />
      </div>
      <div className="flex items-center mb-4">
        <h2
          className=" w-1/2 align-center text-md text-base font-medium"
          style={{ color: "#3F2A17" }}
        >
          Accuracy
        </h2>
        <RatingStar
          rating={accuracy}
          setRating={setAccuracy}
          showemoji={false}
          className="w-1/2"
        />
      </div>
      <div className="flex items-center mb-4">
        <h2
          className=" w-1/2 align-center text-md text-base font-medium"
          style={{ color: "#3F2A17" }}
        >
          Location
        </h2>
        <RatingStar
          rating={location}
          setRating={setlocation}
          showemoji={false}
          className="w-1/2"
        />
      </div>
      <div className="flex items-center mb-4">
        <h2
          className=" w-1/2 align-center text-md text-base font-medium"
          style={{ color: "#3F2A17" }}
        >
          Value
        </h2>
        <RatingStar
          rating={value}
          setRating={setValue}
          showemoji={false}
          className="w-1/2"
        />
      </div>

      <div className="flex justify-center mt-6 pt-3">
        <button onClick={handleSubmit} className=" filter btn w-auto w-40 hover:bg-[#fff] hover:text-[#E0C4C3] border-2 bg-color-[#E0C4C3] border-[#E0C4C3] ">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      </div>
    </div>
  );
};

export default DropReview;
