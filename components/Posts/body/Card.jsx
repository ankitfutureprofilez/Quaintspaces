import React, { useContext } from "react";
import useWishlist from "../../../hooks/useWishlist";
import { Context } from "../../../pages/_app";
import { textResizer } from "../../../utils/handlers";
import Link from 'next/link'
import Image from "next/image";

const Card = ({ post }) => {
  const { wishlist } = useContext(Context);
  const [isSaved, changeWishlist] = useWishlist(post, wishlist);

  return (

    <>
    {/* <div
      className="w-full cursor-pointer relative"
      title={post.lt.slice(0, 1).toUpperCase() + post.lt.slice(1, -1)} >
      <div className="absolute top-6 right-6 z-10" onClick={changeWishlist}>
        <Heart
          css={`h-[23px] w-[23px] stroke-white stroke-[3] ${
            isSaved ? "fill-[#ff385c]" : "fill-[rgba(0, 0, 0, 0.5)]"
          }`}
        />
      </div>
      <Link className="block" href={`/listings/${post._id}`} >
        <div className="min-h-[250px] h-[calc(50vw/5+20px)] relative">
          <img
            src={post.images[0].url}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="mt-4">
          <h1 className="text-md font-medium mb-2 flex justify-between">
            <span>
              {textResizer(
                post.lt.slice(0, 1).toUpperCase() + post.lt.slice(1, -1),
                30
              )}
            </span>
            <span className="flex gap-1 font-normal items-center h-fit">
              <Star />
              {post.rating}
            </span>
          </h1>
          <span className="text-sm font-normal flex gap-1 items-center">
            <span className="font-semibold">{post.price}</span> night
          </span>
        </div>
      </Link>
    </div> */}

{/* .banipark-box img { height: 250px !IMPORTANT; object-fit: cover; } */}

    <div className="banipark-box">
              <Image width={100} height={300}
              layout="responsive" 
              src=
               {post?.property_image[0]?.image_url}  
              />
              <div className="flat-info">
                <h5>{post.location}</h5>
                <h3 className="line-limit"> 
                {post.name}
                {/* {textResizer(
                post.lt.slice(0, 1).toUpperCase() + post.lt.slice(1, -1),
                30
              )} */}
              </h3>
                <p>{post.bedrooms} Bedrooms · {post.beds} Bed</p>
                <h4>
                  From <span> ₹{post.price}</span> /night
                </h4>
              </div>
              <div className="explor-btn">
              <Link className="block" href={`/listings/${post.uuid}`} >
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
                </Link>
              </div>
            </div>
    </>
  );
};

export default Card;
