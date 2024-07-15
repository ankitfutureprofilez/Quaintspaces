import { textResizer } from "../../utils/handlers";
import Image from "next/image";
import StartRating from "../../pages/elements/StartRating";

const ReviewCard = ({ data }) => {
  const date = new Date(data?.created_at);
  // let reviewtime=""
  // reviewtime+= date.getMonth() + 1; // getMonth() returns zero-based month (0-11), so we add 1
  // reviewtime+=" ,"+ date.getFullYear();

  // Stars
  // let stars = [];
  // for (let i = 0; i < data?.rating; i++) {
  //   stars.push(<Star1 size="16" color="#ffc107" variant="Bold"/>);
  // }
  // for (let i = 0; i < 5-data?.rating; i++) {
  //   stars.push(<Star1 key={i} size="16" color="#000000" />);
  // }
  return (
    <div>
      <header className="flex gap-2 items-center">
        <div className="w-12 h-12 bg-borderColor overflow-hidden bg-gray-200 rounded-[50%] border border-gray-300">
          <Image
            src={data?.rating_user?.image_url || "/images/profile-no-image.jpg"}
            alt="User Image"
            // layout="fill"
            width={100}
            height={100}
            objectFit="cover"
            className=" w-full h-full object-cover"
            loading="lazy"
          />
          {/* <img
            src={data?.rating_user?.image_url}
            className="rounded-full w-full h-full object-cover"
            alt=""
          /> */}
        </div>
        <div>
          <p className="text-md font-medium">{data?.rating_user?.name} </p>
          <p className="text-sm text-lightTextColor">{data?.createdAt}</p>
          
        </div>
      </header>
      <div className="mt-4">
        <p className="text-blackColor text-md leading-7">
          {textResizer(data?.review_text, 210)}
        </p>
      <p className="text-sm text-lightTextColor flex">
            <StartRating size={15} value={data?.rating} />
          </p>
        <span className="text-red-500 text-xs">
          {data && data?.status == 2
            ? "Your review is not approved yet. Currently only you can see this."
            : data && data?.status == 0
            ? "Review rejected. You can edit it for reconsideration."
            :
            ""
            }
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
