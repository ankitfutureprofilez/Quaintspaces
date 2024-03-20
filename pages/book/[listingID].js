import { differenceInDays, format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LeftArrow from "../../public/_svgs/LeftArrow";
import Logo from "../../public/_svgs/Logo";
import Star from "../../public/_svgs/star";
import Link from "next/link";
import DatesModel from "../../components/book/DatesModel";
import GuestsModel from "../../components/book/GuestsModel";
import Head from "next/head";
import Footer from "../../components/Footer";
import { getParams } from "../../utils/handlers";
import postsData from "../../bot/data.json";
import Heading from "../elements/Heading";
import Image from 'next/image'
import Button from "../elements/Button";
const Book = () => {
  const router = useRouter();
  const { listingID } = router.query;
  const [listing, setListing] = useState({});
  const [infos, setInfos] = useState({});
  const [dateModel, setDateModel] = useState(false);
  const [guestsModel, setGuestsModel] = useState(false);

  const [guests, setGuests] = useState({
    adults: {
      value: +infos.adults || 0,
      max: 16,
      min: 0,
    },
    children: {
      value: +infos.children || 0,
      max: 15,
      min: 0,
    },
    infants: {
      value: +infos.infants || 0,
      max: 5,
      min: 0,
    },
    pets: {
      value: +infos.pets || 0,
      max: 5,
      min: 0,
    },
  });

  useEffect(() => {
    setListing(postsData.filter((e) => e._id === listingID)[0]);
    const params = getParams();
    setInfos(params);

    setGuests({
      adults: {
        value: +params.numberOfAdults || 0,
        max: 16,
        min: 0,
      },
      children: {
        value: +params.numberOfChildren || 0,
        max: 15,
        min: 0,
      },
      infants: {
        value: +params.numberOfInfants || 0,
        max: 5,
        min: 0,
      },
      pets: {
        value: +params.numberOfPets || 0,
        max: 5,
        min: 0,
      },
    });
  }, [router.asPath]);

  const [formData, setFormData] = useState({
    selectOption: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      file: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    // <>
    //   <Head>
    //     <title>Request to book - Airbnb Clone</title>
    //   </Head>
    //   <header className="p-6 border-b border-borderColor">
    //     <Link href="/">
    //       <div className="cursor-pointer">
    //         <Logo />
    //       </div>
    //     </Link>
    //   </header>

    //   <main className="max-w-[1150px] min-h-screen py-[3.6rem] mx-auto">
    //     <div className="flex items-center gap-3">
    //       <button
    //         onClick={() => router.push(`/listings/${router.query.listingID}`)}
    //         className="p-4 rounded-full hover:bg-borderColor transition duration-150"
    //       >
    //         <LeftArrow />
    //       </button>
    //       <h1 className="text-3xl font-medium text-blackColor">
    //         Confirm and Pay
    //       </h1>
    //     </div>

    //     <div className="flex mt-14 px-3 gap-10">
    //       <div className="w-8/12">
    //         <h1 className="text-xl mb-4 font-medium">Your trip</h1>
    //         <div className="flex items-center justify-between w-full py-2">
    //           <div>
    //             <h5 className="text-lg text-blackColor font-medium">Dates</h5>
    //             <h5 className="text-md text-blackColor">{`${
    //               infos?.checkin && format(new Date(infos.checkin), "MMM dd")
    //             } - ${
    //               infos?.checkout && format(new Date(infos.checkout), "MMM dd")
    //             }`}</h5>
    //           </div>
    //           <button
    //             onClick={() => setDateModel(true)}
    //             className="underline text-md font-medium"
    //           >
    //             Edit
    //           </button>
    //         </div>
    //         <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
    //           <div>
    //             <h5 className="text-lg text-blackColor font-medium">Guests</h5>
    //             <h5 className="text-md text-blackColor">
    //               {`${+infos.numberOfAdults + +infos.numberOfChildren} guests ${
    //                 +infos.numberOfInfants
    //                   ? ", " + infos.numberOfInfants + " infants"
    //                   : ""
    //               } ${
    //                 +infos.numberOfPets
    //                   ? ", " + infos.numberOfPets + " pets"
    //                   : ""
    //               }`}
    //             </h5>
    //           </div>
    //           <button
    //             onClick={() => setGuestsModel(true)}
    //             className="underline text-md font-medium"
    //           >
    //             Edit
    //           </button>
    //         </div>
    //       </div>
    //       <div className="w-5/12 border border-borderColor rounded-xl shadow p-8">
    //         <div className="flex gap-3 pb-4 border-b border-borderColor">
    //           <img
    //             src={
    //               listing?.images?.length > 0
    //                 ? listing.images[0].url
    //                 : "https://a0.muscache.com/im/pictures/ed3c3933-428a-435b-9161-196722bcf63d.jpg?aki_policy=large"
    //             }
    //             className="w-32 h-28 rounded-lg object-cover"
    //           />
    //           <div>
    //             <h4 className="text-md mb-1">{listing?.title}</h4>
    //             <span className="flex text-sm items-center gap-1">
    //               <span>
    //                 <Star />
    //               </span>
    //               <span>
    //                 {listing?.rating} ({listing?.reviews_length || 141} reviews)
    //               </span>
    //             </span>
    //           </div>
    //         </div>
    //         <div className="py-4 border-b border-borderColor">
    //           <h1 className="text-xl font-semibold">Price Details</h1>{" "}
    //           <div className="flex gap-3 mt-2">
    //             <div className="flex items-center justify-between w-full">
    //               <span className="block text-blackColor">
    //                 {listing?.price} x
    //                 {` ${
    //                   infos.checkout &&
    //                   infos.checkin &&
    //                   differenceInDays(
    //                     new Date(infos.checkout),
    //                     new Date(infos.checkin)
    //                   )
    //                 } `}
    //                 nights
    //               </span>
    //               <span className="block text-blackColor font-medium">
    //                 $
    //                 {infos.checkout &&
    //                   infos.checkin &&
    //                   +listing?.price?.split("$")[1] *
    //                     differenceInDays(
    //                       new Date(infos.checkout),
    //                       new Date(infos.checkin)
    //                     )}
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="pt-4 flex items-center justify-between">
    //           <span className="text-md font-semibold">Total(USD)</span>
    //           <span className="text-md font-medium">
    //             $
    //             {infos.checkout &&
    //               infos.checkin &&
    //               +listing?.price?.split("$")[1] *
    //                 differenceInDays(
    //                   new Date(infos.checkout),
    //                   new Date(infos.checkin)
    //                 )}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    //   <Footer />
    //   {guestsModel && (
    //     <GuestsModel
    //       infos={infos}
    //       setGuestsModel={setGuestsModel}
    //       guests={guests}
    //       setGuests={setGuests}
    //     />
    //   )}
    //   {dateModel && <DatesModel infos={infos} setDateModel={setDateModel} />}
    // </>

    <div>
      <main className="max-w-[1150px] min-h-screen py-[3.6rem] mx-auto pt-12">
        <Heading text={"Confirm and pay"} handleClick={() => router.push("-1")} />
        <div className="flex mt-14 px-3 gap-10">
          <div className="w-8/12">
            <h1 className="text-xl mb-4 font-medium heading-data">Your trip</h1>
            <div className="flex items-center justify-between w-full py-2">
              <div>
                <h5 className="text-lg  font-medium item-heading ">Dates</h5>
                {/* <h5 className="text-md text-blackColor">{infos.checkin && infos.checkout ?
  `${format(new Date(infos.checkin), "MMM dd")} - ${format(new Date(infos.checkout), "MMM dd")}`
  : "Dates not specified"}</h5> */}
                <h5 className="text-md item-paragraph">{`${
                  infos?.checkin && format(new Date(infos.checkin), "MMM dd")
                } - ${
                  infos?.checkout && format(new Date(infos.checkout), "MMM dd")
                }`}</h5>

              </div>
              <button
                onClick={() => setDateModel(true)}
                className="underline text-md font-medium edit-color"
              >
                EDIT
              </button>
            </div>
            <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
              <div>
                <h5 className="text-lg font-medium item-heading">Guests</h5>
                {/* <h5 className="text-md text-blackColor">
                  {`${+infos.numberOfAdults + +infos.numberOfChildren} guests ${
                    +infos.numberOfInfants
                      ? ", " + infos.numberOfInfants + " infants"
                      : ""
                  } ${
                    +infos.numberOfPets
                      ? ", " + infos.numberOfPets + " pets"
                      : ""
                  }`}
                </h5> */}
                <h5 className="text-md item-paragrapg">
                {`${+infos.numberOfAdults + +infos.numberOfChildren} guests ${
                    +infos.numberOfInfants
                      ? ", " + infos.numberOfInfants + " infants"
                      : ""
                  } ${
                    +infos.numberOfPets
                      ? ", " + infos.numberOfPets + " pets"
                      : ""
                  }`}
                </h5>
              </div>
              <button
                onClick={() => setGuestsModel(true)}
                className="underline text-md font-medium  edit-color"
              >
                EDIT
              </button>
            </div>
            <h1 className="text-xl mb-4 font-medium mt-5 heading-data">Upload ID</h1>
            <div className=" border-b border-borderColor">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <select
                      id="selectOption"
                      name="selectOption"
                      value={formData.selectOption}
                      onChange={handleChange}
                      className="mt-1 p-4 border rounded-full w-full"
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <input
                      type="file"
                      id="fileUpload"
                      name="fileUpload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="mt-1 p-4 border rounded-full w-full"
                      required
                    />
                  </div>
                </form>
            </div>
            <h1 className="text-xl mb-4 font-medium mt-5 heading-data">Required for your trip</h1>
            <div className='flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor'>

              <div className="ml-3 mt-4">
                <h1 className="text-lg  item-heading mb-2" >
                  Message the host
                </h1>
                <div className="flex flex-wrap justify-between mb-5">
                  <p className="item-pargraph"> Share why you're travelling, who's coming with you and what you love about the space.
                  </p>
                  <p  className="edit-color underline">
                    ADD
                  </p>
                </div>

                <h1 className="text-lg item-heading mb-2">
                  Phone number
                </h1>
                <div className="flex flex-wrap justify-between">
                  <p className="item-pargraph">
                    Add and confirm your phone number to get trip updates.
                  </p>
                  <p  className="edit-color underline">
                    ADD
                  </p>
                </div>
              </div>

            </div>
          <div className='flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor'>
            <div className="ml-3 mt-4">
              <h1 className="text-lg heading-data mb-4">
              Cancellation policy
              </h1>
              <div className="flex flex-wrap ">
                <p className="item-pargraph">
                  This reservation is non-refundable.
                </p>
                <p  className="underline edit-color">
                Learn More
                </p>
              </div>
            </div>
          </div>
         <div className="mt-5">
          <Button text={"Confirm & Pay"} 
                    design={"font-inter font-lg leading-tight text-center text-white w-96 bg-orange-300  border-2 p-4 rounded-full"} />
          </div>
          </div>
          <div className="w-5/12 border border-borderColor rounded-xl shadow p-8">
            <div className="flex gap-3 pb-4 border-b border-borderColor image-data">
            <Image 
    src={
        listing?.images?.length > 0
            ? listing.images[0].url
            : "https://a0.muscache.com/im/pictures/ed3c3933-428a-435b-9161-196722bcf63d.jpg?aki_policy=large"
    } 
    alt="Apartment"
    width={200}
    height={200}
/>

              {/* <img
                src={
                  listing?.images?.length > 0
                    ? listing.images[0].url
                    : "https://a0.muscache.com/im/pictures/ed3c3933-428a-435b-9161-196722bcf63d.jpg?aki_policy=large"
                }
                className="w-32 h-28 rounded-lg object-cover"
              /> */}
              <div>
                <h4 className="text-md mb-1">{listing?.title}</h4>
               <p>Entire Apartment </p>
                <span className="flex text-sm items-center gap-1">
                  <span>
                    <Star />
                  </span>
                  <span>
                    {listing?.rating || "4.5"} ({listing?.reviews_length || 141} reviews)
                  </span>
                </span>
              </div>
            </div>
            <div className="py-4 border-b border-borderColor confirm-details">
              <h1 className="">Price Details</h1>{" "}
              <div className="flex gap-3 mt-2">
                <div className="flex items-center justify-between w-full">
                  <span className="block text-blackColor">
                    {/* {listing?.price} x
                    {` ${
                      infos.checkout &&
                      infos.checkin &&
                      differenceInDays(
                        new Date(infos.checkout),
                        new Date(infos.checkin)
                      )
                    } `} */}
                    Nights
                  </span>
                  <span className="block text-blackColor font-medium">
                  ${
                      infos.checkout &&
                      infos.checkin &&
                      differenceInDays(
                        new Date(infos.checkout),
                        new Date(infos.checkin)
                      )
                    }
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="flex items-center justify-between w-full">
                  <span className="block text-blackColor">
                    {/* {listing?.price} x
                    {` ${
                      infos.checkout &&
                      infos.checkin &&
                      differenceInDays(
                        new Date(infos.checkout),
                        new Date(infos.checkin)
                      )
                    } `} */}
                    Charges Per Day
                  </span>
                  <span className="block text-blackColor font-medium confirm-price">
                   -{listing?.price}
                  </span>
                </div>

                

              </div>

              

             
            </div>
            <div className="pt-4 flex items-center justify-between confirm-total">
              <span className="">Total(INR)</span>
              <span className="text-md font-medium">
              $
                    {infos.checkout &&
                      infos.checkin &&
                      +listing?.price?.split("$")[1] *
                        differenceInDays(
                          new Date(infos.checkout),
                          new Date(infos.checkin)
                        )}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Book;