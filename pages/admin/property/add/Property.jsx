import React, { useEffect, useState } from "react";
import amenitiesList from "../../../../aminites.json";
import Listing from "../../api/Listing";
import Element from "../../element";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
export default function Property({ record,longitudes, latitude,children,adults, onClose,uuid ,name, price, area_id ,city_id,location ,description,properties_type,bedrooms,localarea, beds, LocaLcity,bathrooms,no_of_pet_allowed,amenities, property_image}) {
  const router = useRouter();
   console.log("recorditem", record);

  const [step, setStep] = useState(1);
  const [Loading, setLoading] = useState(false);

  function stringToArray(inputString) {
    return inputString.split(",");
  }

  const [item, setItem] = useState({
    name: name || "",
    area_id:area_id|| "",
    city_id: city_id || "",
    location: location || "",
    about: description || "",
    price: price || "",
    propertytype:properties_type || "flat",
    children:children || "1",
    adults: adults || "1",
    bedrooms:bedrooms || "1",
    beds: beds || "1",
    bathrooms: bathrooms || "1",
    pets: no_of_pet_allowed || "1",
    latitude: latitude || "",
    longitude: longitudes || "",
    selectedAmenities:amenities? stringToArray(amenities): [],
    images: [] ,
  });
  console.log("item", item);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleFileChange = (e) => {
    let filesToAdd = Array.from(e.target.files);
    console.log("filed uploaded", filesToAdd);
    let newImages = item.images.concat(filesToAdd).slice(0, 6);
    console.log("newImages",newImages)
    setItem((prevPoperty) => ({
      ...prevPoperty,
      images: newImages,
    }));
  };

  const removeImage = (indexToRemove) => {
    setItem((prevPoperty) => ({
      ...prevPoperty,
      images: prevPoperty.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const nextStep = () => {
    if (
      (step == 1 && item.name === "") ||
      item.area_id === "" ||
      item.city_id === "" ||
      item.location === ""
    ) {
      toast.error("All fields are required.");
      return false;
    }
    if (
      step == 3 &&
      item.selectedAmenities &&
      item.selectedAmenities.length < 4
    ) {
      toast.error("Please choose atleast 4 amenities.");
      return false;
    }
   
    if (step === 4 && (!item.about || item.about.trim().length === 0 || item.about.length < 100)) {
      toast.error("Property description is too short. Description should be a minimum of 100 words.");
      return false;
    }

    if(property_image ) {
    <>
    </>
    }else{
      if (step === 5 && item?.images?.length < 5  ) {
        toast.error("Please select at least five images.");
        return false;
      }
  
    }
  
    if (step == 6 && item?.price) {
      toast.error("please  fields are required.");
      return false;
    }
    setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

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


  const id = 33;
  const [city, setCity] = useState([]);
  useEffect(() => {
    const main = new Listing();
    const response = main.city_list(id);
    response
      .then((res) => {
        setCity(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const [area, setArea] = useState([]);
  useEffect(() => {
    const main = new Listing();
    const fetchAreaList = async () => {
      const response = main.area_list(3378);
      response
        .then((res) => {
          setArea(res?.data?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    fetchAreaList();
  }, []);

  const fetchLocationData = async (manualLocation) => {
    console.log("manualLocation",manualLocation)
    if (manualLocation) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            manualLocation
          )}`
        );
        const locationData = response.data[0];
        console.log("locationData", locationData);
        if (locationData) {
          setItem((prevProperty) => ({
            ...prevProperty,
            location: manualLocation,
            latitude: locationData.lat.toString(),
            longitude: locationData.lon.toString(),
          }));
        }
      } catch (error) {
        console.log("Error fetching data for manual location:", error);
      }
    } 
    }
  

  const handleLocationInputChange = (event) => {
    const { name, value } = event.target;
    setItem((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const deletePropertyImage = (recordUUID, itemUUID) => {
    const main = new Listing();
    main
      .propertyImagedelete(recordUUID, itemUUID)
      .then((response) => {
        // router.push("/admin/property")
        toast.success(response.data.message)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (uuid) {
      const main = new Listing();
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("city_id", item.city_id);
      formData.append("area_id", item.area_id);
      formData.append("pet_allowed", "1");
      formData.append("no_of_pet_allowed", item.pets);
      formData.append("description", item.about);
      formData.append("price", item.price);
      formData.append("properties_type", item.propertytype);
      formData.append("location", item.location);
      formData.append("bedrooms", item.bedrooms);
      formData.append("beds", item.beds);
      formData.append("bathrooms", item.bathrooms);
      formData.append("latitude", item.latitude);
      formData.append("longitudes", item.longitude);
      formData.append("discount_offer", "555");
      formData.append("check_in", " 11:55");
      formData.append("check_out", "12:12");
      formData.append("country_id", "101");
      formData.append("state_id", "33");
      formData.append("adults", item.adults);
      formData.append("children", item.children);
      formData.append("infants", "1");
      formData.append("free_cancel_time", "11");
      formData.append("amenities", item.selectedAmenities);
      item.images.forEach((image, index) => {
        formData.append(`property_image[${index}]`, image);
      });
      const response = main.propertyedit(uuid, formData);
      response
        .then((res) => {
          if (res?.data?.status) {
            console.log("update res", res)
            setLoading(false);
            toast.success(res.data.message);
            router.push("/admin/property");
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    } else {
      const main = new Listing();
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("city_id", item.city_id);
      formData.append("area_id", item.area_id);
      formData.append("pet_allowed", "1");
      formData.append("no_of_pet_allowed", item.pets);
      formData.append("description", item.about);
      formData.append("price", item.price);
      formData.append("properties_type", item.propertytype);
      formData.append("location", item.location);
      formData.append("bedrooms", item.bedrooms);
      formData.append("beds", item.beds);
      formData.append("bathrooms", item.bathrooms);
      formData.append("latitude", item.latitude);
      formData.append("longitudes", item.longitude);
      formData.append("discount_offer", "555");
      formData.append("check_in", " 11:55");
      formData.append("check_out", "12:12");
      formData.append("country_id", "101");
      formData.append("state_id", "33");
      formData.append("adults", item.adults);
      formData.append("children", item.children);
      formData.append("infants", "1");
      formData.append("free_cancel_time", "11");
      formData.append("amenities", item.selectedAmenities.join(","));
      item.images.forEach((image, index) => {
        formData.append("property_image[]", image);
      });
      const response = main.addproperty(formData);
      response
        .then((res) => {
          console.log("res", res)
          if (res?.data?.status === true ) {
            toast.success(res.data.message);
            setLoading(false);
          router.push("/admin/property")

          }else{
            toast.error(res.data.message);
            setLoading(false);
          }
          setItem({
            name: "",
            area_id: "",
            city_id: "",
            location: "",
            about: "",
            price: "",
            propertytype: "flat",
            children: "1",
            adults: "1",
            bedrooms: "1",
            beds: "1",
            bathrooms: "1",
            pets: "1",
            latitude: "",
            longitude: "",
            selectedAmenities: ""

          })
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    }
  };

  return (
    <>
      <style>{`
    .ammenties-checked-lists input:checked+ label { 
      background: #006fc7;
      color:#fff;
    }
    `}</style>
      {uuid ? <></> : <Element text={"Property"} />}

      <div
        className={`flex items-center justify-center px-6 py-8 ${uuid ? "w-full !px-0 !py-0" : "min-h-screen"
          }`}
      >
        <div className="max-w-4xl w-full space-y-8">
          <div
            className={`pages-wrapper  ${ uuid ? " max-w-[700px]" : ""
              } m-auto `}
          >
            <div className="flex flex-wrap  justify-between">
              <h2 className="text-xl font-bold mb-4 ">Add Property</h2>
              {uuid ? (
                <button onClick={onClose}>
                  <h2 className="text-xl font-bold mb-4 ">X</h2>
                </button>
              ) : (
                <></>
              )}
            </div>

            <div className={`${step === 1 ? "" : "display-none"}`}>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                >
                  Property Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 p-3 focus:outline-0 border rounded-lg w-full"
                  value={item.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex justify-center item-center ">
                  <div className=" ">
                    <label
                      htmlFor="propertyType"
                      className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                    >
                      Property Type
                    </label>
                    <select
                      required
                      id="propertyType"
                      className="mt-1 p-3 focus:outline-0 border rounded-lg w-full"
                      value={item.propertytype}
                      onChange={handleInputChange}
                      name="propertytype"
                    >
                      <option value="flat">Flat/Apartment</option>
                      <option value="house">House</option>
                      <option value="unique_space">Unique Space</option>
                      <option value="gust_house">Guest House</option>
                      <option value="hotel">Hotel</option>
                      <option value="single_room">single Room</option>
                      <option value="boutique_hotel">Boutique Hotel</option>
                    </select>
                  </div>
                  <div className="">
                  <label
                      htmlFor="citySelect"
                      className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                    >
                      City
                    </label>
                    <select  required
                      id="citySelect"
                      name="city_id"
                      onChange={handleInputChange}
                      className="mt-1 p-3 focus:outline-0 border rounded-lg w-full"
                    >
                       { LocaLcity ? (
                         <option value={LocaLcity}>{LocaLcity}</option>
                            ) : ( <option value={""}>OPTION</option>)}
                      {city &&
                        city.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                       
                    </select>
  </div>
  <div className="">
  <label
                      htmlFor="areaSelect"
                      className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                    >
                      Area
                    </label>
                    <select required
                      id="areaSelect"
                      name="area_id"
                      onChange={handleInputChange}
                      className="mt-1 p-3 focus:outline-0 border rounded-lg w-full"
                    >
                       {localarea ? (
                         <option value={localarea}>{localarea}</option>
                            ) : ( <option value={""}>Option </option>)}
                      {area &&
                        area.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                   </div>
                </div>
              </div>
              <div className="relative mt-4 text-sm font-medium text-gray-700">
                <label
                  htmlFor="location"
                  className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                >
                  Location
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    id="location"
                    name="location"
                    value={item.location}
                    onChange={handleLocationInputChange}
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    placeholder="Enter Location or Click to Select"
                    onClick={() => fetchLocationData(item.location)}
                  />
                </div>
              </div>
            </div>

            <div className={`${step === 2 ? " " : " display-none"}`}>
              <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-8 mt-5">
                <div>
                  <label
                    htmlFor="adults"
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Adult
                  </label>
                  <select
                    required
                    id="adults"
                    name="adults"
                    autoComplete="guests"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    value={item.adults}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="children"
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Children
                  </label>
                  <select
                    required
                    id="children"
                    name="children"
                    autoComplete="guests"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    value={item.children}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="bedrooms"
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Bedrooms
                  </label>
                  <select
                    required
                    id="bedrooms"
                    name="bedrooms"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    value={item.bedrooms}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="beds"
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Beds
                  </label>
                  <select
                    required
                    id="beds"
                    name="beds"
                    autoComplete="beds"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    value={item.beds}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="bathrooms"
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Bathrooms
                  </label>
                  <select
                    required
                    id="bathrooms"
                    name="bathrooms"
                    autoComplete="bathrooms"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    value={item.bathrooms}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="pet"
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Pets
                  </label>
                  <select
                    id="pet"
                    required
                    name="pets"
                    autoComplete="pet"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    value={item.pets}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>


            <div className={`${step === 3 ? " " : " display-none"}`}>
              <div className="">
                <h2 className="block text-lg mb-1 font-medium text-gray-700 mt-3 mb-3">
                  Amenities
                </h2>
                <div className="flex flex-wrap ammenties-checked-lists">
                  {amenitiesList.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={amenity.value}
                        name={amenity.value}
                        type="checkbox"
                        value={amenity.value}
                        className="mr-2 rounded text-indigo-600 focus:ring-indigo-500 hidden"
                        checked={item.selectedAmenities.includes(amenity.value)} 
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
                </div>
              </div>
            </div>

            <div className={`${step === 4 ? " " : " display-none"}`}>
              <div className="mt-4">
                <label
                  htmlFor="about"
                  className="block text-sm mb-2 font-medium text-gray-700 mt-3"
                >
                  Describe Your Property to Guests
                </label>
                <textarea
                  required
                  id="about"
                  name="about"
                  minCol={"5"}
                  minRow={"5"}
                  value={item.about}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-lg shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                  placeholder="Tell more about your property..."
                />
                <div className="flex flex-wrap justify-between">
                  <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                    {item?.about ? (
                      <span>{item.about.length}/100 characters</span>
                    ) : (
                      <span>0/100 characters</span>
                    )}

                  </label>
                  <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                    Minimum 100 words.
                  </label>
                </div>
              </div>
            </div>

            <div className={`${step === 5 ? " " : " display-none"}`}>
              <div className="flex items-center justify-center w-full mt-5 ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    name="images"
                    required
                    multiple
                  />
                </label>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

              {uuid ? (
  property_image?.map((item, index) => (
    <div key={index} className="relative">
      <button
        type="button"
        onClick={() => deletePropertyImage(uuid, item.uuid)}
        className="absolute right-0 top-0 bg-red-500 text-white rounded-full p-1 m-1"
      >
        &times;
      </button>
      <img
        src={item?.image_url}
        width={200}
        height={200}
        alt={`Preview ${index}`}
        className="max-w-xs max-h-44 w-full h-auto gap-5 mr-4"
      />
    </div>
  ))
) : (<></>)}
<div>
    {item?.images?.map((file, index) => (
      <div key={index} className="relative">
        <p>{index}</p>
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute right-0 top-0 bg-red-500 text-white rounded-full p-1 m-1"
        >
          &times;
        </button>
        <img
          src={URL.createObjectURL(file)}
          width={200}
          height={200}
          alt={`Preview ${index}`}
          className="max-w-xs max-h-44 w-full h-auto gap-5 mr-4"
          onLoad={() => URL.revokeObjectURL(file)}
        />
      </div>
    ))}
  </div>
              </div>

            </div>

            <div className={`${step === 6 ? "" : "display-none"}`}>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                >
                  Price
                </label>
                <input
                  required
                  type="text"
                  name="price"
                  id="name"
                  className="mt-1 p-3 focus:outline-0 border rounded-lg w-full"
                  value={item.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                disabled={step < 2}
                type="button"
                onClick={prevStep}
                className="inline-flex justify-center items-center h-10 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>

              {step < 6 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mx-auto flex justify-center mt-5 text-lg leading-tight text-center text-black bg-orange-300 border-2 p-4 rounded-full w-96"
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