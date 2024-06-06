import React, { useContext } from "react";
import useWishlist from "../../../hooks/useWishlist";
import { Context } from "../../../pages/_app";
import Link from "next/link";
import Image from "next/image";
import { formatMultiPrice } from "../../../hooks/ValueData";

const Card = ({ post }) => {
  const { wishlist } = useContext(Context);
  const [isSaved, changeWishlist] = useWishlist(post, wishlist);
  let record;
  try {
    record = JSON.parse(JSON.parse(post?.location));
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }


 
  const capitalizeAndReplace = (inputString) => {
    if (!inputString) return "";
    return inputString
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="banipark-box rounded-lg">
      {post?.uuid ? (
        <Link className="block" href={`/property/${post?.uuid}`}>
        <Image
          width={100}
          height={300}
          layout="responsive"
          src={post?.property_image[0]?.image_url}
          alt="Property cover image"
        />
        <div className="flat-info">
          <h2 className="line-limit sm:min-h-[72px]">
            {record?.location}
          </h2>
          <h3 className="line-limit" style={{ WebkitLineClamp: 1 }}>
            {capitalizeFirstLetter(post?.name)}
          </h3>
          <p>
            {post?.bedrooms} Bedrooms · {post?.beds} Bed
            <span className="ml-2">{capitalizeAndReplace(post?.type)}</span>
          </p>
          <h4>
            <span className="card-price">
              {formatMultiPrice(post?.price)}
            </span>{" "}
            /night
          </h4>
        </div>
        <div className="explor-btn">
          Explore
        </div>
      </Link>
   
      ) : (
        <Link className="block" href={`/property/${post?.custom_link}`}>
        <Image
          width={100}
          height={300}
          layout="responsive"
          src={post?.property_image[0]?.image_url}
          alt="Property cover image"
        />
        <div className="flat-info">
          <h2 className="line-limit sm:min-h-[72px]">
            {record?.location}
          </h2>
          <h3 className="line-limit" style={{ WebkitLineClamp: 1 }}>
            {capitalizeFirstLetter(post?.name)}
          </h3>
          <p>
            {post?.bedrooms} Bedrooms · {post?.beds} Bed
            <span className="ml-2">{capitalizeAndReplace(post?.type)}</span>
          </p>
          <h4>
            <span className="card-price">
              {formatMultiPrice(post?.price)}
            </span>{" "}
            /night
          </h4>
        </div>
        <div className="explor-btn">
          Explore
        </div>
      </Link>
      )}
      {/* <Link className="block" href={`/property/${post?.custom_link}`}> */}


    </div>
  );
};

export default Card;
