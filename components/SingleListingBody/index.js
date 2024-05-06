import { add, format } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import useLabeling from "../../hooks/useLabeling";
import { guestsData } from "../../utils/miniData";
import Images from "../SingleListingComponents/Images";
import ImageViewer from "../SingleListingComponents/ImageViewer";
import Date_GuestsPickerCard from "./Date_GuestsPickerCard";
import dynamic from "next/dynamic";
const Reviews = dynamic(import("./Reviews"));
const Location = dynamic(import("./Location"));
import Info from "./Info";
import Title from "./Title";
import Star from "../../public/_svgs/star";
import BtnPrimary from "../Button/BtnPrimary";
import { useRouter } from "next/router";
import LeftArrow from "../../public/_svgs/LeftArrow";
import Heart from "../../public/_svgs/Heart";
import { Context } from "../../pages/_app";
import useWishlist from "../../hooks/useWishlist";
import { addDays } from "date-fns";
import { formatMultiPrice } from "../../hooks/ValueData";
import toast from "react-hot-toast";

const SingleListingBody = ({ listing, loading }) => {
  const router = useRouter();
  const [selection, setSelection] = useState(null); // 'guests', 'dates', null
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageViewer, setImageViewer] = useState(false);

  // Guests max limit is selected here
  const [guests, setGuests] = useState({
    adults: {
      value: 1,
      max: listing?.data?.adults  ? listing?.data?.adults : 20,
      min: 0,
    },
    children: {
      value: 0,
      max: listing?.data?.children  ? listing?.data?.children : 5 ,
      min: 0,
    },
    infants: {
      value: 0,
      max: listing?.data?.infants  ? listing?.data?.infants : 2 ,
      min: 0,
    },
    pets: {
      value: 0,
      max: listing?.data?.no_of_pet_allowed   ? listing?.data?.no_of_pet_allowed : 1,
      min: 0,
    },
  });

  const result = useLabeling(guests);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectEnd, setSelectEnd] = useState(null);

  const ImagesRef = useRef(null);
  const AmenitiesRef = useRef(null);
  const ReviewsRef = useRef(null);
  const LocationRef = useRef(null);
  const CardRef = useRef(null);

  const [scroll, setScroll] = useState(null);
  const [showHeader, setShowHeader] = useState(false);
  const [rightSectionHeader, setRightSectionHeader] = useState(false);
  const { wishlist } = useContext(Context);
  const [isSaved, changeWishlist] = useWishlist(listing?.data, wishlist);

  useEffect(() => {
    if (CardRef.current) {
      const { x } = CardRef.current?.getBoundingClientRect();

      window.addEventListener("scroll", () => {
        if (window?.scrollY > x) {
          setRightSectionHeader(true);
        } else {
          setRightSectionHeader(false);
        }
      });
    }
  }, [CardRef.current]);

  useEffect(() => {
    if (scroll) {
      switch (scroll) {
        case "photos":
          window.scrollBy(
            0,
            ImagesRef?.current?.getBoundingClientRect().top - 80
          );
          break;
        case "amenities":
          window.scrollBy(
            0,
            AmenitiesRef?.current?.getBoundingClientRect().top - 80
          );
          break;
        case "reviews":
          window.scrollBy(
            0,
            ReviewsRef?.current?.getBoundingClientRect().top - 80
          );
          break;
        case "location":
          window.scrollBy(
            0,
            LocationRef?.current?.getBoundingClientRect().top - 80
          );
          break;
      }
    }
  }, [scroll]);

  useEffect(() => {
    if (imageViewer) {
      document.querySelector("body").style = "overflow:hidden";
    } else {
      document.querySelector("body").style = "overflow:visible";
    }
  }, [imageViewer]);

  useEffect(() => {
    if (ImagesRef.current) {
      const { bottom } = ImagesRef?.current?.getBoundingClientRect();
      window.addEventListener("scroll", () => {
        if (window?.scrollY > bottom + 300) {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      });
    }
  }, [ImagesRef?.current]);

  return (
    <>
      {imageViewer && (
        <ImageViewer
          selectedImage={selectedImage}
          images={listing?.data?.property_image}
          isSaved={isSaved}
          setImageViewer={setImageViewer}
        />
      )}
      <header
        className={`sm:hidden w-full bg-white fixed bottom-0 lg:top-0 lg:bottom-auto left-0 z-30 border-t 
        lg:border-b border-borderColor shadow-top 
        ${showHeader ? "showHeader" : "hideHeader"}`}
      >
        <div className="max-w-[1120px] px-4 mx-auto flex items-center justify-between">
          {/* <ul className="hidden md:flex gap-4">
            <li
              onClick={() => setScroll("photos")}
              className="text-md font-medium py-6 px-2 border-b-4 border-transparent transition duration-200 cursor-pointer hover:border-blackColor"
            >
              Photos
            </li>
            <li
              onClick={() => setScroll("amenities")}
              className="text-md font-medium py-6 px-2 border-b-4 border-transparent transition duration-200 cursor-pointer hover:border-blackColor"
            >
              Amenities
            </li>
            <li
              onClick={() => setScroll("reviews")}
              className="text-md font-medium py-6 px-2 border-b-4 border-transparent transition duration-200 cursor-pointer hover:border-blackColor"
            >
              Reviews
            </li>
            <li
              onClick={() => setScroll("location")}
              className="text-md font-medium py-6 px-2 border-b-4 border-transparent transition duration-200 cursor-pointer hover:border-blackColor"
            >
              Location
            </li>
          </ul> */}

          <div
            className={`gap-4 w-full justify-between md:w-fit md:justify-start px-3 py-3 md:py-0 flex`}
          >
            <div className="whitespace-nowrap">
              <span>
                <span className="font-medium text-lg">
                  {formatMultiPrice(listing?.data?.price)}
                </span>
                <span className="text-md"> night</span>
              </span>
              <div className="flex gap-1 items-center">
                <span>
                  <Star />
                </span>
                <span className="text-xs font-medium">
                  {listing?.data?.rating && listing?.data?.rating?.toFixed(2)}
                </span>
                <span> ·</span>
                <span className="text-xs underline text-lightTextColor">
                  {listing?.data?.review} reviews
                </span>
              </div>
            </div>
            <button
              className="filter mx-2 btn w-full"
              onClick={() => {
                if (selectedDay == null || selectEnd == null) {
                  toast.error("Date not selected");
                  return;
                }
                router.push(
                  `/book/${listing?.data?._id}?numberOfAdults=${
                    guests?.adults?.value || 0
                  }&numberOfChildren=${
                    guests?.children?.value || 0
                  }&numberOfInfants=${
                    guests?.infants?.value || 0
                  }&numberOfPets=${guests?.pets?.value || 0}&checkin=${
                    selectedDay && format(selectedDay, "yyyy-MM-dd")
                  }&checkout=${selectEnd && format(selectEnd, "yyyy-MM-dd")}`
                );
              }}
            >
              Book
            </button>
          </div>
        </div>
      </header>
      <div className="hidden">
        <nav className="absolute top-0 left-0 w-full p-2 z-20 flex items-center justify-between">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white"
          >
            <LeftArrow />
          </button>
          <button
            onClick={changeWishlist}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white"
          >
            <Heart
              css={`h-[20px] w-[20px] stroke-white stroke-[3] ${
                isSaved ? "fill-[#ff385c]" : "fill-[rgba(0, 0, 0, 0.5)]"
              }`}
            />
          </button>
        </nav>
        <ImageSlider listing={listing} />
      </div>

      <section className="w-full sm:px-4">
        <div className="container mx-auto !py-4 sm:py-8">
          <Title
            isSaved={isSaved}
            listing={listing}
            addWishlist={changeWishlist}
          />
          <div
            ref={ImagesRef}
            className="block h-screen rounded-2xl overflow-hidden sm:my-8 my-3 relative min-h-[20vh] sm:max-h-[40vh]"
          >
            <Images
              setSelectedImage={setSelectedImage}
              listing={listing}
              setImageViewer={setImageViewer}
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-16 relative mb-8 mt-8 lg:mt-0 lg:flex-row">
            <Info
              loading={loading}
              listing={listing}
              ref={AmenitiesRef}
              handleClick={() => {
                router.push("#reviews");
              }}
            />
            <div className="block">
              <Date_GuestsPickerCard
                loading={loading}
                selection={selection}
                setSelection={setSelection}
                selectedDay={selectedDay}
                selectEnd={selectEnd}
                setSelectedDay={setSelectedDay}
                setSelectEnd={setSelectEnd}
                result={result}
                guests={guests}
                setGuests={setGuests}
                listing={listing?.data}
                ref={CardRef}
              />
            </div>
          </div>

          <div id="reviews">
            <Reviews data={listing?.data} ref={ReviewsRef} />
          </div>
          <Location listing={listing?.data} ref={LocationRef} />
        </div>
      </section>
    </>
  );
};

export default SingleListingBody;

const ImageSlider = ({ listing }) => {
  return (
    <div className="w-full min-h-[30vh]">
      {listing?.data?.images && (
        <Image
        src={listing?.data?.images[0]?.url}
        layout="fill"
        objectFit="cover"
        className="w-full object-cover"
        alt="Property Image"
      />
      )}
    </div>
  );
};
