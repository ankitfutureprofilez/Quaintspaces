import React, { useEffect, useState } from "react";
import amenitiesList from "../../../../aminites.json";
import Listing from "../../api/Listing";
import Element from "../../element";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
export default function Property() {
  const [step, setStep] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [Poperty, setPoperty] = useState({
    name: "",
    area_id: "",
    city_id: "",
    location: "",
    about: "",
    price: "",
    propertytype: "flat",
    children: "1",
    adults: "1",
    guests: "",
    bedrooms: "1",
    beds: "1",
    bathrooms: "1",
    pets: "1",
    latitude: "",
    longitude: "",
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

  const nextStep = () => {
    if (step == 1 && Poperty.name === "" || Poperty.area_id === "" || Poperty.city_id === "" || Poperty.location === "") {
     toast.error("All fields are required.");
      return false;
    } 
    if (step == 3 && Poperty.selectedAmenities && Poperty.selectedAmenities.length < 4) {
     toast.error("Please choose atleast 4 amenities.");
      return false;
    } 
    if (step == 4 && Poperty.about && Poperty.about.length < 100) {
     toast.error("Property description is too short. Descrption should be minimum 100 words.");
      return false;
    } 
    setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPoperty((prevState) => ({
        ...prevState,
        selectedAmenities: [...prevState.selectedAmenities, value],
      }));
    } else {
      setPoperty((prevState) => ({
        ...prevState,
        selectedAmenities: prevState.selectedAmenities.filter(
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
    if (manualLocation) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualLocation)}`
        );
        const locationData = response.data[0];
        console.log("locationData", locationData)
        if (locationData) {
          setPoperty((prevProperty) => ({
            ...prevProperty,
            location: manualLocation,
            latitude: locationData.lat.toString(),
            longitude: locationData.lon.toString(),
          }));
        }
      } catch (error) {
        console.log('Error fetching data for manual location:', error);
      }
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const locationData = response.data;
          console.log("location ", locationData)
          setPoperty((prevProperty) => ({
            ...prevProperty,
            location: locationData.display_name,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      }, () => {
        console.log("Geolocation failed");
      });
    }
  };

  const handleLocationInputChange = (event) => {
    const { name, value } = event.target;
    setPoperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));

  };

  async  function  updateproperty(){
    const main =  new  Listing();
      const  response =  main.propertyedit(slug);
      response.then((res)=>{
          console.log("res",res)
      }).catch((error)=>{
          console.log("error",error)
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["name", "propertytype", "city_id", "area_id", "location", "price" ,"about","latitude","longitude","selectedAmenities"];
    const isAnyFieldEmpty = requiredFields.some(field => !Poperty[field]);
    const areEnoughImagesSelected = Poperty?.images?.length >= 5;
    if (isAnyFieldEmpty || !areEnoughImagesSelected) {
      toast.error("Please fill all required fields and select at least five images.");
      return;
    }
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("name", Poperty.name);
    formData.append("city_id", Poperty.city_id);
    formData.append("area_id", Poperty.area_id);
    formData.append("pet_allowed", "1");
    formData.append("no_of_pet_allowed", Poperty.pets);
    formData.append("description", Poperty.about);
    formData.append("price", Poperty.price);
    formData.append("properties_type", Poperty.propertytype);
    formData.append("location", Poperty.location);
    formData.append("bedrooms", Poperty.bedrooms);
    formData.append("beds", Poperty.beds);
    formData.append("bathrooms", Poperty.bathrooms);
    formData.append("latitude", Poperty.latitude);
    formData.append("longitudes",Poperty.longitude);
    formData.append("discount_offer", "555");
    formData.append("check_in", " 11:55");
    formData.append("check_out", "12:12");
    formData.append("country_id", "101");
    formData.append("state_id", "33");
    formData.append("adults", Poperty.adults);
    formData.append("children", Poperty.children);
    formData.append("infants", "1");
    formData.append("free_cancel_time", "11");
    formData.append("amenities", Poperty.selectedAmenities.join(","));
    Poperty.images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    const response = main.addproperty(formData);
    response
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  return (
    <>
    <style>{`
    .ammenties-checked-lists input:checked+ label { 
      background: #006fc7;
      color:#fff;
    }
    `}</style>
      <Element />
      <div className="min-h-screen flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full space-y-8">

          <div className="pages-wrapper p-8 max-w-[700px] m-auto ">


            <h2 className="text-xl font-bold mb-4 " >Add Property</h2>
            <div className={`${step === 1 ? "" : "display-none"}`}>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm mb-1 font-medium text-gray-700 mt-3" >
                  Property Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 p-3 focus:outline-0 border rounded-lg w-full"
                  value={Poperty.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex justify-center item-center ">
                  <div className=" ">
                    <label
                      htmlFor="propertyType"
                      className="block text-sm mb-1 font-medium text-gray-700 mt-3" >
                      Property Type
                    </label>
                    <select
                      required
                      id="propertyType"
                      className="mt-1 p-3 focus:outline-0 border rounded-lg w-full"
                      value={Poperty.propertytype}
                      onChange={handleInputChange}
                      name="propertytype" >
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
                      <option>Choose a City</option>
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
                  className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                >
                  Location
                </label>
                <div className="relative">
                  <input  required
                    type="text"
                    id="location"
                    name="location"
                    value={Poperty.location}
                    onChange={handleLocationInputChange}
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    placeholder="Enter Location or Click to Select"
                    onClick={() => fetchLocationData(Poperty.location)}
                  />
                 
                  <button
                    onClick={() => fetchLocationData()}
                    className="absolute inset-y-0 right-2 flex items-center pr-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4c-2.761 0-5 2.239-5 5 0 3.86 5 11 5 11s5-7.14 5-11c0-2.761-2.239-5-5-5zm0 7a2 2 0 100-4 2 2 0 000 4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>


            <div className={`${step === 2 ? " " : " display-none"}`}>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 mt-5">
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Adult
                  </label>
                  <select  required
                    id="guests"
                    name="adults"
                    autoComplete="guests"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
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
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    children
                  </label>
                  <select  required
                    id="guests"
                    name="children"
                    autoComplete="guests"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
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
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Bedrooms
                  </label>
                  <select  required 
                    id="bedrooms"
                    name="bedrooms"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
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
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Beds
                  </label>
                  <select required 
                    id="beds"
                    name="beds"
                    autoComplete="beds"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
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
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Bathrooms
                  </label>
                  <select  required 
                    id="bathrooms"
                    name="bathrooms"
                    autoComplete="bathrooms"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
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
                    className="block text-sm mb-1 font-medium text-gray-700 mt-3"
                  >
                    Pets
                  </label>
                  <select
                    id="pet" required
                    name="pets"
                    autoComplete="pet"
                    className="mt-1 p-3 focus:outline-0 border rounded-lg w-full pe-16"
                    value={Poperty.pets}
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
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
                      <input required
                        id={amenity.value}
                        name={amenity.value}
                        type="checkbox"
                        value={amenity.value}
                        className="mr-2 rounded text-indigo-600 focus:ring-indigo-500 hidden"
                        checked={Property?.selectedAmenities?.includes(
                          amenity.value
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={amenity.value} className="me-2 mb-2 bg-gray-300 px-4 py-2 rounded-lg text-md text-gray-500 cursor-pointer">
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
                <textarea required
                  id="about"
                  name="about"
                  minCol={"5"}
                  minRow={"5"}
                  value={Poperty.about}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-lg shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                  placeholder="Tell more about your property..."
                />
                 <label
                  className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                  Minimum 100 words.
                </label>
              </div>
            </div>

            <div className={`${step === 5 ? " " : " display-none"}`}>
              <div className="flex items-center justify-center w-full mt-5 ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
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
                    name="images" required 
                    multiple
                  />
                </label>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {Poperty.images.map((file, index) => (
                  <div key={index} className="relative" >
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
            </div>


            <div className={`${step === 6 ? "" : "display-none"}`}>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm mb-1 font-medium text-gray-700 mt-3" >
                  Price
                </label>
                <input  required 
                  type="text"
                  name="price"
                  id="name"
                  className="mt-1 p-4 border rounded-full w-full"
                  value={Poperty.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="pt-6 flex justify-between">
                <button disabled={step < 2}
                  type="button"
                  onClick={prevStep}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
              ) : 
              <button
                type="submit"
                onClick={handleSubmit}
                className="mx-auto flex justify-center mt-5 text-lg leading-tight text-center text-black bg-orange-300 border-2 p-4 rounded-full w-96" >
                {Loading ? "processing.. " : "Submit"}
              </button>
              }
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
