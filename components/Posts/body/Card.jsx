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

  return (
    <div className="banipark-box rounded-lg">
      <Image
        width={100}
        height={300}
        layout="responsive"
        src={post?.property_image[0]?.image_url}
      />
      <div className="flat-info">
        <h5>
          {/* {post?.location} */}
          {textResizer(
           post.location && post?.location.slice(0, 1).toUpperCase() +
              post?.location.slice(1, -1),
            30
          )}
        </h5>
        <h3 className="line-limit">
          {post?.name}
          {/* {textResizer(
                post?.name.slice(0, 1).toUpperCase() + post?.name.slice(1, -1),
                30
              )} */}
        </h3>
        <p>
          {post?.bedrooms} Bedrooms · {post?.beds} Bed
        </p>
        <h4>
          From <span> {formatMultiPrice(post?.price)}</span> /night
        </h4>
      </div>
      <div className="explor-btn">
        <Link className="block" href={`/property/${post?.uuid}`}>
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
  );
};

export default Card;
