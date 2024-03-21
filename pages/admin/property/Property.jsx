import axios from "axios";
import React, { useEffect, useState } from "react";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "../components/layout/PageNavbar";
import { Add, Notification, SearchNormal1, Setting4 } from "iconsax-react";
import PageContent from "../components/layout/PageContent";
import amenitiesList from "../../../aminites.json";
import Listing from "../api/Listing";

export default function Property() {
  const [step, setStep] = useState(1);

  const [Poperty, setPoperty] = useState({
    propertyName: "",
    about: "",
    price: "",
    propertytype: "",
    children: "",
    adults: "",
    guests: "",
    bedrooms: "",
    area_id: "",
    beds: "",
    bathrooms: "",
    city_id: "",
    pets: "",
    location: "",
    address: "",
    selectedAmenities: [],
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPoperty({
      ...Poperty,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    let filesToAdd = Array.from(e.target.files);
    let newImages = Poperty.images.concat(filesToAdd).slice(0, 6);
    setPoperty((prevPoperty) => ({
      ...prevPoperty,
      images: newImages,
    }));
  };

  const removeImage = (indexToRemove) => {
    setPoperty((prevPoperty) => ({
      ...prevPoperty,
      images: prevPoperty.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPoperty((prevData) => ({
        ...prevData,
        selectedAmenities: [...prevData.selectedAmenities, value],
      }));
    } else {
      setPoperty((prevData) => ({
        ...prevData,
        selectedAmenities: prevData.selectedAmenities.filter(
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
    // console.log("rs", response)
    response
      .then((res) => {
        // console.log("res", res)children
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
          // console.log("ara", res)
          setArea(res?.data?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchAreaList();
  }, []);

  // console.log("area", area)
  // const fetchLocationData = async () => {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(async (position) => {
  //             const { latitude, longitude } = position.coords;
  //             try {
  //                 const response = await axios.get(
  //                     `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  //                 );
  //                 const locationData = response.data;
  //                 // console.log(locationData)
  //                 setPoperty((prevPoperty) => ({
  //                     ...prevPoperty,
  //                     location: locationData.display_name,
  //                     address: locationData.display_name
  //                 }));
  //             } catch (error) {
  //                 console.log('Error fetching data:', error);
  //             }
  //         }, handleGeolocationError);
  //     }
  // };
  const handleGeolocationError = () => {
    // setError('Geolocation failed');
    console.log("Geolocation failed");
  };
  const handleLocationClick = () => {
    // fetchLocationData();
  };

  const handleLocationInputChange = (event) => {
    const { name, value } = event.target;
    setPoperty((prevPoperty) => ({
      ...prevPoperty,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const main = new Listing();
    const formData = new FormData();
    formData.append("name", Poperty.propertyName);
    formData.append("pet_allowed", "1");
    formData.append("no_of_pet_allowed", Poperty.pets);
    formData.append("description", Poperty.about);
    formData.append("price", Poperty.price);
    formData.append("properties_type", Poperty.propertytype);
    formData.append("location", Poperty.location);
    formData.append("bedrooms", Poperty.bedrooms);
    formData.append("beds", Poperty.beds);
    formData.append("bathrooms", Poperty.bathrooms);
    formData.append("latitude", "2222.22588");
    formData.append("longitudes", "2222.22588");
    formData.append("discount_offer", "555");
    formData.append("check_in", " 11:55");
    formData.append("check_out", "12:12");
    formData.append("country_id", "101");
    formData.append("state_id", "33");
    formData.append("city_id", Poperty.city_id);
    formData.append("area_id", Poperty.area_id);
    formData.append("adults", Poperty.adults);
    formData.append("children", Poperty.children);
    formData.append("infants", "1");
    formData.append("free_cancel_time", "11");
    formData.append("amenities", Poperty.selectedAmenities.join(","));
    Poperty.images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    console.log("ddd",formData)
    const response = main.addproperty(formData);
    response
      .then((res) => {
        if (res?.data?.status) {
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <PageNavbar>
        <PageNavbarLeftContent>
          <div className="border rounded-full w-10 h-10 all-center">
            <Setting4 size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">Property</h1>
            <p className="text-xs font-medium text-gray-500">
              Add your property to here
            </p>
          </div>
        </PageNavbarLeftContent>

        <PageNavbarRightContent>
          <PageNavbarIconButton>
            <SearchNormal1 size={16} />
          </PageNavbarIconButton>
          <PageNavbarIconButton>
            <Notification size={16} />
          </PageNavbarIconButton>
          <PageNavbarPrimaryButton>
            <Add size={16} />
            <span className="hidden md:inline">Add integration</span>
          </PageNavbarPrimaryButton>
        </PageNavbarRightContent>
      </PageNavbar>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="bg-white shadow rounded-lg p-8 sm:p-12">
            <div className="pt-6 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#000000"
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    />
                    <path
                      fill="#000000"
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    />
                  </svg>
                </button>
              )}
              {step < 10 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    id="_24x24_On_Light_Next"
                    data-name="24x24/On Light/Next"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      id="view-box"
                      width="24"
                      height="24"
                      fill="#141124"
                      opacity="0"
                    />
                    <path
                      id="Shape"
                      d="M10.22,9.28a.75.75,0,0,1,0-1.06l2.72-2.72H.75A.75.75,0,0,1,.75,4H12.938L10.22,1.281A.75.75,0,1,1,11.281.22l4,4a.749.749,0,0,1,0,1.06l-4,4a.75.75,0,0,1-1.061,0Z"
                      transform="translate(4.25 7.25)"
                      fill="#141124"
                    />
                  </svg>
                </button>
              )}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <span className="text-0"></span>
                <div className="flex flex-col text-left">
                  <div className="flex flex-col space-y-2">
                    <div>Step 1</div>
                    <h1 className="text-2xl font-bold">
                      Make your place stand out
                    </h1>
                    <div>
                      In this step, you’ll add some of the amenities your place
                      offers, plus 5 or more photos. Then you’ll create a title
                      and description.
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <video
                        className="w-full object-cover"
                        autoPlay
                        crossOrigin="anonymous"
                        playsInline
                        preload="auto"
                      >
                        <source src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high" />
                      </video>
                      <div className="relative">
                        <div
                          className="absolute inset-0 bg-cover bg-no-repeat"
                          style={{
                            backgroundImage:
                              "url('https://a0.muscache.com/4ea/air/v2/pictures/4d3a607e-7a32-4f78-bcb0-8841fdac8773.jpg')",
                          }}
                        >
                          <img
                            className="w-full h-full object-cover opacity-0"
                            alt=""
                            src="https://a0.muscache.com/4ea/air/v2/pictures/4d3a607e-7a32-4f78-bcb0-8841fdac8773.jpg"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <div className="mt-4">
                  <label
                    htmlFor="propertyName"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    id="propertyName"
                    className="mt-1 p-4 border rounded-full w-full"
                    value={Poperty.propertyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-center item-center ">
                    <div className=" ">
                      <label
                        htmlFor="propertyType"
                        className="block text-lg font-medium text-gray-700 mb-1"
                      >
                        Property Type
                      </label>
                      <select
                        id="propertyType"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={Poperty.propertytype}
                        onChange={handleInputChange}
                        name="propertytype"
                      >
                        <option value="">Select a property type</option>
                        <option value="flat">Flat/</option>
                        <option value="house">House</option>
                        <option value="unique_space">Unique Space</option>
                        <option value="gust_house">Guest House</option>
                        <option value="hotel">Hotel</option>
                        <option value="single_room">single Room</option>
                        <option value="boutique_hotel">Boutique Hotel</option>
                      </select>
                    </div>
                    <div className="max-w-sm mx-auto">
                      <label
                        htmlFor="citySelect"
                        className="block text-lg font-medium text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <select
                        id="citySelect"
                        name="city_id"
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Choose a City</option>
                        {city &&
                          city.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="max-w-sm mx-auto">
                      <label
                        htmlFor="areaSelect"
                        className="block text-lg font-medium text-gray-700 mb-1"
                      >
                        Area
                      </label>
                      <select
                        id="areaSelect"
                        name="area_id"
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Choose an Area</option>
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
                    className="block text-lg font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={Poperty.location}
                      onChange={handleLocationInputChange}
                      className="mt-1 p-4 border rounded-full w-full pl-4 pr-12" // Adjust padding accordingly
                      placeholder="Enter Location or Click to Select"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                      onclick={handleLocationClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4c-2.761 0-5 2.239-5 5 0 3.86 5 11 5 11s5-7.14 5-11c0-2.761-2.239-5-5-5zm0 7a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 mt-5">
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-lg  font-medium text-gray-700"
                  >
                    Adult
                  </label>
                  <select
                    id="guests"
                    name="adults"
                    autoComplete="guests"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={Poperty.adults}
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-lg font-medium text-gray-700"
                  >
                    children
                  </label>
                  <select
                    id="guests"
                    name="children"
                    autoComplete="guests"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={Poperty.children}
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="bedrooms"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={Poperty.bedrooms}
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="beds"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Beds
                  </label>
                  <select
                    id="beds"
                    name="beds"
                    autoComplete="beds"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={Poperty.beds}
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="bathrooms"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Bathrooms
                  </label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    autoComplete="bathrooms"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={Poperty.bathrooms}
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="pet"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Pets
                  </label>
                  <select
                    id="pet"
                    name="pets"
                    autoComplete="pet"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={Poperty.pets}
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="max-w-lg mx-auto mt-8">
                <h2 className="block text-lg font-medium text-gray-700">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {amenitiesList.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={amenity.value}
                        name={amenity.value}
                        type="checkbox"
                        value={amenity.value}
                        className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                        checked={Property?.selectedAmenities?.includes(amenity.value)}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={amenity.value} className="text-lg">
                        {amenity.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step === 5 && (
              <>
                <div className="mt-4">
                  <label
                    htmlFor="about"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Describe Your Property to Guests
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    minCol={"5"}
                    minRow={"5"}
                    value={Poperty.about}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="Tell more about your property..."
                  />
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <div className="flex items-center justify-center w-full mt-5 ">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      name="images"
                      multiple
                    />
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {Poperty.images.map((file, index) => (
                    <div key={index} className="relative">
                      {/* Overlay Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-0 top-0 bg-red-500 text-white rounded-full p-1 m-1"
                      >
                        &times;
                      </button>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="max-w-xs max-h-44 w-full h-auto gap-5 mr-4"
                        onLoad={() => URL.revokeObjectURL(file)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {step === 7 && (
              <>
                <div className="mt-4">
                  <label
                    htmlFor="propertyName"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="propertyName"
                    className="mt-1 p-4 border rounded-full w-full"
                    value={Poperty.price}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mx-auto flex justify-center mt-5 text-lg leading-tight text-center text-black bg-orange-300 border-2 p-4 rounded-full w-96"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
