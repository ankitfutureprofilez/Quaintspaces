import React, { useState } from "react";
import { Star1 } from "iconsax-react";

const RatingStar = () => {
  const [rating, setRating] = useState(null);
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
        return "😍"
      default:
        return "";
    }
  };
  return (
    <>
    <div className="emoji-div m-auto table">{rating && getEmoji()}</div>
    <div className="flex items-center justify-center">
      {[...Array(5)].map((star, index) => {
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
              <Star1
                className="star"
                size="40"
                // color="black"
                value={currentRating}
                variant="Bold"
                color={
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
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
