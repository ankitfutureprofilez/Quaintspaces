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
import Image from "next/image";
import Button from "../elements/Button";
import Listings from "../api/laravel/Listings";
import AuthLayout from "../layout/AuthLayout";
import toast from "react-hot-toast";
import { formatMultiPrice } from "../../hooks/ValueData";

const Book = () => {
  const router = useRouter();
  const { listingID } = router.query;
  // console.log("listingID", listingID);
  const [listing, setListing] = useState([]);
  const [infos, setInfos] = useState({});
  const [dateModel, setDateModel] = useState(false);
  const [guestsModel, setGuestsModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberField, setNumberField] = useState(false);
  const [hasAddedNumber, setHasAddedNumber] = useState(false);
  const [messageField, setMessageField] = useState(false);
  const [hasAddedMessage, setHasAddedMessage] = useState(false);
  const [orderId, setOrderId] = useState('');

  // console.log("infos",infos)
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
    const url = router.query;
    setInfos(url);
    // console.log("router query", url);
    const main = new Listings();
    main
      .PropertyDetail(url.listingID)
      .then((r) => {
        // console.log("Data",r.data.data);
        setListing(r?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // console.log("liiitn",listing)
    setGuests({
      adults: {
        value: +url.numberOfAdults || 0,
        max: 16,
        min: 0,
      },
      children: {
        value: +url.numberOfChildren || 0,
        max: 15,
        min: 0,
      },
      infants: {
        value: +url.numberOfInfants || 0,
        max: 5,
        min: 0,
      },
      pets: {
        value: +url.numberOfPets || 0,
        max: 5,
        min: 0,
      },
    });
  }, [router.asPath]);
  // console.log("infos", infos);

  const [formData, setFormData] = useState({
    selectOption: "",
    fornt: null,
    message: "",
    phone: "",
  });
  0;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const formData = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      fornt: formData,
    }));
  };

  const [pricerate, setPriceRate] = useState(0);

  useEffect(() => {
    if (infos.checkout && infos.checkin && listing) {
      const calculatedPriceRate =
        +listing.price *
        differenceInDays(new Date(infos.checkout), new Date(infos.checkin));
      setPriceRate(formatMultiPrice(calculatedPriceRate));
    } else {
      setPriceRate(0);
    }
  }, [infos.checkout, infos.checkin, listing]);

  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.phone.length === 0) {
  //     toast.error("Phone Number is required");
  //     return;
  //   }
  //   if (formData.phone.length != 10) {
  //     toast.error("Invalid Phone Number");
  //     return;
  //   }
  //   if (loading == true) {
  //     return;
  //   }
  //   setLoading(true);
  //   const main = new Listings();
  //   const record = new FormData();
  //   record.append("property_uid", listingID);
  //   record.append("check_in", infos.checkin);
  //   record.append("check_out", infos.checkout);
  //   record.append("adults", infos.numberOfAdults);
  //   record.append("infants", infos.numberOfInfants);
  //   record.append("children", infos.numberOfChildren);
  //   record.append("doc_type", formData.selectOption);
  //   record.append("front_doc", formData.fornt);
  //   record.append("no_of_pet", infos.numberOfPets);
  //   record.append(
  //     "price",
  //     infos.checkout &&
  //       infos.checkin &&
  //       +listing?.price *
  //         differenceInDays(new Date(infos.checkout), new Date(infos.checkin))
  //   );
  //   formData.message.length != 0
  //     ? record.append("message", formData.message)
  //     : null;
  //   record.append("phone_no", formData.phone);
  //   const response = main.PropertyBooking(record);
  //   response
  //     .then((res) => {
  //       console.log("res", res);
  //       if (res && res.data && res.data.status) {
  //         toast.success(res.data.message);
  //         router.push("/");
  //         // console.log(res.data.message);/
  //       } else {
  //         toast.error(res?.data.message);
  //         // console.log(res?.data.message)
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       toast.error(error.message);
  //       setLoading(false);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (formData.phone.length === 0) {
    //   toast.error("Phone Number is required");
    //   return;
    // }
    // if (formData.phone.length != 10) {
    //   toast.error("Invalid Phone Number");
    //   return;
    // }
    if (loading == true) {
      return;
    }
    setLoading(true);
    const main = new Listings();
    const record = new FormData();
    record.append("currency", "INR");
    // record.append("property_uid", listingID);
    // record.append("check_in", infos.checkin);
    // record.append("check_out", infos.checkout);
    // record.append("adults", infos.numberOfAdults);
    // record.append("infants", infos.numberOfInfants);
    // record.append("children", infos.numberOfChildren);
    // record.append("doc_type", formData.selectOption);
    // record.append("front_doc", formData.fornt);
    // record.append("no_of_pet", infos.numberOfPets);
    record.append(
      "price",
      infos.checkout &&
        infos.checkin &&
        +listing?.price *
          differenceInDays(new Date(infos.checkout), new Date(infos.checkin))
    );
    // formData.message.length != 0
    //   ? record.append("message", formData.message)
    //   : null;
    // record.append("phone_no", formData.phone);
    const response = main.PropertyBooking(record);
    response
      .then((res) => {
        console.log("res", res);
        if (res && res.data && res.data.status) {
          if (res && res.data && data.orderId) {
            setOrderId(data.orderId);}
          toast.success(res.data.message);
          router.push("/");
          // console.log(res.data.message);/
        } else {
          toast.error(res?.data.message);
          // console.log(res?.data.message)
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <AuthLayout>
      <div>
        <main className="max-w-[1150px] min-h-screen py-[3.6rem] mx-auto pt-12">
          <Heading
            text={loading ? "Processing..." : "Confirm and pay"}
            handleClick={() => router.back()}
          />
          <div className="flex mt-3 sm:mt-8 md:mt-14 px-3 gap-10 your-trip-sec">
            <div className="w-8/12">
              <h2 className="text-xl mb-4 font-medium heading-data">
                Your trip
              </h2>
              <div className="flex items-center justify-between w-full py-2">
                <div>
                  <h3 className="text-lg  font-medium item-heading ">Dates</h3>
                  <p className="text-md item-paragraph">{`${
                    infos?.checkin && format(new Date(infos.checkin), "MMM dd")
                  } - ${
                    infos?.checkout &&
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
                    {`${
                      +infos.numberOfAdults + +infos.numberOfChildren
                    } guests ${
                      +infos.numberOfInfants
                        ? ", " + infos.numberOfInfants + " infants"
                        : ""
                    } ${
                      +infos.numberOfPets
                        ? ", " + infos.numberOfPets + " pets"
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
                      accept=".pdf,.doc,.docx, .jpg, .png"
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
                    <button
                      onClick={() => setMessageField(true)}
                      className="edit-color underline font-bold"
                    >
                      {hasAddedMessage ? "Edit" : "ADD"}
                    </button>
                  </div>
                  {messageField ? (
                    <div className="mt-2 mb-2 sm:mb-4 flex">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 mr-1 p-4 border rounded w-5/6"
                      ></textarea>
                      <button
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
                      </button>
                    </div>
                  ) : null}

                  <h1 className="text-lg item-heading mb-2">Phone number</h1>
                  <div className="flex flex-wrap justify-between">
                    <p className="item-pargraph">
                      Add and confirm your phone number to get trip updates.
                    </p>
                    <button
                      onClick={() => setNumberField(true)}
                      className="edit-color underline font-bold"
                    >
                      {hasAddedNumber ? "Edit" : "ADD"}
                    </button>
                  </div>
                  {numberField ? (
                    <div className="mt-2 mb-2 sm:mb-4 flex">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        maxlength="10"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 mr-1 p-4 border rounded-full w-5/6"
                        required
                      />
                      <button
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
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between w-full py-2 pb-4 border-b border-borderColor">
                <div className="ml-3 mt-4">
                  <h1 className="text-lg heading-data mb-4">
                    Cancellation policy
                  </h1>
                  <div className="flex flex-wrap ">
                    <p className="item-pargraph">
                      This reservation is non-refundable.
                    </p>
                    <Link href="/terms">
                      <p className="underline edit-color font-bold">
                        Learn More
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-11">
                <Button
                  text={"Confirm & Pay"}
                  design={
                    "font-inter  font-lg leading-tight text-center text-white w-full sm:w-96 bg-orange-300 p-4 rounded-full"
                  }
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <div className="w-5/12  rounded-xl shadow py-8 px-5 h-fit golden-border">
              <div className="flex gap-3 pb-4 border-b border-borderColor image-data">
                <Image
                  src="http://quaintstays.laraveldevelopmentcompany.com//public//storage//property//images//1710834595_houseimg%202.jpg"
                  alt="Apartment"
                  width={200}
                  height={200}
                />
                <div>
                  <h4 className="text-xl mb-1">{listing?.title}</h4>
                  <h3 className=" text-lg">Entire Apartment </h3>
                  <span className="flex text-sm items-center gap-1">
                    <span>
                      <Star />
                    </span>
                    <span>
                      {listing?.rating || "4.5"} (
                      {listing?.reviews_length || 141} reviews)
                    </span>
                  </span>
                </div>
              </div>
              <div className="py-4 border-b border-borderColor confirm-details">
                <h1 className="">Price Details</h1>{" "}
                <div className="flex gap-3 mt-2">
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
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center justify-between w-full">
                    <span className="block text-blackColor">
                      Charges Per Day
                    </span>
                    <span className="block text-blackColor font-medium confirm-price">
                      {formatMultiPrice(listing?.price)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between confirm-total">
                <span className="font-bold">Total(INR)</span>
                <span className="text-md font-medium">{pricerate}</span>
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
