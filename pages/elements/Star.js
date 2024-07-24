import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

const RatingStar = ({ showemoji,rating, setRating, size }) => {
  const [hover, setHover] = useState(null);
  const getEmoji = () => {
    switch (rating) {
      case 1:
        return "😞";
      case 2:
        return "😟";
      case 3:
        return "😊";
      case 4:
        return "😃";
      case 5:
        return "😍";
      default:
        return "";
    }
  };
  return (
    <>
      {showemoji && rating>0 ? (
        <div className="emoji-div mx-auto">{rating && getEmoji()}</div>
      ) : null}
      <div className="flex mx-auto items-center justify-center">
        {[...Array(5)]?.map((star, index) => {
          const currentRating = index + 1;
          return (
            <div className="star-div flex items-center" key={index}>
              <input
                type="radio"
                name="rating"
                onClick={() => {
                  setRating(currentRating);
                }}
              />
              <label>
                <FaStar
                  className="star"
                  size={size || "20"}
                  // color="black"
                  value={currentRating}
                  variant="Bold"
                  color={
                    // currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    currentRating <= (hover || rating) ? "#efa3a3" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => {
                    setRating(currentRating);
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RatingStar;
