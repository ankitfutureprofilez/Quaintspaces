import React, { useEffect, useState } from "react";
import amenitiesList from "../../../../aminites.json";
import Aminiteisdata from "../../../../oldcod.json";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import Step1 from "../components/Video.json";
import { House, Add } from "iconsax-react";
import {
  FaBuilding,
  FaHome,
  FaWarehouse,
  FaDoorOpen,
  FaHotel,
  FaBed,
  FaCouch,
} from "react-icons/fa";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import Image from "next/image";
import Video from "../components/Video";

const propertyTypes = [
  { value: "flat", label: "Flat/Apartment" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "fram", label: "Fram" },
  { value: "breakfast", label: "Bed & Breakfast" },
];

export default function Property(props) {
  const { isEdit, p, onClose, fetchProperties } = props;
  const {
    uuid,
    location,
    children,
    adults,
    properties_type,
    name,
    no_of_pet_allowed,
    price,
    description,
    bedrooms,
    beds,
    bathrooms,
    amenities,
    property_image,
  } = p ? p : {};

  const router = useRouter();
  const [step, setStep] = useState(0);
  const [Loading, setLoading] = useState(false);

  function stringToArray(inputString) {
    return inputString.split(",");
  }

  const [images, setImages] = useState([]);

  const [locationdata, setLocationdata] = useState("");
  console.log("oimagew", images);
  const [PType, setPType] = useState(properties_type || "flat");

  const lstring = location ? JSON.parse(location.replace('/\\"/g', '"')) : null;
  const l = JSON.parse(lstring);

  const [address, setAddress] = useState({
    street_address: l && l.street_address ? l.street_address : "",
    flat_house: l && l.flat_house ? l.flat_house : "",
    district: l && l.district ? l.district : "",
    nearby: l && l.nearby ? l.nearby : "",
    city: l && l.city ? l.city : "",
    state: l && l.state ? l.state : "",
    pin: l && l.pin ? l.pin : "",
    location: l && l.location ? l.location : "",
    latitude: l && l.latitude ? l.latitude : "",
    longitude: l && l.longitude ? l.longitude : "",
  });

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const [typeHere, setTypeHere] = useState("entire_place");

  const [item, setItem] = useState({
    name: name || "",
    about: description || "",
    price: price || "",
    propertytype: PType,
    children: children || "1",
    adults: adults || "1",
    bedrooms: bedrooms || "1",
    beds: beds || "1",
    bathrooms: bathrooms || "1",
    pets: no_of_pet_allowed || "1",
    selectedAmenities: amenities ? stringToArray(amenities) : [],
    free_cancel_time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleFileChange = async (e) => {
    let files = Array.from(e.target.files);
    let arr = [];
    files.forEach((element) => {
      arr.push(element);
    });
    setImages([...images, ...arr]);
  };

  const removeImage = (f) => {
    const filter = images && images?.filter((file, index) => file !== f);
    setImages(filter);
  };

  const prevStep = () => setStep((prev) => prev - 1);
  const nextStep = async () => {
    // if (step === 0 && PType == '') {
    //   toast.error("Please choose a property type which one you want to list.");
    // }
    // if (step === 1 && (item?.name === "" || item?.price === "" || item?.about === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (step === 1 && (!item?.about || item?.about?.trim()?.length === 0 || item?.about?.length < 100)) {
    //   toast.error("Property description is too short. Description should be a minimum of 100 words.");
    //   return false;
    // }
    // if (step === 2 && (
    //   address?.pin === "" || address?.pin?.length < 5 ||
    //   address?.state === "" ||
    //   address?.city === "" ||
    //   address?.street_address === "" ||
    //   address?.district === "")) {
    //   toast.error(`Incomplete address. Please enter complete address.`);
    //   return false;
    // }
    // if (step == 4 && item?.selectedAmenities && item?.selectedAmenities?.length < 4) {
    //   toast.error("Please choose atleast 4 amenities.");
    //   return false;
    // }
    setStep((prev) => prev + 1);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setItem((prevState) => ({
        ...prevState,
        selectedAmenities: [...prevState?.selectedAmenities, value],
      }));
    } else {
      setItem((prevState) => ({
        ...prevState,
        selectedAmenities: prevState?.selectedAmenities?.filter(
          (item) => item !== value
        ),
      }));
    }
  };
  const [locationupdate, setLocationupdate] = useState([]);
  const getNavigator = () => {
    if (typeof navigator !== "undefined") {
      return navigator;
    } else {
      console.error("navigator is not available");
      return null;
    }
  };

  const fetchLocationData = async () => {
    setLoading(true);
    const navigatorObj = getNavigator();

    if (navigatorObj && navigatorObj.geolocation) {
      navigatorObj.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            let locationData;
            if (!isEdit) {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              locationData = response.data;
            } else {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${address?.latitude}&lon=${address?.longitude}&format=json`
              );
              locationData = response.data;
              setLocationdata(locationData?.address);
              setLocationupdate(locationData?.address);
            }
            setAddress({
              location: locationData.display_name,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              street_address:
                locationData?.address?.road || locationupdate?.road,
              district:
                locationData?.address?.state_district ||
                locationupdate?.state_district,
              nearby: locationData?.address?.suburb || locationupdate?.suburb,
              city: locationData?.address?.city || locationupdate?.city,
              state: locationData?.address?.state || locationupdate?.state,
              pin: locationData?.address?.postcode || locationupdate?.postcode,
            });
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log("Error fetching data:", error);
          }
        },
        () => {
          setLoading(false);
          console.log("Geolocation failed");
        }
      );
    }
  };

  const rotateImages = () => {
    setImages([images[2], images[0], images[1]]);
  };
  const fetchLocation = async () => {
    const formattedAddress = `${address.street_address}, ${address.nearby}, ${address.district}, ${address.city}, ${address.state}, ${address.pin}`;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formattedAddress
        )}&key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58`
      );
      const { results } = response.data;
      if (results && results.length > 0) {
        setAddress({
          ...address,
          location: results[0]?.formatted_address,
          latitude: results[0]?.geometry?.location?.lat,
          longitude: results[0]?.geometry?.location?.lng,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // useEffect(() => {
  //   const isAddressComplete =
  //     address.street_address &&
  //     address.nearby &&
  //     address.district &&
  //     address.city &&
  //     address.state &&
  //     address.pin;

  //   if (address.street_address) {
  //     fetchLocation();
  //   }
  // }, [address.street_address, address.nearby, address.district, address.city, address.state, address.pin]);
  const [imageproperty, setImagesproperty] = useState(property_image);

  const deletePropertyImage = (recordUUID, itemUUID) => {
    const main = new Listing();
    main
      .propertyImagedelete(recordUUID, itemUUID)
      .then((response) => {
        toast.success(response.data.message);
        setImagesproperty(
          imageproperty.filter((item) => item.uuid !== itemUUID)
        );
        property_image.filter((item) => item.uuid !== itemUUID);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [guests, setGuests] = useState(0);
  const [Bedrooms, setBedrooms] = useState(0);
  const [Bathrooms, setBathrooms] = useState(0);
  const [pets, setPets] = useState(0);

  const decrement = (setter) => () => setter((prev) => Math.max(0, prev - 1));
  const increment = (setter) => () => setter((prev) => prev + 1);

  const decrements = (Bathrooms) => () =>
    setBathrooms((prev) => Math.max(0, prev - 0.5));
  const increments = (Bathrooms) => () => setBathrooms((prev) => prev + 0.5);

  const HouseData = [
    { value: "peaceful", label: "Peaceful" },
    { value: "uniqe", label: "Unique" },
    { value: "family_friendly", label: "Family-Friendly" },
    { value: "stylish", label: "Stylish" },
    { value: "central", label: "Central" },
    { value: "spacious", label: "Spacious" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isEdit && step === 5 && images?.length < 5) {
      toast.error("Please select at least five images.");
      return false;
    }
    if (isEdit && step === 5 && images?.length + imageproperty?.length < 5) {
      toast.error("Please select at least five images.");
      return false;
    }
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("name", item?.name);
    formData.append("no_of_pet_allowed", pets);
    formData.append("description", item?.about);
    formData.append("price", item?.price);
    formData.append("properties_type", PType);
    formData.append("bedrooms", Bedrooms);
    formData.append("beds", beds);


    formData.append("bathrooms", bathrooms);
    formData.append("guests", guests);
    // formData.append("children", item?.children);
    formData.append("address", JSON.stringify(address));
    formData.append("infants", "1");
    formData.append("pet_allowed", "1");
    formData.append("free_cancel_time", "1");
    formData.append("amenities", item?.selectedAmenities);
    formData.append("type", typeHere);
    images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    console.log("formData", formData);
    const response = isEdit
      ? main.propertyedit(uuid, formData)
      : main.addproperty(formData);
    response
      .then((res) => {
        if (res?.data?.status === true) {
          if (isEdit) {
            onClose();
            toast.success(res.data.message);
            fetchProperties && fetchProperties();
          } else {
            router.push("/admin/property");
            toast.success(res.data.message);
          }
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  useEffect(() => {}, [images]);

  return (
    <>
      <style>{`
      .ammenties-checked-lists input:checked+ label { background: #006fc7;color:#fff;}
      // .property-type:checked + label { color :#000 !important;border-color:#000 !important;}
      // .property-type:checked + label h2 { color :#000 !important;border-color:#000 !important;}
    `}</style>

      <div className={`w-full  flex items-center justify-center px-6 py-8 `}>
        <div className="max-w-4xl w-full space-y-8 w-full ">
          <div
            className={`pages-wrapper  ${uuid ? " max-w-[100%]" : ""} m-auto `}
          >
            <div
              className={`${
                step === 0 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Video step1={Step1?.step1} />
            </div>

            <div
              className={`${
                step === 1 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              {/* <h2 className="text-3xl text-center font-bold mb-8" >Which type of perty you want to list ?</h2>
               <div className="grid grid-cols-3 gap-4 m-auto table  " >
                <div className="" >
                      <div onClick={(e)=>setTypeHere("single_room")} className={`${typeHere === "single_room" ? "bg-gray-500" : ''} block propety-type-wrap cursor-pointer p-4 border rounded-xl`} >
            
                        <House size="52" color="#dedede" /> 
                        <h2 className="text-xl mt-4 font-normal text-gray-400" >Single Room</h2>
                      </div>
                  </div>
                <div className="" >
                      <label onClick={(e)=>setTypeHere("entire_place")}
                      className={`${typeHere === "entire_place" ? "bg-gray-500" : ''} block propety-type-wrap cursor-pointer p-4 border rounded-xl`} >
                        <House size="52" color="#dedede" /> 
                        <h2 className="text-xl mt-4 font-normal text-gray-400" >Entire Place</h2>
                      </label>
                  </div>
               </div> */}

              {/* {typeHere === "entire_place" ?  <> */}
              <h2 className="text-3xl text-center mt-4 font-bold mb-8">
                Which of these best describes your place?
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {propertyTypes &&
                  propertyTypes.map((p, i) => (
                    <div key={i} className="">
                      <div
                        onClick={() => setPType(p?.value)}
                        className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${
                          p?.value === PType ? "bg-indigo-500" : ""
                        }`}
                      >
                        {p.value === "flat" && (
                          <FaBuilding
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "house" && (
                          <FaHome
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "unique_space" && <House size={40} />}
                        {p.value === "guest_house" && (
                          <FaDoorOpen
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "hotel" && (
                          <FaHotel
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "single_room" && (
                          <FaBed style={{ color: "black", fontSize: "40px" }} />
                        )}
                        {p.value === "boutique_hotel" && (
                          <FaCouch
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "breakfast" && (
                          <MdOutlineFreeBreakfast size={40} />
                        )}
                        {p.value === "fram" && <FaWarehouse size={40} />}
                        <h2
                          className={`text-xl mt-4 font-normal ${
                            p.value === PType
                              ? "text-gray-100"
                              : "text-gray-400"
                          }`}
                        >
                          {p.label}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>

              {/* </> : '' } */}
            </div>

            <div className={`${step === 2 ? "" : "display-none"}`}>
              <h2 className="text-3xl text-center font-bold mb-2">
                Where's your place located?
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                Your address is only shared with guests after they’ve made a
                reservation.
              </p>
              <div className="table w-full m-auto max-w-[500px] space-y-4 text-center">
                <p>{address?.location}</p>
                <div class="w-full mt-4">
                  <button
                    className="btn sort w-full"
                    onClick={fetchLocationData}
                  >
                    {Loading ? "...." : "Use Current Location"}
                  </button>
                </div>
                <div class="flex items-center justify-center space-x-4">
                  <div class="font-semibold text-gray-400 py-3 text-center">
                    OR
                  </div>
                </div>
                <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    value={address.flat_house}
                    name="flat_house"
                    onChange={handleAddress}
                    type="text"
                    placeholder="Flat, house, etc. (if applicable)"
                    className="w-full border border-gray-300 rounded-0 border-t-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.street_address}
                    name="street_address"
                    onChange={handleAddress}
                    type="text"
                    placeholder="Street Address"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.nearby}
                    name="nearby"
                    onChange={handleAddress}
                    type="text"
                    placeholder="Nearby Landmark (if applicable)"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.district}
                    name="district"
                    onChange={handleAddress}
                    type="text"
                    placeholder="District/Locality"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.city}
                    name="city"
                    onChange={handleAddress}
                    type="text"
                    placeholder="City/Town"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.state}
                    name="state"
                    onChange={handleAddress}
                    type="text"
                    placeholder="State"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.pin}
                    name="pin"
                    onChange={handleAddress}
                    type="text"
                    placeholder="PIN Code"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl text-center font-bold mb-2 mt-3">
                  Show your specific location
                </h2>
                <p className="text-normal text-center text-gray-500 mb-8">
                  Make it clear to guests where your place is located. We'll
                  only share your address after they've made a reservation
                </p>

                <div>
                  {locationdata ? (
                    <iframe
                      src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
                        ` ${locationdata}`
                      )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                      width="100%"
                      height="450"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>
                  ) : (
                    <iframe
                      src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
                        ` jaipur rajasthan`
                      )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                      width="100%"
                      height="450"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>

            <div className={`${step === 3 ? "" : "display-none"}`}>
              Hello Pin
            </div>

            <div className={`${step === 4 ? "" : "display-none"}`}>
              <h2 className="text-3xl text-center font-bold mb-8">
                Share some basics about your place
              </h2>
              <h2 className="text-xl text-center font-bold mb-8">
                You'll add more details later, such as bed types.
              </h2>
              <div className="grid max-w-[500px] m-auto table gap-y-4  mt-5">
                <div className="flex items-center justify-between border-b-2 border-black-600 p-2">
                  <span>Guests</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={decrement(setGuests)}
                      className="rounded-full border px-3 py-1"
                    >
                      -
                    </button>
                    <span>{guests}</span>
                    <button
                      onClick={increment(setGuests)}
                      className="rounded-full border px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b-2 border-black-600 p-2">
                  <span>Bedrooms</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={decrement(setBedrooms)}
                      className="rounded-full border px-3 py-1"
                    >
                      -
                    </button>
                    <span>{Bedrooms}</span>
                    <button
                      onClick={increment(setBedrooms)}
                      className="rounded-full border px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                
                <div className="flex items-center justify-between border-b-2 border-black-600 p-2 ">
                  <span>Bathrooms</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={decrements(setBathrooms)}
                      className="rounded-full border px-3 py-1"
                    >
                      -
                    </button>
                    <span>{Bathrooms}</span>
                    <button
                      onClick={increments(setBathrooms)}
                      className="rounded-full border px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b-2 border-black-600 p-2 ">
                  <span>Pets</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={decrement(setPets)}
                      className="rounded-full border px-3 py-1"
                    >
                      -
                    </button>
                    <span>{pets}</span>
                    <button
                      onClick={increment(setPets)}
                      className="rounded-full border px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                step === 5 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Video step1={Step1?.step2} />
            </div>

            <div className={`${step === 6 ? "" : "display-none"}`}>
              <h2 className="text-3xl text-center font-bold mb-2">
                Tell guests what your place has to offer
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                You can add more amenities after you publish your listing.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-5 ">
                {Aminiteisdata &&
                  Aminiteisdata?.amenities?.map((p, i) => (
                    <div key={i} className="">
                      <div
                        onClick={() => setPType(p?.value)}
                        className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${
                          p?.value === p?.title ? "bg-indigo-500" : ""
                        }`}
                      >
                        {p.value === "flat" && (
                          <FaBuilding
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "house" && (
                          <FaHome
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "unique_space" && <House size={40} />}
                        {p.value === "guest_house" && (
                          <FaDoorOpen
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "hotel" && (
                          <FaHotel
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "single_room" && (
                          <FaBed style={{ color: "black", fontSize: "40px" }} />
                        )}
                        {p.value === "boutique_hotel" && (
                          <FaCouch
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "breakfast" && (
                          <MdOutlineFreeBreakfast size={40} />
                        )}
                        {p.value === "fram" && <FaWarehouse size={40} />}
                        <h2
                          className={`text-sm mt-4 font-normal ${
                            p.value === p.title
                              ? "text-gray-100"
                              : "text-gray-400"
                          }`}
                        >
                          {p.title}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>

              <p className="text-bold font-bold text-left text-gray-500 mb-8">
                Do you have any standout amenities?
              </p>

              <div className="grid grid-cols-3 gap-4 mb-5">
                {Aminiteisdata &&
                  Aminiteisdata?.amenities2?.map((p, i) => (
                    <div key={i} className="">
                      <div
                        onClick={() => setPType(p?.value)}
                        className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${
                          p?.value === p?.title ? "bg-indigo-500" : ""
                        }`}
                      >
                        {p.value === "flat" && (
                          <FaBuilding
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "house" && (
                          <FaHome
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "unique_space" && <House size={40} />}
                        {p.value === "guest_house" && (
                          <FaDoorOpen
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "hotel" && (
                          <FaHotel
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "single_room" && (
                          <FaBed style={{ color: "black", fontSize: "40px" }} />
                        )}
                        {p.value === "boutique_hotel" && (
                          <FaCouch
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "breakfast" && (
                          <MdOutlineFreeBreakfast size={40} />
                        )}
                        {p.value === "fram" && <FaWarehouse size={40} />}
                        <h2
                          className={`text-sm mt-4 font-normal ${
                            p.value === p.title
                              ? "text-gray-100"
                              : "text-gray-400"
                          }`}
                        >
                          {p.title}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>

              <p className="text-bold font-bold text-left text-gray-500 mb-8">
                Do you have any of these safety items?
              </p>

              <div className="grid grid-cols-3 gap-4">
                {Aminiteisdata &&
                  Aminiteisdata?.standout_amenity?.map((p, i) => (
                    <div key={i} className="">
                      <div
                        onClick={() => setPType(p?.value)}
                        className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${
                          p?.value === p?.title ? "bg-indigo-500" : ""
                        }`}
                      >
                        {p.value === "flat" && (
                          <FaBuilding
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "house" && (
                          <FaHome
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "unique_space" && <House size={40} />}
                        {p.value === "guest_house" && (
                          <FaDoorOpen
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "hotel" && (
                          <FaHotel
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "single_room" && (
                          <FaBed style={{ color: "black", fontSize: "40px" }} />
                        )}
                        {p.value === "boutique_hotel" && (
                          <FaCouch
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "breakfast" && (
                          <MdOutlineFreeBreakfast size={40} />
                        )}
                        {p.value === "fram" && <FaWarehouse size={40} />}
                        <h2
                          className={`text-sm mt-4 font-normal ${
                            p.value === p.title
                              ? "text-gray-100"
                              : "text-gray-400"
                          }`}
                        >
                          {p.title}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>
              {/* 
              <div className="max-w-[600px] m-auto justify-center flex flex-wrap ammenties-checked-lists">
                {amenitiesList.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={amenity.value}
                      name={amenity.value}
                      type="checkbox"
                      value={amenity.value}
                      className="mr-2 rounded text-indigo-600 focus:ring-indigo-500 hidden"
                      checked={item?.selectedAmenities.includes(amenity.value)}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor={amenity.value}
                      className="me-2 mb-2 bg-gray-300 px-4 py-2 rounded-lg text-md text-gray-500 cursor-pointer"
                    >
                      {amenity.title}
                    </label>
                  </div>
                ))}
              </div> */}
            </div>

            <div
              className={`${
                step === 7 ? "" : "display-none"
              } max-w-[600px] m-auto`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Add some photos of your{" "}
                {PType ? PType.replace("_", " ") : "house"}
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                You'll need 5 photos to get started. You can add more or make
                changes later.
              </p>

              {isEdit ? (
                <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add size="100" color="#ccc" />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                      onChange={handleFileChange}
                      name="images"
                      required
                      multiple
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add size="100" color="#ccc" />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                      onChange={handleFileChange}
                      name="images"
                      required
                      multiple
                    />
                  </label>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4  mt-16 ">
                {isEdit
                  ? imageproperty?.map((item, index) => (
                      <div key={index} className="relative isedits">
                        <Image
                          className="image-preview object-cover border min-h-[150px] max-h-[200px] h-full w-full max-w-full rounded-lg"
                          src={item?.image_url || ""}
                          width={200}
                          height={200}
                          alt={`Preview ${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => deletePropertyImage(uuid, item?.uuid)}
                          className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  : ""}

                {images &&
                  images.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        width={200}
                        height={200}
                        alt={`Preview ${index}`}
                        className="image-preview h-full object-cover border min-h-[150px] max-h-[200px] w-full max-w-full rounded-lg"
                        onLoad={() => URL.revokeObjectURL(file)}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(file)}
                        className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div
              className={`${
                step === 8 ? "" : "display-none"
              } max-w-[600px] m-auto`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Add some photos of your{" "}
                {PType ? PType.replace("_", " ") : "house"}
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                You'll need 5 photos to get started. You can add more or make
                changes later.
              </p>

              {isEdit ? (
                <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add size="100" color="#ccc" />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                      onChange={handleFileChange}
                      name="images"
                      required
                      multiple
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add size="100" color="#ccc" />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                      onChange={handleFileChange}
                      name="images"
                      required
                      multiple
                    />
                  </label>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4  mt-16 ">
                {isEdit
                  ? imageproperty?.map((item, index) => (
                      <div key={index} className="relative isedits">
                        <Image
                          className="image-preview object-cover border min-h-[150px] max-h-[200px] h-full w-full max-w-full rounded-lg"
                          src={item?.image_url || ""}
                          width={200}
                          height={200}
                          alt={`Preview ${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => deletePropertyImage(uuid, item?.uuid)}
                          className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  : ""}

                {images &&
                  images.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        width={200}
                        height={200}
                        alt={`Preview ${index}`}
                        className="image-preview h-full object-cover border min-h-[150px] max-h-[200px] w-full max-w-full rounded-lg"
                        onLoad={() => URL.revokeObjectURL(file)}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(file)}
                        className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div
              className={`${
                step === 9 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Now, let's give your cabin a title
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                Short titles work best. Have fun with it – you can always change
                it later.
              </p>

              <div className="relative mt-4 text-sm font-medium text-gray-700">
                <input
                  required
                  type="number"
                  name="price"
                  placeholder="Property Price Per Night"
                  id="name"
                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                  value={item?.price}
                  onChange={handleInputChange}
                />
                <div className="mt-4">
                  <textarea
                    required
                    id="about"
                    name="about"
                    minCol={"5"}
                    minRow={"5"}
                    value={item?.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                    placeholder="Tell more about your property..."
                  />
                  <div className="flex flex-wrap justify-between">
                    <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                      {item?.name ? (
                        <span>{item?.name.length}/50 characters</span>
                      ) : (
                        <span>0/50 characters</span>
                      )}
                    </label>
                    <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                      Minimum 50 words.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                step === 10 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Next, let's describe your house
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                Choose up to 2 highlights. We'll use these to get your
                description started.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {HouseData &&
                  HouseData?.map((p, i) => (
                    <div key={i} className="">
                      <div
                        onClick={() => setPType(p?.value)}
                        className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${
                          p?.value === p?.title ? "bg-indigo-500" : ""
                        }`}
                      >
                        {p.value === "flat" && (
                          <FaBuilding
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "house" && (
                          <FaHome
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "unique_space" && <House size={40} />}
                        {p.value === "guest_house" && (
                          <FaDoorOpen
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "hotel" && (
                          <FaHotel
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "single_room" && (
                          <FaBed style={{ color: "black", fontSize: "40px" }} />
                        )}
                        {p.value === "boutique_hotel" && (
                          <FaCouch
                            style={{ color: "black", fontSize: "40px" }}
                          />
                        )}
                        {p.value === "breakfast" && (
                          <MdOutlineFreeBreakfast size={40} />
                        )}
                        {p.value === "fram" && <FaWarehouse size={40} />}
                        <h2
                          className={`text-sm mt-4 font-normal ${
                            p.value === p.title
                              ? "text-gray-100"
                              : "text-gray-400"
                          }`}
                        >
                          {p.label}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div
              className={`${
                step === 11 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Create your description
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                Share what makes your place special.
              </p>
              <div className="relative mt-4 text-sm font-medium text-gray-700">
                <div className="mt-4">
                  <textarea
                    required
                    id="about"
                    name="about"
                    minCol={"5"}
                    minRow={"5"}
                    value={item?.about}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                    placeholder="Tell more about your property..."
                  />
                  <div className="flex flex-wrap justify-between">
                    <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                      {item?.about ? (
                        <span>{item?.about.length}/500 characters</span>
                      ) : (
                        <span>0/500 characters</span>
                      )}
                    </label>
                    <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                      Minimum 500 words.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                step === 12 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Video step1={Step1?.step3} />
            </div>

            <div
              className={`${
                step === 14 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Decide how you’ll confirm reservations
              </h2>

              <p className="text-normal text-center text-gray-500 mb-8">
                After your first guest anyone can book your place. Learn more
              </p>

              <div className="_sm28cjm" style={{ animationDelay: "400ms" }}>
                <button
                  className="_ih2x5tr"
                  type="button"
                  role="radio"
                  aria-checked="true"
                  theme={{}}
                >
                  <div className="_114nnaka">
                    <h2>Any Airbnb guest </h2>
                    <p>
                      Get reservations faster when you welcome anyone from the
                      Airbnb community.
                    </p>
                  </div>
                </button>
              </div>

              <div className="_sm28cjm" style={{ animationDelay: "449.741ms" }}>
                <button
                  className="_162au8t5"
                  type="button"
                  role="radio"
                  aria-checked="false"
                  theme={{}}
                >
                  <h2>An experienced guest </h2>
                  <p>
                    For your first guest, welcome someone with a good track
                    record on Airbnb who can offer tips for how to be a great
                    Host.
                  </p>
                </button>
              </div>
            </div>

            <div
              className={`${
                step === 13 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Choose who to welcome for your first reservation
              </h2>

              <div className="_sm28cjm" style={{ animationDelay: "400ms" }}>
                <button
                  className="_ih2x5tr"
                  type="button"
                  role="radio"
                  aria-checked="true"
                  theme={{}}
                >
                  <div className="_114nnaka">
                    <h2 className="_6pu6cc">Use Instant Book</h2>
                    <div className="_winr5s">
                      Guests can book automatically.
                    </div>
                  </div>
                  <div className="_j2nheb">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        height: "32px",
                        width: "32px",
                        fill: "black",
                      }}
                    >
                      <path d="M17.16 1.46L6.19 17.42l-.1.17c-.05.12-.06.18-.08.4l.04.13c.19.65.23.67.97.88H13v10.97l.04.22c.05.28.1.33.4.61l.27.09c.51.16.59.1 1.13-.35l10.97-15.96.1-.18c.05-.11.06-.17.08-.39l-.04-.13c-.19-.66-.23-.67-.97-.88H19V2.03l-.04-.22c-.05-.28-.1-.33-.4-.61l-.27-.09c-.51-.16-.59-.1-1.13.35zM17 5.22V15h6.1L15 26.78V17H8.9L17 5.22z"></path>
                    </svg>
                  </div>
                </button>
              </div>

              <div className="_sm28cjm" style={{ animationDelay: "449.741ms" }}>
                <button
                  className="_162au8t5"
                  type="button"
                  role="radio"
                  aria-checked="false"
                  theme={{}}
                >
                  <div className="_114nnaka">
                    <h2 className="_6pu6cc">Approve or decline requests</h2>
                    <div className="_winr5s">
                      Guests must ask if they can book.
                    </div>
                  </div>
                  <div className="_j2nheb">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        height: "32px",
                        width: "32px",
                        fill: "black",
                      }}
                    >
                      <path d="M26 1a5 5 0 0 1 5 4.78v10.9a5 5 0 0 1-4.78 5H26a5 5 0 0 1-4.78 5h-4l-3.72 4.36-3.72-4.36H6a5 5 0 0 1-4.98-4.56L1 21.9 1 21.68V11a5 5 0 0 1 4.78-5H6a5 5 0 0 1 4.78-5H26zm-5 7H6a3 3 0 0 0-3 2.82v10.86a3 3 0 0 0 2.82 3h4.88l2.8 3.28 2.8-3.28H21a3 3 0 0 0 3-2.82V11a3 3 0 0 0-3-3zm-1 10v2H6v-2h14zm6-15H11a3 3 0 0 0-3 2.82V6h13a5 5 0 0 1 5 4.78v8.9a3 3 0 0 0 3-2.82V6a3 3 0 0 0-2.82-3H26zM15 13v2H6v-2h9z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>


            <div
              className={`${
                step === 15 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
              Add discounts
              </h2>
              <p>

Help your place stand out to get booked faster and earn your first reviews.

             </p>
            </div>

            <div
              className={`${
                step === 16 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
            >
              <h2> Just one last step! </h2>
              <p>
              Does your place have any of these?
</p>

<div className="max-w-lg mx-auto">
      <fieldset className="mb-5">
        <div className="flex items-start items-center mb-4">
          <input
            id="checkbox-2"
            aria-describedby="checkbox-2"
            type="checkbox"
            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-black-300 h-4 w-4 rounded"
          />
          <label
            htmlFor="checkbox-2"
            className="text-sm ml-3 font-medium text-gray-900"
          >
          Weapons
          </label>
        </div>

        <div className="flex items-start items-center mb-4">
          <input
            id="checkbox-3"
            aria-describedby="checkbox-3"
            type="checkbox"
            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-black-300 h-4 w-4 rounded"
          />
          <label
            htmlFor="checkbox-3"
            className="text-sm ml-3 font-medium text-gray-900"
          >
      Noise decibel monitors
          </label>
        </div>

        <div className="flex items-start mb-4">
          <div className="flex items-center h-5">
            <input
              id="shipping-2"
              aria-describedby="shipping-2"
              type="checkbox"
              className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-black-300 h-4 w-4 rounded"
            />
          </div>
          <div className="text-sm ml-3">
            <label
              htmlFor="shipping-2"
              className="font-medium text-gray-900"
            >
             Exterior security cameras
            </label>
          </div>
        </div>

      </fieldset>

    </div>




              </div>
            <div className="pt-6 flex justify-between max-w-[500px] table m-auto">
              {step == 0 ? (
                <> </>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
              )}

              {step < 16 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                >
                  {Loading ? "processing.. " : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
