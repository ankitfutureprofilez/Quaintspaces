import Star from "../../public/_svgs/star";
import ReviewCard from "./ReviewCard";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../../pages/elements/Modal";
import RatingStar from "../../pages/elements/Star";
import DropReview from "./DropReview";
import { useRouter } from "next/router";
import Listings from "../../pages/api/laravel/Listings";
import { Context } from "../../pages/_app";
import toast from "react-hot-toast";
import StartRating from "../../pages/elements/StartRating";

const Reviews = React.forwardRef(({ data,isAdmin }, ref ) => {

  const { auth } = useContext(Context);

  const router = useRouter();
  const id = router.query.slug;

  const [page, setPage] = useState(1);
  const [selfReview, setselfReview] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const getSelfreview = () => {
    if (id) {
      const main = new Listings();
      main
        .GetUserReview(id)
        .then((r) => {
          let a = r?.data?.data;
          a.rating_user = auth;
          setselfReview(a);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getSelfreview();
  }, [id, auth]);

  const [hasMore, setHasmore] = useState(false);
  const [lists, setLists] = useState([]);
  const fetchReviews = async (p) => {
    if (id) {
      const main = new Listings();
      main
        .AllReviews(id, p)
        .then((r) => {
          if (r?.data?.status) {
            setReviewData(r?.data?.data);
            if (p == 1) {
              setLists(r?.data?.data?.data);
            } else {
              setLists((prev) => [...prev, ...r?.data?.data?.data]);
            }
            setPage(p);
          }
          if (r?.data?.current_page == r?.data?.last_page) {
            setHasmore(false);
          } else {
            setHasmore(true);
          }
          // false loading
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [id]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <section ref={ref}
      className="xl:min-h-[50vh] border-y border-darkBorderColor py-8">
      <h1 className="text-xl md:text-2xl mb-4 font-semibold flex items-center gap-1">
        <span className="flex" >
        <p className="pe-2" >{ data?.rating !==0 ?(parseFloat(data && data?.rating && data?.rating?.toFixed(0))) :(<></>) }
        {data?.rating>0?
          ".0"
        :null}
        </p>
        {/* <StartRating size={26} value={parseFloat(data && data?.rating && data?.rating?.toFixed(2))} />  */}
        
        </span>
          <span>
            {data?.review ? <> <span>{data?.review} Review</span></> : ''}
          </span>
      </h1>

      <div className="flex flex-wrap gap-0 md:gap-10 mb-10">
        <div className="w-full md:w-[calc(100%/2-1.5rem)]">
          <div className="mb-3 flex items-center justify-between">
            <span>Cleanliness</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span
                  className={`block h-1 rounded-full bg-blackColor`}
                  style={{ width: `${(data?.cleaning / 5) * 100}%` }}
                ></span>
              </div>
              <span>
                {parseFloat(
                  data && data?.cleaning && data?.cleaning?.toFixed(1)
                )}
              </span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span>Communication</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span
                  className={`block h-1 rounded-full bg-blackColor`}
                  style={{ width: `${(data?.communication / 5) * 100}%` }}
                ></span>
              </div>
              <span>
                {parseFloat(
                  data && data?.communication && data?.communication?.toFixed(1)
                )}
              </span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span> Check-in</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span
                  className={`block h-1 rounded-full bg-blackColor`}
                  style={{ width: `${(data?.check_in_count / 5) * 100}%` }}
                ></span>
              </div>
              <span>
                {parseFloat(
                  data && data?.check_in_count && data?.check_in_count
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[calc(100%/2-1.5rem)]">
          <div className="mb-3 flex items-center justify-between">
            <span>Accuracy</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span
                  className={`block h-1 rounded-full bg-blackColor`}
                  style={{ width: `${(data?.accuracy / 5) * 100}%` }}
                ></span>
              </div>
              <span>
                {parseFloat(
                  data && data?.accuracy && data?.accuracy?.toFixed(1)
                )}
              </span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span>Location</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span
                  className={`block h-1 rounded-full bg-blackColor`}
                  style={{ width: `${(data?.locations / 5) * 100}%` }}
                ></span>
              </div>
              <span>
                {parseFloat(
                  data && data?.locations && data?.locations?.toFixed(1)
                )}
              </span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span>Value</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span
                  className={`block h-1 rounded-full bg-blackColor`}
                  style={{ width: `${(data?.value / 5) * 100}%` }}
                ></span>
              </div>
              <span>
                {parseFloat(data && data?.value && data?.value?.toFixed(1))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-8">
        {selfReview && selfReview?.id ? (
          <div className="my-6 md:my-0 w-full md:w-[calc(100%/2-1.5rem)]">
            <ReviewCard data={selfReview} />
          </div>
        ) : (
          ""
        )}

        {lists?.map((review) => {
          return (
            <div
              className={`${
                auth?.id == review.user_id ? "display-none" : ""
              } my-6 md:my-0 w-full md:w-[calc(100%/2-1.5rem)]`}
              key={uuidv4()}
            >
              <ReviewCard data={review} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        {hasMore ? (
          <button
            onClick={() => fetchReviews(page + 1)}
            className="btn-normal mt-8"
          >
            {" "}
            Show more{" "}
          </button>
        ) : null}

        {/* Add review option */}
        {}
       
        <button
  className={
     "btn-normal mt-8 capitalize"
  }

            onClick={() => {
              if (auth) {
                openModal();
              } else {
                toast.error("You are not logged in!");
                router.push("/login");
              }
            }}
          >
            { (selfReview && selfReview?.id ? "Edit your review" : "Drop a review")}
          </button>
      

        <Modal width="md" isOpen={isOpen} onClose={closeModal}>
          <DropReview
            getSelfreview={getSelfreview}
            listing={selfReview}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </section>
  );
});

export default Reviews;
