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
    record = JSON?.parse(JSON?.parse(post?.location));
    console.log("record",record?.location)
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
        <Link className="block relative overflow-hidden" href={`/property/${post?.uuid}`}>
           {post?.discount_offer ? (
        <div className="absolute bg-red-500 -rotate-45 text-white px-2 py-1 w-32 text-center -left-[32px] top-[18px] shadow-[0_0_17px_-5px_#3c3c3c;]">
          {post?.discount_offer}%  off
        </div>
      ) :(<> </>)}
        <Image
          width={100}
          height={300}
          layout="responsive"
          src={post?.property_image[0]?.image_url ? (post?.property_image[0]?.image_url) : ("https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-2000x1333.jpg") }
          alt="Property cover image"
          className="!rounded-[7px_7px_0px_0px]"
        
        />
        <div className="flat-info">
          <h2 className="line-limit sm:min-h-[77px]">
            {record?.location}
          </h2>
          <h3 className="line-limit" style={{ WebkitLineClamp: 1 }}>
            {capitalizeFirstLetter(post?.name)}
          </h3>
          <p>
            <span>{capitalizeAndReplace(post?.type)}</span> &nbsp;
            <span>{capitalizeAndReplace(post?.properties_type)}</span> &nbsp;
            {post?.bedrooms} Bedrooms · {post?.beds} Bed .  {post?.guests} Guests . {post?.no_of_pet_allowed} Pets
          </p>
          <h4>
            <span className="card-price">
              {formatMultiPrice(post?.price) ? formatMultiPrice(post?.price)   :0}
            </span>{" "}
            /night
          </h4>
        </div>
        <div className="explor-btn">
          Explore
        </div>
      </Link>
   
      ) : (
        <Link className="block" href={`/properties/${post?.custom_link}`}>
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
