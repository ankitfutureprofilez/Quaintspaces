import React, { useContext } from "react";
import useWishlist from "../../../hooks/useWishlist";
import { Context } from "../../../pages/_app";
import { textResizer } from "../../../utils/handlers";
import Link from "next/link";
import Image from "next/image";
import { formatMultiPrice } from "../../../hooks/ValueData";

const Card = ({ post }) => {
  const { wishlist } = useContext(Context);
  const [isSaved, changeWishlist] = useWishlist(post, wishlist);
  let record
  try {
    record = JSON?.parse(JSON?.parse(post?.location));
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  function capitalizeAndReplace(inputString) {
    let words = inputString?.split("_");
    for (let i = 0; i < words?.length; i++) {
        words[i] = words[i]?.charAt(0)?.toUpperCase() + words[i]?.slice(1);
    }
    let result = words?.join(" ");
    return result;
}
const capitalizeFirstLetter = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

  return (
    <div className="banipark-box rounded-lg">
        <Link className="block" href={`/property/${post?.uuid}`}>
      <Image
        width={100}
        height={300}
        layout="responsive"
        src={post?.property_image[0]?.image_url}
      />
      <div className="flat-info">
        <h5 className="line-limit">
          {/* {textResizer(
            post &&
              post.location &&
              post.location.slice(0, 1).toUpperCase() +
                post.location.slice(1, -1)
          )} */}
          {record?.location}
          {/* {post?.location} */}
        </h5>
        <h3 className="line-limit">
          {capitalizeFirstLetter(post?.name)}
        </h3>
        <p>
          {post?.bedrooms} Bedrooms · {post?.beds} Bed
          <span className="ml-2">
            {capitalizeAndReplace(post?.type)}
          </span>
        </p>
        <h4>
          {/* From{" "} */}
          <span className="card-price"> {formatMultiPrice(post?.price)}</span>{" "}
          /night
        </h4>
      </div>
      <div className="explor-btn">
      <div className="explore block">
          Explore{" "}
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.6069 1.9997L0 10.6066L1.41421 12.0208L10.0211 3.41391V10.9998H12.0208V0H1.02106L1.02106 1.9997H8.6069Z"
              fill="#DCAC81"
            />
          </svg>
        </div>
      </div>
        </Link>
    </div>
  );
};

export default Card;
