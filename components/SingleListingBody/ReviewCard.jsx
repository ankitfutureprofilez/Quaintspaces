import DateComponent from "../../pages/admin/hook/Dateformat";
import { textResizer } from "../../utils/handlers";

const ReviewCard = ({ data }) => {
const date = new Date(data?.created_at);
// console.log("date",date)
// let reviewtime=""
// reviewtime+= date.getMonth() + 1; // getMonth() returns zero-based month (0-11), so we add 1
// reviewtime+=" ,"+ date.getFullYear();

// Stars
let stars = '';
for (let i = 0; i < data?.rating; i++) {
    stars += '⭐'; // Add a star for each rating value
}
  return (
    <div>
      <header className="flex gap-2 items-center">
        <div className="w-12 h-12 bg-borderColor rounded-full">
          <img
            src={data?.rating_user?.image_url}
            className="rounded-full w-full h-full object-cover"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-md font-medium">{data?.rating_user?.name} </h1>
          <h1 className="text-sm text-lightTextColor">{data?.createdAt}</h1>
          <h1 className="text-sm text-lightTextColor">{stars}</h1>
        </div>
      </header>
      <div className="mt-4">
        <p className="text-blackColor text-md leading-7">
          {textResizer(data?.review_text, 210)}
        </p>
        <span className="text-red-500 text-xs" >{data&& data?.status == 0 ? "Your review is not approved yet. Currently only you can see this." : ""}</span> 
      </div>
    </div>
  );
};

export default ReviewCard;
