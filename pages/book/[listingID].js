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
import Moment from "moment";
import Image from "next/image";
import Button from "../elements/Button";
import Listings from "../api/laravel/Listings";
import AuthLayout from "../layout/AuthLayout";
import toast from "react-hot-toast";
import { formatMultiPrice } from "../../hooks/ValueData";
import useRazorpay from "react-razorpay";

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


  console.log("pricerate", pricerate)
  const recorddate = Moment(new Date())?.format("DD-MM-YYYY");
  const [formData, setFormData] = useState({
    selectOption: "",
    fornt: null,
    message: "",
    phone: "",
    date: recorddate,
  });

  // useEffect(() => {
  //   const url = router.query;
  //   setInfos(url);
  //   const main = new Listings();
  //   main
  //     .PropertyDetail(url.listingID)
  //     .then((r) => {
  //       setListing(r?.data?.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //     console.log("booking page",listing)

  //   setGuests({
  //     adults: {
  //       value: +url.numberOfAdults || 0,
  //       max: listing?.adults || 5,
  //       min: 0,
  //     },
  //     children: {
  //       value: +url.numberOfChildren || 0,
  //       max: listing?.children || 5,
  //       min: 0,
  //     },
  //     pets: {
  //       value: +url.numberOfPets || 0,
  //       max: listing?.no_of_pet_allowed || 5,
  //       min: 0,
  //     },
  //   });
  // }, [router.asPath]);

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
    pets: {
      value: +infos.pets || 0,
      max: 10,
      min: 0,
    },
  });

  console.log("guests",guests)
  // console.log("infos", infos);
  // console.log("guests", guests);

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
        value: +url.infants || 0,
        max: listing?.infants || 2,
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

  console.log("guests",guests)
  
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

  //   record.append("front_doc", formData.fornt);
  //   record.append("no_of_pet", infos.numberOfPets);
  //   record.append("phone_no", formData.phone);
  //   record.append("razorpay_order_id", orderId);
  //   record.append(
  //     "price",
  //     infos.checkout && infos.checkin &&
  //     +listing?.price * differenceInDays(new Date(infos.checkout), new Date(infos.checkin))
  //   );
  //   main.bookingpayment(record)
  //     .then((res) => {
  //       if (res) {
  //         toast.success(res?.data?.message);
  //       } else {
  //         toast.error(res?.data?.message);
  //       }
  //     })
  //     .catch((error) => {
  //       // Errors(error);
  //     })
  //     .finally(() => setLoading(false));
  // };

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
    console.log("listing?.no_of_pet_allowed",listing?.no_of_pet_allowed)
    console.log("guests?.pets?.value",guests?.pets?.value)

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
              toast.success("Payment Successful");
              setOrderId(res?.data?.orderId);
              // return false;
              localStorage &&
                localStorage.setItem("response", JSON.stringify(response));
              paymentsubmit(res?.data?.orderId);
            },
            prefill: {
              name: "Customer Name",
              email: "customer@example.com",
              contact: "8824744976",
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
            paymentsubmit(res?.data?.orderId);
            toast.error("Payment Failed");
            router.push(`/cancel/${listingID}`);
          });
          rzp.open();
        } else {
          toast.error(res?.data?.message || "Failed to create order");
        }
      })
      .catch((error) => {
        // Errors(error);
        toast.error("Error creating order");
      })
      .finally(() => setLoading(false));
  };

  const paymentsubmit = (orderId) => {
    // Receive orderId as a parameter
    const main = new Listings();
    const record = new FormData();
    record.append("property_uid", listingID);
    record.append("check_in", infos.checkin);
    record.append("check_out", infos.checkout);
    record.append("adults", guests?.adults?.value);
    record.append("children", guests?.children?.value);
    record.append("infants", guests?.infants?.value );
    record.append("doc_type", formData.selectOption);
    record.append("front_doc", formData.fornt);
    record.append("no_of_pet", guests?.pets?.value);
    record.append("phone_no", formData.phone);
    record.append("razorpay_order_id", orderId);
    record.append(
      "price",
      infos.checkout &&
      infos.checkin &&
      +listing?.price *
      differenceInDays(new Date(infos.checkout), new Date(infos.checkin))
    );
    main
      .bookingpayment(record)
      .then((res) => {
        if (res) {
          if (res?.data?.status == true) {
            toast.success(res?.data?.message);
            router.push(`/success/${listingID}`);
          }
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        // Errors(error);
      })
      .finally(() => setLoading(false));
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
              <div className=" border-b border-borderColor pb-11">
                <form>
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
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="voterid">Voter ID</option>
                    </select>
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
              <h3 className="text-xl mb-4 font-medium mt-11 heading-data">
                Required for your trip
              </h3>
              <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
                <div className="ml-3 mt-4">
                  <h1 className="text-lg  item-heading mb-2">
                    Message the host
                  </h1>
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
                      className="mt-1 mr-1 p-4 border rounded w-full"
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
                    Phone number <span className="text-red-700">*</span>
                  </h1>
                  <div className="flex flex-wrap justify-between">
                    <p className="item-pargraph">
                      Add and confirm your phone number to get trip updates.
                    </p>
                  </div>
                  <div className="mt-2 mb-2 sm:mb-4 flex">
                    <input
                      type="tel"
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
                <div className="ml-3 mt-4 w-full">
                  <h1 className="text-lg heading-data mb-4">
                    Cancellation policy
                  </h1>
                  <div className="flex flex-wrap justify-between">
                    <p className="item-pargraph">
                      This reservation is non-refundable.
                    </p>
                    <Link href="/terms" target="blank">
                      <p className="underline edit-color font-bold">
                        Learn More
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-11">
                <Button
                  text={loading ? "Processing..." : "Confirm & Pay"}
                  design={
                    "font-inter  font-lg leading-tight text-center text-white w-full sm:w-96 bg-orange-300 p-4 rounded-full"
                  }
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <div className="w-4/12  rounded-xl shadow py-8 px-5 h-fit golden-border">
              <div className="flex gap-3 pb-4 border-b border-borderColor image-data">
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
                    <span className="block text-blackColor font-medium confirm-price">
                      <div className="flex justify-center">
                        <>
                          <div className="text-red-700 border-b-2 border-red-700">
                            {
                              formatMultiPrice(originalPrice *
                                differenceInDays(new Date(infos.checkout), new Date(infos.checkin)))}
                          </div>
                        </>
                      </div>
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mt-2 border-b pb-2">
                  <div className="flex items-center justify-between w-full">
                    <span className="block text-blackColor">
                      Discount price Per Nights
                      ({formatMultiPrice(discountedPrice)} *  {infos.checkout &&
                        infos.checkin &&
                        differenceInDays(
                          new Date(infos.checkout),
                          new Date(infos.checkin)
                        )})
                    </span>
                    <span className="block text-blackColor font-medium confirm-price">
                      <div className="flex justify-center">
                        {
                          formatMultiPrice(discountedPrice *
                            differenceInDays(new Date(infos.checkout), new Date(infos.checkin)))
                        }
                      </div>

                    </span>
                  </div>
                </div>
                <div className="pt-4 flex items-center border-b pb-2 justify-between confirm-total">
                <span className="font-bold text-center ">Extra Charges </span>
              </div>
                <div className="flex gap-3 mt-2 border-b pb-2">
                  <div className="flex items-center justify-between w-full">
                    <span className="block text-blackColor">
                      Cleaning Fees Per Nights (
                      {formatMultiPrice(listing?.cleaning_fee)} *  {infos.checkout &&
                        infos.checkin &&
                        differenceInDays(
                          new Date(infos.checkout),
                          new Date(infos.checkin)
                        )}
                      )
                    </span>
                    <span className="block text-blackColor font-medium confirm-price">
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
                      <span className="block text-blackColor font-medium confirm-price">
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
                      <span className="block text-blackColor font-medium confirm-price">
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
        </main>
      </div>
    </AuthLayout>
  );
};

export default Book;
