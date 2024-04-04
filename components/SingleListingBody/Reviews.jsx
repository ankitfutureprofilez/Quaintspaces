import Star from "../../public/_svgs/star";
import ReviewCard from "./ReviewCard";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Modal from "../../pages/elements/Modal";
import RatingStar from "../../pages/elements/Star";
import DropReview from "./DropReview";
import { useRouter } from "next/router";
import Listings from "../../pages/api/laravel/Listings";

const Reviews = React.forwardRef(({ data }, ref) => {


  const router = useRouter();
  const id = router.query.slug;

  const [page, setPage] = useState(1);
  const [listings, setListings] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const[addReview,setAddReview]=useState(true);
  console.log("listings",listings);

  useEffect(() => {
    if(id){
      const main = new Listings();
      main
        .GetUserReview(id)
        .then((r) => {
          setListings(r?.data?.data);
          if(r?.data?.data){
            setAddReview(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);


  const [hasMore, setHasmore] = useState(true);
  const [lists, setLists] = useState([])
  const fetchReviews = async (p) => { 
    if(id){
      const main = new Listings();
      main.AllReviews(id, p)
        .then((r) => {
          if(r.data.status){
            setReviewData(r?.data?.data);
            if(p == 1){
              setLists(r.data.data.data);
            } else { 
              setLists(prev=> [...prev, ...r?.data?.data?.data]);
            }
            setPage(p);
          }  
          if(r.data.data.current_page ==  r.data.data.last_page){ 
            setHasmore(false);
          }
          // false loading
        }).catch((err) => {
          console.log(err);
        });
    }
  }

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
  return (
    <section
      ref={ref}
      className="min-h-[50vh] border-y border-darkBorderColor py-8"
    >
      <h1 className="text-xl md:text-2xl mb-4 font-semibold flex items-center gap-1">
        <Star />
        <span>{parseFloat(data && data?.rating && data?.rating?.toFixed(2))}</span>
        <span> · </span>
        <span>{data?.review} reviews</span>
      </h1>

      <div className="flex flex-wrap gap-0 md:gap-10 mb-10">
        <div className="w-full md:w-[calc(100%/2-1.5rem)]">
          <div className="mb-3 flex items-center justify-between">
            <span>Cleanliness</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span className="w-11/12 bg-blackColor h-1 block rounded-full"></span>
              </div>
              <span>{parseFloat(data && data?.cleaning && data?.cleaning?.toFixed(1))}</span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span>Communication</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span className="w-11/12 bg-blackColor h-1 block rounded-full"></span>
              </div>
              <span>{parseFloat(data && data?.communication && data?.communication?.toFixed(1))}</span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span>Check-in</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span className="w-11/12 bg-blackColor h-1 block rounded-full"></span>
              </div>
              <span>{parseFloat( data && data?.check_in && data?.check_in?.toFixed(1))}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[calc(100%/2-1.5rem)]">
          <div className="mb-3 flex items-center justify-between">
            <span>Accuracy</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span className="w-10/12 bg-blackColor h-1 block rounded-full"></span>
              </div>
              <span>{parseFloat( data && data?.accuracy &&  data?.accuracy?.toFixed(1))}</span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span>Location</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span className="w-11/12 bg-blackColor h-1 block rounded-full"></span>
              </div>
              <span>{parseFloat( data && data?.locations && data?.locations?.toFixed(1))}</span>
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span>Value</span>
            <div className="flex gap-2 items-center">
              <div className="w-36 h-1 rounded-full bg-borderColor">
                <span className="w-full bg-blackColor h-1 block rounded-full"></span>
              </div>
              <span>{parseFloat(  data && data?.value && data?.value?.toFixed(1))}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-8">
        {lists?.map((review) => {
          return (
            <div
              className="my-6 md:my-0 w-full md:w-[calc(100%/2-1.5rem)]"
              key={uuidv4()}
            >
              <ReviewCard data={review} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        {hasMore ? <button
          onClick={() => fetchReviews(page+1)}
          className="btn-normal mt-8"> Show more </button> : '0'}
        {/* Add review option */}
        <button className="btn-normal mt-8" onClick={openModal}>
          {addReview ? "Drop a review" : "Edit your review" }
        </button>
        <Modal width="lg" isOpen={isOpen} onClose={closeModal} >
          <DropReview listing={listings} closeModal={closeModal} />
        </Modal>
      </div>
    </section>
  );
});

export default Reviews;
