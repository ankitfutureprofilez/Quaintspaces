import { differenceInDays, format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Star from "../../public/_svgs/star";
import Link from "next/link";
import DatesModel from "../../components/book/DatesModel";
import GuestsModel from "../../components/book/GuestsModel";
import Head from "next/head";
import Heading from "../elements/Heading";
import Dateformat from "../elements/DateFormat"
import Moment from "moment";
import Image from "next/image";
import Button from "../elements/Button";
import Listings from "../api/laravel/Listings";
import AuthLayout from "../layout/AuthLayout";
import toast from "react-hot-toast";
import { formatMultiPrice } from "../../hooks/ValueData";
import useRazorpay from "react-razorpay";
import Modal from "../elements/Modal";

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


  const [cancelpolicy, setCancelpolicy] = useState([])
  const formattedCheckIn = `${infos?.checkin} ${listing?.check_in} `;
  const handleCancelPolicy = () => {
    const main = new Listings();
    const formData = new FormData();
    formData.append("uuid", listingID);
    formData.append("check_in", formattedCheckIn);
    const response = main.cancelpolicy(formData);
    response.then((res) => {
      if (res && res?.data && res?.data?.status) {
        setCancelpolicy(res?.data?.data)
      } else {
        toast.error(res.data.message);
      }
    })
      .catch((error) => {
        console.log("error", error);
      });

  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    handleCancelPolicy(signal);
    return () => controller.abort();
  }, [infos?.checkin, listing?.check_in]);

  const [guests, setGuests] = useState({
    adults: {
      value: +infos.adults || 0,
      max: 10,
      min: 0,
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



  useEffect(() => {
    const url = router.query;
    setInfos(url);
    const main = new Listings();
    main
      .PropertyDetail(url?.listingID)
      .then((r) => {
        setListing(r?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });

    setGuests({
      adults: {
        value: +url.numberOfAdults || 0,
        max: listing?.adults || 10,
        min: 0,
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
  }, [router.asPath]);


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
    const type = formData.type?.split("/");
    if (imageFormats.includes(type[1])) {
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
  const discountedPrice = discountPercentage > 0 ? calculateDiscountedPrice(originalPrice, discountPercentage) : originalPrice;

  useEffect(() => {
    if (infos.checkout && infos.checkin && listing) {
      let calculatedPriceRate =
        +discountedPrice *
        differenceInDays(new Date(infos.checkout), new Date(infos.checkin));
      calculatedPriceRate += listing?.cleaning_fee * differenceInDays(new Date(infos.checkout), new Date(infos.checkin));;
      if (listing?.guests < guests?.adults?.value + guests?.children?.value) {
        calculatedPriceRate +=
          (guests?.adults?.value +
            guests?.children?.value -
            listing?.guests) *
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


  const handleSubmit = () => {
    if (!formData.selectOption) {
      toast.error("Document type is required");
      return;
    }
    if (!formData.fornt) {
      toast.error("Document is required");
      return;
    }
    if (formData.phone.length === 0) {
      toast.error("Phone Number is required");
      return;
    }
    if (formData.phone.length !== 10) {
      toast.error("Invalid Phone Number");
      return;
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
    record.append(
      "price", pricerate);
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
  const [payloaing, setpayloading] = useState(false)
  const paymentsubmit = (orderId) => {
    setpayloading(true);
    // Receive orderId as a parameter
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
        console.log("error", error)

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


  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Confirm & Pay - QS Jaipur</title>
        </Head>
        <main className="max-w-[1150px] min-h-screen py-[3.6rem] mx-auto pt-12">
          <Heading
            text={loading ? "Processing..." : "Confirm & Pay"}
            handleClick={() => router.back()}
          />
          <div className="flex mt-3 sm:mt-8 md:mt-14 px-3 gap-10 your-trip-sec">
            <div className="w-8/12">
              <h2 className="text-xl mb-4 font-medium heading-data">
                Your Trip
              </h2>
              <div className="flex items-center justify-between w-full py-2">
                <div>
                  <h3 className="text-lg  font-medium item-heading ">Dates</h3>
                  <p className="text-md item-paragraph">{`${infos?.checkin && format(new Date(infos.checkin), "MMM dd")
                    } - ${infos?.checkout &&
                    format(new Date(infos.checkout), "MMM dd")
                    }`}</p>
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
                  <p className="text-md item-paragrapg">
                    {`${+guests?.adults?.value + +guests?.children?.value
                      } guests ${+infos.numberOfInfants
                        ? ", " + infos.numberOfInfants + " infants"
                        : ""
                      } ${+guests?.pets?.value
                        ? ", " + guests?.pets?.value + " pets"
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
              <h3 className="text-xl mb-4 font-medium mt-10 heading-data">
                Upload ID
              </h3>
              <div className=" border-b border-borderColor pb-4 md:pb-11">
                <form >
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
                    <input
                      type="file"
                      id="fileUpload"
                      name="fornt"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                      onChange={handleFileChange}
                      className="mt-1 p-4 border rounded-full w-full"
                      required
                    />
                  </div>
                </form>
              </div>
              <h2 className="text-[22px] mb-4 font-medium mt-11 heading-data">
                Required for your trip
              </h2>
              <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
                <div className=" ">
                  <h3 className="text-[18px]  item-heading mb-2">
                    Message the host
                  </h3>
                  <div className="flex flex-wrap justify-between mb-5">
                    <p className="item-pargraph">
                      {" "}
                      Share why you're travelling, who's coming with you and
                      what you love about the space.
                    </p>
                  </div>
                  <div className="mt-2 mb-2 sm:mb-4 flex">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 mr-1 p-2 sm:p-4 border rounded w-full"
                      placeholder="Enter a message for your host"
                    ></textarea>
                    {/* <button
                      onClick={() => {
                        if (formData.message.length === 0) {
                          toast.error("Mesage field is empty");
                          setHasAddedMessage(false);
                        } else {setHasAddedMessage(true);}
                        setMessageField(false);
                      }}
                      className="w-1/6 sort btn"
                    >
                      Confirm
                    </button> */}
                  </div>

                  <h1 className="text-lg item-heading mb-2">
                    Number <span className="text-red-700">*</span>
                  </h1>
                  <div className="flex flex-wrap justify-between">
                    <p className="item-pargraph">
                      Add and confirm your phone number to get trip updates.
                    </p>
                  </div>
                  <div className="mt-2 mb-2 sm:mb-4 flex">
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 mr-1 p-4 border rounded-full w-full"
                      placeholder="Enter your mobile number"
                      required
                    />

                    {/* <button
                      onClick={() => {
                        if (formData.phone.length != 10) {
                          toast.error("Invalid Phone Number");
                          return;
                        }
                        setHasAddedNumber(true);
                        setNumberField(false);
                      }}
                      className="w-1/6 sort btn"
                    >
                      Confirm
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
                <div className="mt-4 w-full">
                  <h1 className="text-lg heading-data mb-4 capitalize">
                    Cancellation policy
                  </h1>
                  <div className="flex flex-wrap justify-between">
                    <p className="item-pargraph">
                      {cancelpolicy?.text}
                    </p>
                    {/* <Link href="/terms" target="blank"> */}
                    <p className="underline edit-color font-bold" style={{ cursor: "pointer" }} onClick={openModal} >
                      Learn More
                    </p>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
              <div className="mt-11">
                {payloaing ? (
                  <Button
                    text={"Loading .."}
                    design={
                      "font-inter hover:bg-[#000] font-lg leading-tight text-center text-white w-full sm:w-96 bg-orange-300 p-4 rounded-full"
                    }
                  />
                ) : (

                  <Button
                    text={loading ? "Processing..." : "Confirm & Pay"}
                    design={
                      "font-inter hover:bg-[#fff] border-[#efa3a3] border hover:text-[#efa3a3] font-lg leading-tight text-center text-white w-full sm:w-96 bg-orange-300 sm:p-4 p-3 rounded-full"
                    }
                    onClick={handleSubmit}
                  />

                )}

              </div>
            </div>
            <div className="w-4/12  rounded-xl shadow py-8 px-5 h-fit golden-border sticky top-4">
              <div className="flex sm:flex-col lg:flex-row gap-3 pb-4 border-b border-borderColor image-data">
                <Image
                  src={
                    listing?.property_image && listing.property_image.length > 0
                      ? listing.property_image[0].image_url
                      : "/fallback_image_url"
                  }
                  alt="Apartment"
                  width={200}
                  height={200}
                  className="object-cover"
                />

                <div>
                  <h4 className="text-xl mb-1 capitalize">{listing?.name}</h4>
                  <h3 className=" text-lg capitalize">
                    {listing?.type?.replace("_", " ")}
                  </h3>
                  <span className="flex text-sm items-center gap-1">
                    <span>
                      <Star />
                    </span>
                    <span>
                      {listing?.rating}{" "}
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
                      <span className="block text-blackColor">
                        Charges Per Nights
                        ({formatMultiPrice(originalPrice)} * {infos.checkout &&
                          infos.checkin &&
                          differenceInDays(
                            new Date(infos.checkout),
                            new Date(infos.checkin)
                          )} )
                      </span>
                      <span className="block text-blackColor font-medium confirm-price min-w-[100px] ml-2 inline-flex justify-end">
                        <div className="flex justify-center">
                          <>
                            <div className="flex flex-col items-end">
                              <div className="text-lg text-green-800 font-bold">
                                {
                                  formatMultiPrice(discountedPrice * differenceInDays(new Date(infos.checkout), new Date(infos.checkin)))
                                }
                              </div>

                              <p className="text-red-700 text-sm line-through mt-1">
                                {
                                  formatMultiPrice(originalPrice * differenceInDays(new Date(infos.checkout), new Date(infos.checkin)))
                                }
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
                        Charges Per Nights
                        ({formatMultiPrice(originalPrice)} * {infos.checkout &&
                          infos.checkin &&
                          differenceInDays(
                            new Date(infos.checkout),
                            new Date(infos.checkin)
                          )} )
                      </span>
                      <span className="block text-blackColor font-medium confirm-price min-w-[100px] ml-2 inline-flex">
                        <div className="flex justify-center">
                          <>
                            <div className="flex flex-col items-center items-end">
                              <div className="text-lg font-bold">
                              </div>
                              <div className="  mt-1">
                                {
                                  formatMultiPrice(originalPrice * differenceInDays(new Date(infos.checkout), new Date(infos.checkin)))
                                }
                              </div>

                            </div>
                          </>
                        </div>
                      </span>
                    </div>
                  </div>
                )}
                <div className="pt-4 flex items-center border-b pb-2 justify-between confirm-total">
                  <span className="font-bold text-center ">Extra Charges </span>
                </div>
                <div className="flex gap-3 mt-2 border-b pb-2">
                  <div className="flex items-center justify-between w-full">
                    <span className="block text-blackColor">
                      Cleaning Fees Per Nights (
                      {formatMultiPrice(listing?.cleaning_fee || 0)} *  {infos.checkout &&
                        infos.checkin &&
                        differenceInDays(
                          new Date(infos.checkout),
                          new Date(infos.checkin)
                        )}
                      )
                    </span>
                    <span className="block text-blackColor font-medium confirm-price min-w-[100px] ml-2 inline-flex justify-end">
                      {formatMultiPrice(listing?.cleaning_fee * differenceInDays(new Date(infos.checkout), new Date(infos.checkin)))}
                    </span>
                  </div>
                </div>
                {listing?.guests < guests?.adults?.value + guests?.children?.value ? (
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
                      <span className="block text-blackColor font-medium confirm-price min-w-[100px] ml-2 inline-flex">
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
                      <span className="block text-blackColor font-medium confirm-price min-w-[100px] ml-2 inline-flex">
                        {formatMultiPrice(guests?.pets?.value * listing?.pet_fee)}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="pt-4 flex items-center justify-between confirm-total">
                <span className="font-bold">Total(INR)</span>
                <span className="text-md font-medium">{formatMultiPrice(pricerate)}</span>
              </div>
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
            <DatesModel infos={infos} setDateModel={setDateModel} />
          )}

          {isOpen && (
            <div className="max-w-3xl mx-auto">
              <Modal isOpen={isOpen} onClose={closeModal}>
                <p className="text-lg text-white font-semibold p-7 py-4 bg-[#efa3a3] capitalize">
                  Cancellation policy
                </p>
                <div className="py-4 px-6">

                  <div className="flex ">
                    <div className="w-[45%] ">
                      <h6 className="mb-2 text-[18px] font-semibold cancel-policy" >
                        {cancelpolicy?.date && (cancelpolicy?.date === new Date() ? "After" : "Before")}</h6>
                      <h6 className="mb-2 text-xl font-semibold cancel-policy" >{cancelpolicy?.date ? ("") : (<Dateformat item={formattedCheckIn} /> && "After")}</h6>
                    </div>
                    <div className="w-[55%] pl-3 border-l">
                      <h6 className="mb-2 text-[18px] font-semibold" >{cancelpolicy?.date && (cancelpolicy?.date === new Date() ? "" : "Full Refund")}</h6>
                      <h6 className="mb-2" >{cancelpolicy?.date ? ("") : (
                        <Dateformat item={formattedCheckIn} /> && "No Refund")}</h6>
                    </div>
                  </div>

                  <div className="flex border-bv border-b mb-4 ">
                    <div className="w-[45%]">

                      <p className="mb-4" >{cancelpolicy?.date ?
                        <Dateformat item={cancelpolicy?.date} />
                        : (<Dateformat item={cancelpolicy} />)}</p>
                    </div>
                    <div className="w-[55%] pl-3 border-l">
                      <p className="mb-4">{cancelpolicy?.text}</p>
                    </div>
                  </div>

                  {cancelpolicy?.date2 &&
                    <div className="mt-5 border-t-2  border-[#efa3a3]  p-4 ">
                      <div className="flex justify-between mb-3 border-b">
                        <div className="w-1/2">
                          <h6 className="mb-1 font-bold ">{cancelpolicy?.date2 === new Date() ? "After" : "Before"}</h6>
                        </div>
                        <div className="w-1/2">
                          <h6 className="mb-1 font-bold">{cancelpolicy?.date === new Date() ? "" : "Full Refund"}</h6>
                        </div>
                      </div>
                      <div className="flex  justify-between mb-3">
                        <div className="w-1/2">

                          <p className="mb-1 font-normal w-1/2">
                            <Dateformat item={cancelpolicy?.date2} />
                          </p>
                        </div><div className="w-1/2">

                          <p className="mb-1 w-1/2">{cancelpolicy?.text2}</p>
                        </div>
                      </div>
                    </div>
                  }


                  <p className="font-normal   capitalize" >Cleaning fees are refunded if you cancel before check-in. </p>
                  <p className="underline mt-2 font-bold cursor-pointer  text-[#efa3a3]" >Learn more about <Link href="/terms" target="_blank">cancellation policies</Link></p>
                </div>
                <div className="mb-4 flex justify-center"></div>
              </Modal>
            </div>
          )
          }
        </main>
      </div>
    </AuthLayout>
  );
};

export default Book;
