import { differenceInDays, format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Star from "../../public/_svgs/star";
import Link from "next/link";
import DatesModel from "../../components/book/DatesModel";
import GuestsModel from "../../components/book/GuestsModel";
import Head from "next/head";
import Heading from "../elements/Heading";
import Dateformat from "../elements/DateFormat";
import Moment from "moment";
import Image from "next/image";
import Button from "../elements/Button";
import Listings from "../api/laravel/Listings";
import AuthLayout from "../layout/AuthLayout";
import toast from "react-hot-toast";
import { formatMultiPrice } from "../../hooks/ValueData";
import useRazorpay from "react-razorpay";
import Modal from "../elements/Modal";
import StartRating from "../elements/StartRating";

const Book = () => {
  const router = useRouter();
  const [Razorpay] = useRazorpay();
  const RAZOPAY_KEY = process.env.NEXT_PUBLIC_RAZOPAY_KEY;
  const { listingID } = router.query;
  const [listing, setListing] = useState([]);
  const [infos, setInfos] = useState({});
  const [dateModel, setDateModel] = useState(false);
  const [guestsModel, setGuestsModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pricerate, setPriceRate] = useState(0);
  const [orderId, setOrderId] = useState("");

  const recorddate = Moment(new Date())?.format("DD-MM-YYYY");
  const [formData, setFormData] = useState({
    selectOption: "",
    fornt: null,
    message: "",
    phone: "",
    date: recorddate,
  });

  const [cancelpolicy, setCancelpolicy] = useState([]);
  const formattedCheckIn = `${infos?.checkin} ${listing?.check_in} `;
  const handleCancelPolicy = () => {
    if(listingID && formattedCheckIn){
    const main = new Listings();
    const formData = new FormData();
    formData.append("uuid", listingID);
    formData.append("check_in", formattedCheckIn);
    const response = main.cancelpolicy(formData);
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          setCancelpolicy(res?.data?.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if(formattedCheckIn && listingID ){
      handleCancelPolicy(signal);
    }
    return () => controller.abort();
  }, [infos?.checkin, listing?.check_in]);

  const [guests, setGuests] = useState({
    adults: {
      value: +infos.adults || 0,
      max: 10,
      min: 1,
    },
    children: {
      value: +infos.children || 0,
      max: 10,
      min: 0,
    },
    infants: {
      value: +infos.numberOfInfants || 0,
      max: 2,
      min: 0,
    },
    pets: {
      value: +infos.pets || 0,
      max: 10,
      min: 0,
    },
  });
  const [detailsLoading, setDtLoading] = useState(true);
  const url = router.query;

  useEffect(() => {
    setInfos(url);
  }, [url]);

  const fetchDetails = () => {
    if(url?.listingID){
    setDtLoading(true);
    setInfos(url);
    const main = new Listings();
    main
      .PropertyDetail(url?.listingID)
      .then((r) => {
        console.log("details", r?.data?.data)
        setListing(r?.data?.data);
        setDtLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setDtLoading(false);
      });
    setGuests({
      adults: {
        value: +url.numberOfAdults || 0,
        max: listing?.adults || 10,
        min: 1,
      },
      infants: {
        value: +url.numberOfInfants || 0,
        max: 2,
        min: 0,
      },
      children: {
        value: +url.numberOfChildren || 0,
        max: listing?.children || 10,
        min: 0,
      },
      pets: {
        value: +url.numberOfPets || 0,
        max: listing?.no_of_pet_allowed || 10,
        min: 0,
      },
    });
  }
  }
  // const [checkinYear, checkinMonth, checkinDay] = infos?.checkin.split("-");
  // const [checkoutYear, checkoutMonth, checkoutDay] = infos?.checkout.split("-");
  useEffect(() => {
    if (url?.listingID) {
      fetchDetails();
    }
  }, [url?.listingID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const imageFormats = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "tif",
      "tiff",
      "svg",
      "webp",
      "avif",
    ];
    const formData = e.target.files[0];
    const type = formData?.type?.split("/");
    if (imageFormats?.includes(type[1])) {
      setFormData((prevState) => ({
        ...prevState,
        fornt: formData,
      }));
    } else {
      toast.error("Invalid Image type! Only jpg, svg, png, avif are accepted");
    }
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  };
  // Assuming listing?.price and listing?.discount_offer are numbers
  const originalPrice = listing?.price ?? 0;
  const discountPercentage = listing?.discount_offer ?? 0;
  const discountedPrice =
    discountPercentage > 0
      ? calculateDiscountedPrice(originalPrice, discountPercentage)
      : originalPrice;

  useEffect(() => {
    if (infos.checkout && infos.checkin && listing) {
      let calculatedPriceRate =
        +discountedPrice *
        differenceInDays(new Date(infos.checkout), new Date(infos.checkin));
      calculatedPriceRate +=
        listing?.cleaning_fee *
        differenceInDays(new Date(infos.checkout), new Date(infos.checkin));
      if (listing?.guests < guests?.adults?.value + guests?.children?.value) {
        calculatedPriceRate +=
          (guests?.adults?.value + guests?.children?.value - listing?.guests) *
          listing?.extra_guest_fee;
      }
      if (guests?.pets?.value > 0) {
        calculatedPriceRate += guests?.pets?.value * listing?.pet_fee;
      }
      setPriceRate(calculatedPriceRate);
    } else {
      setPriceRate(0);
    }
  }, [infos.checkout, infos.checkin, listing, guests]);

  const doc = useRef();
    
  const handleSubmit = () => {
    if (!formData.selectOption) {
      toast.error("Document type is required");
      doc.current.focus();
      return false;
    }
    if (!formData.fornt) {
      toast.error("Document is required");
      return false;
    }
    if (formData.phone.length === 0) {
      toast.error("Phone number is required");
      return false;
    }
    if (formData.phone.length !== 10) {
      toast.error("Invalid phone number");
      return false;
    }
    if (guests?.adults?.value > listing?.adults) {
      toast.error(
        `Number of adults exceeds the allowed limit ${listing?.adults}`
      );
      return;
    }
    if (guests?.children?.value > listing?.children) {
      toast.error(
        `Number of children exceeds the allowed limit ${listing?.children}`
      );
      return;
    }

    if (guests?.pets?.value > listing?.no_of_pet_allowed) {
      toast.error(
        `Number of pets exceeds the allowed limit ${listing?.no_of_pet_allowed}`
      );
      return;
    }
    if (loading) return;
    setLoading(true);
    const main = new Listings();
    const record = new FormData();
    record.append("price", pricerate);
    record.append("currency", "INR");
    record.append("payment_date", formData?.date);

    main
      .PropertyBooking(record)
      .then((res) => {
        if (res && res?.data && res?.data?.orderId) {
          const options = {
            key: RAZOPAY_KEY,
            amount: 1000,
            currency: "INR",
            name: "Your Company Name",
            description: "Payment for services",
            order_id: res?.data?.orderId,
            handler: function (response) {
              paymentsubmit(res?.data?.orderId);
              toast.success("Payment Successful");
              setOrderId(res?.data?.orderId);
              // return false;
              localStorage &&
                localStorage.setItem("response", JSON.stringify(response));
            },
            prefill: {
              name: "Customer Name",
              email: "customer@example.com",
              contact: "1234567890",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#F37254",
            },
          };
          const rzp = new Razorpay(options);
          rzp.on("payment.failed", function (response) {
            toast.error("Payment Failed");
            router.push(`/cancel/${listingID}`);
          });
          rzp.open();
        } else {
          toast.error(res?.data?.message || "Failed to create order");
        }
      })
      .catch((error) => {
        //  Errors(error);
        toast.error("Error creating order", error);
      })
      .finally(() => setLoading(false));
  };
  const [payloading, setpayloading] = useState(false);

 
    const paymentsubmit = (orderId) => {
      
      setpayloading(true);
    const main = new Listings();
    const record = new FormData();
    record.append("property_uid", listingID);
    record.append("check_in", infos.checkin);
    record.append("check_out", infos.checkout);
    record.append("adults", guests?.adults?.value);
    record.append("children", guests?.children?.value);
    record.append("infants", guests?.infants?.value);
    record.append("doc_type", formData.selectOption);
    record.append("front_doc", formData.fornt);
    record.append("no_of_pet", guests?.pets?.value);
    record.append("phone_no", formData.phone);
    record.append("razorpay_order_id", orderId);
    record.append("price", pricerate);
    main
      .bookingpayment(record)
      .then((res) => {
        if (res) {
          if (res?.data?.status == true) {
            toast.success(res?.data?.message);
            router.push(`/success/${listingID}`);
            setpayloading(false);
          } else {
            toast.error(res?.data?.message);
            setpayloading(false);
          }
        } else {
          toast.error(res?.data?.message);
          setpayloading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);

        setpayloading(false);
        // Errors(error);
      })
      .finally(() => setLoading(false));
  };

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

  useEffect(() => {
    if (guestsModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [guestsModel]);

  dateModel;
  useEffect(() => {
    if (dateModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [dateModel]);
  console.log("cancelpolicy",cancelpolicy);

  return (
    <AuthLayout>
      <div className="container" >
        <Head>
          <title>Confirm & Pay - Quaint Spaces Jaipur</title>
        </Head>

        {detailsLoading ?
          <>
            <div className=" w-full flex items-center justify-content-center pt-[100px] pt-[30vh] pb-[40vh]" >
              <div role="status" className="text-center m-auto table">
                <svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin fill-blue-600 m-auto table" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <p className="mt-4 text-xl text-black" >LOADING....</p>
              </div>
            </div>
          </> :
          <main
            className={
              dateModel
                ? "max-w-[1150px] min-h-screen mx-auto py-5 md:py-12 overflow-hidden"
                : "max-w-[1150px] min-h-screen mx-auto py-5 md:py-12"
            }
          >
            <div className="">
              <Heading
                text={loading ? "Processing..." : "Confirm & Pay"}
                handleClick={() => router.back()}
              />
            </div>
            <div className="flex flex-col lg:flex-row mt-3 sm:mt-8 md:mt-14 lg:gap-10 your-trip-sec">
              <div className="w-full lg:w-8/12">
                <h3 className="text-2xl mb-4 font-medium heading-data">
                  Your Trip
                </h3>
                <div className="flex items-center justify-between w-full py-2">
                  <div>
                    <h3 className="text-lg  font-medium item-heading ">Dates</h3>
                    {/* {checkinYear !== checkoutYear ?
                    <p className="text-md item-paragraph">
                      {`${infos?.checkin && format(new Date(infos.checkin), "dd MMM YY")
                      } - ${infos?.checkout &&
                      format(new Date(infos.checkout), "dd MMM YY")
                      }`}</p> 
                    : checkinMonth !== checkoutMonth?
                     <p className="text-md item-paragraph">
                      {`${infos?.checkin && format(new Date(infos.checkin), "dd MMM")
                      } - ${infos?.checkout &&
                      format(new Date(infos.checkout), "dd  MMM")
                      }`}</p>
                      :
                      <p className="text-md item-paragraph">
                      {`${infos?.checkin && format(new Date(infos.checkin), "dd")
                      } - ${infos?.checkout &&
                      format(new Date(infos.checkout), "dd  MMM")
                      }`}</p>
                    } */}
                    <p className="text-md item-paragraph">
                      {`${infos?.checkin && format(new Date(infos.checkin), "dd MMM")
                      } - ${infos?.checkout &&
                      format(new Date(infos.checkout), "dd  MMM")
                      }`}</p>
                  </div>
                  <button
                    onClick={() => setDateModel(true)}
                    className={
                      dateModel
                        ? "underline text-md font-medium edit-color overflow-hidden"
                        : "underline text-md font-medium edit-color"
                    }
                  >
                    EDIT
                  </button>
                </div>
                <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
                  <div>
                    <h5 className="text-lg font-medium item-heading">Guests</h5>
                    <p className="text-md item-paragrapgh">
                      {`${+guests?.adults?.value + +guests?.children?.value} ${+guests?.adults?.value + +guests?.children?.value > 1
                          ? "guests"
                          : "guest"
                        }${+guests?.infants?.value
                          ? `, ${guests?.infants?.value} ${+guests?.infants?.value > 1 ? "infants" : "infant"
                          }`
                          : ""
                        }${+guests?.pets?.value
                          ? `, ${guests?.pets?.value} ${+guests?.pets?.value > 1 ? "pets" : "pet"
                          }`
                          : ""
                        }`}
                    </p>
                  </div>
                  <button
                    onClick={() => setGuestsModel(true)}
                    className="underline text-md font-medium  edit-color"
                  >
                    EDIT
                  </button>
                </div>
                <h3 className="text-2xl mb-4 font-medium mt-10 heading-data">
                  Upload ID
                </h3>

                <div className=" border-b border-borderColor pb-4 md:pb-11">
                  <form>
                    <div className="mb-4">
                      <div className="w-ful mt-1 pr-4 border rounded-full ">
                        <select
                          id="selectOption"
                          name="selectOption"
                          value={formData.selectOption}
                          onChange={handleChange}
                          className="p-4 w-full rounded-full outline-none"
                          required
                        >
                          <option value="">Choose...</option>
                          <option value="aadhar">Aadhar Card</option>
                          <option value="pan">PAN Card</option>
                          <option value="voterid">Voter ID</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <input ref={doc}
                        type="file"
                        id="fileUpload"
                        name="fornt"
                        accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                        onChange={handleFileChange}
                        className="mt-1 p-4 rounded-full w-full border-2 focus:border-blue-500"
                        required
                      />
                    </div>
                  </form>
                </div>
                <h3 className="text-2xl mb-4 font-medium mt-10 heading-data capitalize">
                  Required for your trip
                </h3>
                <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
                  <div className=" ">
                    <h1 className="text-lg  mb-2  font-medium item-heading">
                      Number <span className="text-red-700">*</span>
                    </h1>
                    <div className="flex flex-wrap justify-between">
                      <p className="item-pargraph">
                        Add and confirm your phone number to get trip updates.
                      </p>
                    </div>
                    <div className="mt-2 mb-2 sm:mb-4 flex">
                      <div className="relative w-full" >
                        <span className="absolute top-[16px] left-2 flex items-center px-2 text-normal text-gray-800">+91</span>
                        <input
                          type="number"
                          id="phone"
                          name="phone" max="10" min='1'
                          value={formData?.phone}
                          onChange={handleChange}
                          className="mt-1 mr-1 p-4 h-[50px] border rounded-full w-full !ps-[50px]"
                          placeholder="Enter your mobile number"
                          required
                        />

                      </div>
                    </div>

                    <h3 className="  text-lg  mb-2  font-medium item-heading">
                      Message the host
                    </h3>
                    <div className="flex flex-wrap justify-between mb-5">
                      <p className="item-pargraph">
                        Share why you're travelling, who's coming with you and
                        what you love about the space.
                      </p>
                    </div>
                    <div className="mt-2 mb-2 sm:mb-4 flex">
                      <textarea
                        id="message"
                        name="message"
                        value={formData?.message}
                        onChange={handleChange}
                        className="mt-1 mr-1 p-2 sm:p-4 border rounded w-full"
                        placeholder="Enter a message for your host"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
                  <div className="mt-4 w-full">
                    <h3 className="text-2xl mb-4 font-medium sm:mt-10 heading-data capitalize">
                      Cancellation policy
                    </h3>
                    <div className="flex flex-wrap justify-between">
                      <p className="item-pargraph text-[15px] mb-[10px]">
                      {listing?.is_refundable == 1?
                      <>Bookings are refundable if you cancel at least 5 days before check-in.{" "}</>
                      : 
                      <>
                      Booking is completely non-refundable. No amount will be refunded under any circumstance.{" "} 
                      </> }
                      </p>                      
                      <p className="item-pargraph text-[15px] mb-[10px]">
                        {cancelpolicy?.text}{"."}
                      </p>
                      <p
                        className="underline edit-color font-bold"
                        style={{ cursor: "pointer" }}
                        onClick={openModal}
                      >
                        Learn More
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-11 hidden lg:block">
                  {payloading ? (
                    <Button
                      text={"Loading .."}
                      design={
                        "font-inter hover:bg-[#ffffff] border-[#efa3a3] border hover:text-[#efa3a3] font-lg leading-tight text-center text-white w-full sm:w-96 bg-[#efa3a3] sm:p-4 p-3 rounded-full"
                      }
                    />
                  ) : (
                    <Button
                      text={loading ? "Processing..." : "Confirm & Pay"}
                      design={
                        "font-inter hover:bg-[#ffffff] border-[#efa3a3] border hover:text-[#efa3a3] font-lg leading-tight text-center text-white w-full sm:w-96 bg-[#efa3a3] sm:p-4 p-3 rounded-full"
                      }
                      onClick={handleSubmit}
                    />
                  )}
                </div>
              </div>

              <div className="w-full lg:w-4/12 rounded-xl shadow py-8 px-5 h-fit golden-border lg:sticky top-4">
                <div className="flex sm:flex-col md:flex-row gap-3 pb-4 border-b border-borderColor image-data">
                  <Image
                    src={
                      listing?.property_image &&
                        listing?.property_image?.length > 0
                        ? listing.property_image[0].image_url
                        : "/fallback_image_url"
                    }
                    alt="Apartment"
                    width={200}
                    height={200}
                    className="object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="text-2xl mb-1 capitalize">{listing?.name}</h4>
                    <h3 className=" text-lg capitalize">
                      {listing?.type?.replace("_", " ")}
                    </h3>
                    <span className="flex text-sm items-center gap-1">
                      <span>
                        <StartRating
                          size={15}
                          value={listing?.rating}
                          color={"#000000"}
                        />
                      </span>
                    </span>
                    <span className="flex text-sm items-center gap-2 mt-2">
                      <span>
                        {listing?.review ? listing?.review + " reviews" : ""}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="py-4 confirm-details">
                  <h1 className="">Price Details</h1>{" "}
                  <div className="flex gap-3 mt-2 border-b pb-2">
                    <div className="flex items-center justify-between w-full">
                      <span className="block text-blackColor">Nights</span>
                      <span className="block text-blackColor font-medium">
                        {infos.checkout &&
                          infos.checkin &&
                          differenceInDays(
                            new Date(infos.checkout),
                            new Date(infos.checkin)
                          )}
                      </span>
                    </div>
                  </div>
                  {discountPercentage !== 0 ? (
                    <div className="flex gap-3 mt-2 border-b pb-2">
                      <div className="flex items-center justify-between w-full">
                        <span className=" text-blackColo pe-3">
                          Charges Per Nights 
                          <span className="block w-full">
                          ({formatMultiPrice(originalPrice)} *{" "}
                          {infos.checkout &&
                            infos.checkin &&
                            differenceInDays(
                              new Date(infos.checkout),
                              new Date(infos.checkin)
                            )}{" "}
                          )
                          </span>
                        </span>
                        <span className=" text-blackColor font-medium confirm-price ml-2 inline-flex ">
                          <div className="flex justify-center">
                            <>
                              <div className="flex flex-col items-end">
                                <div className="text-lg text-green-800 font-bold">
                                  {formatMultiPrice(
                                    discountedPrice *
                                    differenceInDays(
                                      new Date(infos.checkout),
                                      new Date(infos.checkin)
                                    )
                                  )}
                                </div>

                                <p className="text-red-700 text-sm line-through mt-1">
                                  {formatMultiPrice(
                                    originalPrice *
                                    differenceInDays(
                                      new Date(infos.checkout),
                                      new Date(infos.checkin)
                                    )
                                  )}
                                </p>
                                {discountPercentage && (
                                  <p className="text-green-700  mt-1">
                                    {`( ${discountPercentage}% off )`}
                                  </p>
                                )}
                              </div>
                            </>
                          </div>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3 mt-2 border-b pb-2">
                      <div className="flex items-center justify-between w-full">
                        <span className="block text-blackColor">
                          Charges per nights 
                          <span className="block w-full">
                          ({formatMultiPrice(originalPrice)} *{" "}
                          {infos.checkout &&
                            infos.checkin &&
                            differenceInDays(
                              new Date(infos.checkout),
                              new Date(infos.checkin)
                            )}{" "}
                          )
                          </span>
                        </span>
                        <span className="block text-blackColor font-medium confirm-price">
                          <div className="flex justify-center">
                            <>
                              <div className="flex flex-col items-center items-end">
                                <div className="text-lg font-bold"></div>
                                <div className="  mt-1">
                                  {formatMultiPrice(
                                    originalPrice *
                                    differenceInDays(
                                      new Date(infos.checkout),
                                      new Date(infos.checkin)
                                    )
                                  )}
                                </div>
                              </div>
                            </>
                          </div>
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="pt-4 flex items-center justify-between confirm-total">
                    <span className="font-bold text-center !text-black">Extra charges </span>
                  </div>
                  <div className="flex gap-3 mt-2 border-b pb-2">
                    <div className="flex items-center justify-between w-full">
                      <span className="block text-blackColor">
                        Cleaning fees per night
                        <span className="w-full block" >
                        (
                        {formatMultiPrice(listing?.cleaning_fee || 0)} *{" "}
                        {infos.checkout &&
                          infos.checkin &&
                          differenceInDays(
                            new Date(infos.checkout),
                            new Date(infos.checkin)
                          )}
                        )
                        </span>
                      </span>
                      <span className="block text-blackColor font-medium confirm-price min-w-[100px] ml-2 inline-flex justify-end">
                        {formatMultiPrice(
                          listing?.cleaning_fee *
                          differenceInDays(
                            new Date(infos.checkout),
                            new Date(infos.checkin)
                          )
                        )}
                      </span>
                    </div>
                  </div>
                  {listing?.guests <
                    guests?.adults?.value + guests?.children?.value ? (
                    <div className="flex gap-3 mt-2 border-b pb-2">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="block text-blackColor text-sm">
                            Extra Guest Fees
                          </span>
                          <span className="block !text-[15px] text-blackColor text-sm">
                            {guests?.adults?.value +
                              guests?.children?.value -
                              listing?.guests}
                            {" x "}
                            {formatMultiPrice(listing?.extra_guest_fee)}
                          </span>
                        </div>
                        <span className="block text-blackColor font-medium confirm-price ml-2 inline-flex">
                          {formatMultiPrice(
                            (guests?.adults?.value +
                              guests?.children?.value -
                              listing?.guests) *
                            listing?.extra_guest_fee
                          )}
                        </span>
                      </div>
                    </div>
                  ) : null}
                  {guests?.pets?.value > 0 ? (
                    <div className="flex gap-3 mt-2 border-b pb-2">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="block text-blackColor text-sm">
                            Pet Fees
                          </span>
                          <span className="block !text-[15px] text-blackColor text-sm">
                            {guests?.pets?.value}
                            {" x "}
                            {formatMultiPrice(listing?.pet_fee)}
                          </span>
                        </div>
                        <span className="block text-blackColor font-medium confirm-price ml-2 inline-flex">
                          {formatMultiPrice(
                            guests?.pets?.value * listing?.pet_fee
                          )}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                

                <div className="pt-4 flex items-center justify-between confirm-total">
                  <span className="font-bold">Total(INR)</span>
                  <span className="text-md font-medium">
                    {formatMultiPrice(pricerate)}
                  </span>
                </div>
              </div>

              <div className="pt-4 block lg:hidden">
                  {payloading ? (
                    <Button
                      text={"Loading .."}
                      design={
                        "font-inter hover:bg-[#ffffff] border-[#efa3a3] border hover:text-[#efa3a3] font-lg leading-tight text-center text-white w-full bg-[#efa3a3] sm:p-4 p-3 rounded-full"
                      }
                    />
                  ) : (
                    <Button
                      text={loading ? "Processing..." : "Confirm & Pay"}
                      design={
                        "font-inter hover:bg-[#ffffff] border-[#efa3a3] border hover:text-[#efa3a3] font-lg leading-tight text-center text-white w-full bg-[#efa3a3] sm:p-4 p-3 rounded-full"
                      }
                      onClick={handleSubmit}
                    />
                  )}
                </div>
              
            </div>

            {guestsModel && (
              <GuestsModel
                infos={infos}
                setGuestsModel={setGuestsModel}
                guests={guests}
                setGuests={setGuests}
              />
            )}
            {dateModel && (
              <>
              <DatesModel infos={infos} setInfos={setInfos} setDateModel={setDateModel} />
              </>
            )}
            {isOpen && (
              <div className="max-w-3xl mx-auto">
                <Modal width="md" isOpen={isOpen} onClose={closeModal}>
                  <p className="text-lg text-white font-semibold p-7 py-4 bg-[#efa3a3] capitalize">
                    Cancellation policy
                  </p>
                  <div className="py-4 px-6">
                    {/* <div className="flex ">
                      <div className="w-[45%] ">
                        <h6 className="mb-2 text-[18px] font-semibold cancel-policy">
                          {cancelpolicy?.date &&
                            (cancelpolicy?.date === new Date()
                              ? "After"
                              : "Before")}
                        </h6>
                        <h6 className="mb-2 text-2xl font-semibold cancel-policy">
                          {cancelpolicy?.date
                            ? ""
                            : <Dateformat item={formattedCheckIn} /> && "After"}
                        </h6>
                      </div>
                      <div className="w-[45%] border-l">
                        <h6 className="mb-2 text-[18px] ml-3 font-semibold cancel-policy">
                          {cancelpolicy?.date &&
                            (cancelpolicy?.date === new Date()
                              ? ""
                              : "Full Refund")}
                        </h6>

                        <h6 className="mb-2">
                          {cancelpolicy?.date
                            ? ""
                            : <Dateformat item={formattedCheckIn} /> &&
                            "No Refund"}
                        </h6>
                      </div>
                    </div>
                    <div className="flex border-bv border-b mb-4 ">
                      <div className="w-[45%]">
                        <p className="mb-4">
                          {cancelpolicy?.date ? (
                            <Dateformat item={cancelpolicy?.date} />
                          ) : (
                            <Dateformat item={cancelpolicy} />
                          )}
                        </p>
                      </div>
                      <div className="w-[55%] pl-3 border-l">
                        <p className="mb-4">{cancelpolicy?.text}</p>
                      </div>
                    </div> */}
                    {/* {cancelpolicy?.date2 &&
                      <div>
                        <div className="flex ">
                          <div className="w-1/2">
                            <h6 className="mb-1 font-bold ">
                              {cancelpolicy?.date2 === new Date()
                                ? "After"
                                : "Before"}
                            </h6>
                          </div>
                          <div className="w-1/2">
                            <h6 className="mb-1 font-bold">
                              {cancelpolicy?.date === new Date()
                                ? ""
                                : "Full Refund"}
                            </h6>
                          </div>
                        </div>
                        <div className="flex border-bv border-b mb-4">
                          <div className="w-1/2">
                            <p className="mb-1 ">
                              <Dateformat item={cancelpolicy?.date2} />
                            </p>
                          </div>
                          <div className="w-[55%] pl-3 border-l">
                            <p className="mb-4">{cancelpolicy?.text2}</p>
                          </div>
                        </div>
                      </div>
                    } */}
                    <p className="font-normal">
                      {listing?.is_refundable == 1?
                      <>Bookings are refundable if you cancel at least 5 days before check-in.{" "}</>
                      : 
                      <>
                      Booking is completely non-refundable. No amount will be refunded under any circumstance.{" "} 
                      </> }
                    </p>
                    {/* <p className="font-normal capitalize">
                      Cleaning fees are refunded if you cancel before check-in.{" "}
                    </p> */}
                    <p className="underline mt-2 font-bold cursor-pointer  text-[#efa3a3]">
                      Learn more about{" "}
                      <Link href="/terms/#cancel_rules" target="_blank">
                        cancellation policies
                      </Link>
                    </p>
                  </div>
                  {/* <div className="mb-4 flex justify-center"></div> */}
                </Modal>
              </div>
            )}
          </main>
        }
      </div>
    </AuthLayout>
  );
};

export default Book;
