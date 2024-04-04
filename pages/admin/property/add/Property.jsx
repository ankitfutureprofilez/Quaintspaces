import React, { useEffect, useState } from "react";
import amenitiesList from "../../../../aminites.json";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { House, Add } from 'iconsax-react'

const propertyTypes = [
  { value: "flat", label: "Flat" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" }
];

export default function Property(props) {

  const { isEdit, p, onClose } = props;
  const { uuid, location, children, adults, properties_type, name, price, description, bedrooms, beds, bathrooms, amenities, property_image } = p ? p : {};
  console.log("p", props.p);

  const router = useRouter();
  const [step, setStep] = useState(0);
  const [Loading, setLoading] = useState(false);

  function stringToArray(inputString) {
    return inputString.split(",");
  }

  const [images, setImages] = useState([]);
  const [PType, setPType] = useState(properties_type || "flat");


  
 const lstring = location ? JSON.parse(location.replace("/\\\"/g", '"')) : null;
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
    latitude: l && l.latitude ? l.latitude : '',
    longitude: l && l.longitude ? l.longitude : "",
  });

  console.log("address", address)

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const [typeHere, setTypeHere] = useState('entire_place');

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
    pets: "1",
    selectedAmenities: amenities ? stringToArray(amenities) : [],
    free_cancel_time: ""
  });

  console.log("item", item)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleFileChange = async (e) => {
    let files = Array.from(e.target.files);
    let arr = [];
    files.forEach(element => {
      arr.push(element);
    });
    setImages([...images, ...arr]);

    console.log("[...images, ...arr]", [...images, ...arr])

  };

  const removeImage = (f) => {
    const filter = images && images?.filter((file, index) => file !== f);
    setImages(filter);
  };

  const prevStep = () => setStep((prev) => prev - 1);
  const nextStep = async () => {
    if (step === 0 && PType == '') {
      toast.error("Please choose a property type which one you want to list.");
    }
    if (step === 1 && (item?.name === "" || item?.price === "" || item?.about === "")) {
      toast.error(`All fields are required.`);
      return false;
    }
    if (step === 1 && (!item?.about || item?.about?.trim()?.length === 0 || item?.about?.length < 100)) {
      toast.error("Property description is too short. Description should be a minimum of 100 words.");
      return false;
    }
    if (step === 2 && (
      address?.pin === "" || address?.pin?.length < 5 ||
      address?.state === "" ||
      address?.city === "" ||
      address?.street_address === "" ||
      address?.district === "")) {
      toast.error(`Incomplete address. Please enter complete address.`);
      return false;
    }
    if (step == 4 && item?.selectedAmenities && item?.selectedAmenities?.length < 4) {
      toast.error("Please choose atleast 4 amenities.");
      return false;
    }
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
  const [locationupdate, setLocationupdate] = useState([])
  const getNavigator = () => {
    if (typeof navigator !== 'undefined') {
      return navigator;
    } else {
      console.error('navigator is not available');
      return null;
    }
  };

 console.log("locationupdate",locationupdate)
 
 
  const fetchLocationData = async () => {
    setLoading(true);
    const navigatorObj = getNavigator();
    
    if (navigatorObj && navigatorObj.geolocation) {
      navigatorObj.geolocation.getCurrentPosition(async (position) => {
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
            setLocationupdate(locationData?.address);
          }
  
          console.log("location ", locationData);
          setAddress((address) => ({
            ...address,
            location: locationData.display_name,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            street_address: locationData?.address?.road || locationupdate?.road,
            district: locationData?.address?.state_district || locationupdate?.state_district,
            nearby: locationData?.address?.suburb || locationupdate?.suburb,
            city: locationData?.address?.city || locationupdate?.city,
            state: locationData?.address?.state ||locationupdate?.state  ,
            pin: locationData?.address?.postcode || locationupdate?.postcode
          }));
          setLoading(false);
  
        } catch (error) {
          setLoading(false);
          console.log('Error fetching data:', error);
        }
      }, () => {
        setLoading(false);
        console.log("Geolocation failed");
      });
    }
  };
  


  // const fetchLocationData = async () => {
  //   const navigatorObj = getNavigator();
  //   if (navigatorObj && navigatorObj.geolocation) {
  //     navigatorObj.geolocation.getCurrentPosition(async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       try {
  //         const response = await axios.get(
  //           `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  //         );
  //         const locationData = response.data;
  //         console.log("location ", locationData);
  //         setAddress((address) => ({
  //           ...address,
  //           location: locationData.display_name,
  //           latitude: latitude.toString(),
  //           longitude: longitude.toString(),
  //         }));
  //       } catch (error) {
  //         console.log('Error fetching data:', error);
  //       }
  //     }, () => {
  //       console.log("Geolocation failed");
  //     });
  //   }
  // };





  console.log("locationupdate", locationupdate)


  useEffect(() => {
    const fetchLocationData = async () => {
      setLoading(true);
      const { latitude, longitude } = address;
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const locationData = response.data;
        console.log("location ", locationData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    if (isEdit) {
      fetchLocationData();
    }
  }, [isEdit, address]);

  const [imageproperty, setImagesproperty] = useState(property_image);

  const deletePropertyImage = (recordUUID, itemUUID) => {
    const main = new Listing();
    main.propertyImagedelete(recordUUID, itemUUID)
      .then((response) => {
        toast.success(response.data.message);
        setImagesproperty(imageproperty.filter(item => item.uuid !== itemUUID));
        (property_image.filter(item => item.uuid !== itemUUID));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  async function handleSubmit(e) {
    console.log("item", { ...item, address, propertytype: PType, images });
    e.preventDefault();
    if (!isEdit && step === 5 && images?.length < 5) {
      toast.error("Please select at least five images.");
      return false;
    }
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("name", item?.name);
    formData.append("pets", item?.pets);
    formData.append("description", item?.about);
    formData.append("price", item?.price);
    formData.append("properties_type", PType);
    formData.append("bedrooms", item?.bedrooms);
    formData.append("beds", item?.beds);
    formData.append("bathrooms", item?.bathrooms);
    formData.append("adults", item?.adults);
    formData.append("children", item?.children);
    formData.append("address", JSON.stringify(address));
    formData.append("infants", "1");
    formData.append("free_cancel_time", "1");
    formData.append("amenities", item?.selectedAmenities);
    formData.append("type", typeHere);
    images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    const response = isEdit ? main.propertyedit(uuid, formData) : main.addproperty(formData);
    response.then(res => {
      if (res?.data?.status === true) {
        if (isEdit) {
          onClose();
          toast.success(res.data.message);
        } else {
          router.push("/admin/property");
          toast.success(res.data.message);

        }
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.log("error", error);
    });
  };

  useEffect(() => {
    console.log("images", images)
  }, [images])

  return (
    <>
      <style >{`
      .ammenties-checked-lists input:checked+ label { background: #006fc7;color:#fff;}
      // .property-type:checked + label { color :#000 !important;border-color:#000 !important;}
      // .property-type:checked + label h2 { color :#000 !important;border-color:#000 !important;}
    `}</style>

      <div className={`w-full  flex items-center justify-center px-6 py-8 `} >
        <div className="max-w-4xl w-full space-y-8 w-full ">
          <div
            className={`pages-wrapper  ${uuid ? " max-w-[700px]" : ""} m-auto `} >

            <div className={`${step === 0 ? "" : "display-none"} max-w-[600px] m-auto table w-full`}>
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
              <h2 className="text-3xl text-center mt-4 font-bold mb-8" >Which of these best describes your place?</h2>
              <div className="grid grid-cols-3 gap-4  " >
                {propertyTypes && propertyTypes.map((p, i) => {
                  return <div className="" >
                    <div onClick={() => setPType(p.value)} className={`${p.value === PType ? "bg-indigo-500" : ""} block propety-type-wrap cursor-pointer p-4 border rounded-xl`} >
                      <House size="52" color={p.value === PType ? "#ffffff" : "#dedede"} />
                      <h2 className={`${p.value === PType ? "text-gray-100" : "text-gray-400"} text-xl mt-4 font-normal `} >{p.label}</h2>
                    </div>
                  </div>
                })}
              </div>
              {/* </> : '' } */}
            </div>

            <div className={`${step === 1 ? "" : "display-none"} max-w-[600px] m-auto table w-full`}>
              <h2 className="text-3xl text-center font-bold mb-8" >Describes your place?</h2>
              <div className="mt-4">
                <input
                  required
                  type="text"
                  name="name" placeholder="Property Name"
                  id="name"
                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                  value={item?.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative mt-4 text-sm font-medium text-gray-700">
                <input
                  required
                  type="number"
                  name="price" placeholder="Property Price"
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
                    value={item?.about}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                    placeholder="Tell more about your property..."
                  />
                  <div className="flex flex-wrap justify-between">
                    <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                      {item?.about ? (
                        <span>{item?.about.length}/100 characters</span>
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
            </div>

            <div className={`${step === 2 ? "" : "display-none"}`}>
              <h2 className="text-3xl text-center font-bold mb-2" >Where's your place located?</h2>
              <p className="text-normal text-center text-gray-500 mb-8" >Your address is only shared with guests after they’ve made a reservation.</p>

              <div class="table w-full m-auto max-w-[500px] space-y-4 text-center">
                <p>{address?.location}</p>
                <div class="w-full mt-4"   >
                  <button className="btn sort w-full" onClick={fetchLocationData}>
                    {Loading ? "...." : "Use Current Location"}
                  </button>

                </div>
                <div class="flex items-center justify-center space-x-4">
                  <div class="font-semibold text-gray-400 py-3 text-center">OR</div>
                </div>
                <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
  <input
    defaultValue={isEdit ? address.flat_house : ""}
    name='flat_house'
    onChange={handleAddress}
    type="text"
    placeholder="Flat, house, etc. (if applicable)"
    className="w-full border border-gray-300 rounded-0 border-t-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
  />
  <input
    defaultValue={isEdit ? (locationupdate?.suburb || address.street_address) : address.street_address}
    name="street_address"
    onChange={handleAddress}
    type="text"
    placeholder="Street Address"
    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
  />
  <input
    defaultValue={isEdit ? (locationupdate?.road || address.nearby) : (locationupdate?.road || address.nearby) }
    name="nearby"
    onChange={handleAddress}
    type="text"
    placeholder="Nearby Landmark (if applicable)"
    
    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
  />
  <input
    defaultValue={isEdit ? (locationupdate?.state_district || address.district) : address.district}
    name="district"
    onChange={handleAddress}
    type="text"
    placeholder="District/Locality"
    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
  />
  <input
    defaultValue={isEdit ? (locationupdate?.city || address.city) : address.city}
    name="city"
    onChange={handleAddress}
    type="text"
    placeholder="City/Town"
    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
  />
  <input
    defaultValue={isEdit ? (locationupdate?.state || address.state) : address.state}
    name="state"
    onChange={handleAddress}
    type="text"
    placeholder="State"
    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
  />
  <input
    defaultValue={isEdit ? (locationupdate?.postcode || address.pin) : address.pin}
    name="pin"
    onChange={handleAddress}
    type="text"
    placeholder="PIN Code"
    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
  />
</div>
              </div>
            </div>
            <div className={`${step === 3 ? "" : "display-none"}`}>
              <h2 className="text-3xl text-center font-bold mb-8" >Let's start with the basics</h2>
              <h2 className="text-xl text-center font-bold mb-8" >How many people can stay here?</h2>
              <div className="grid grid-cols-1 max-w-[500px] m-auto table gap-y-2 sm:grid-cols-2 sm:gap-x-8 mt-5">
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
                    value={item?.adults}
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
                    value={item?.children}
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
                    value={item?.bedrooms}
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
                    value={item?.beds}
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
                    value={item?.bathrooms}
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
                    value={item?.pets}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>




            <div className={`${step === 4 ? "" : "display-none"}`}>
              <h2 className="text-3xl text-center font-bold mb-2" >Tell guests what your place has to offer</h2>
              <p className="text-normal text-center text-gray-500 mb-8" >You can add more amenities after you publish your listing.</p>

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
                      className="me-2 mb-2 bg-gray-300 px-4 py-2 rounded-lg text-md text-gray-500 cursor-pointer" >
                      {amenity.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            <div className={`${step === 5 ? "" : "display-none"} max-w-[600px] m-auto`}>
              <h2 className="text-3xl text-center font-bold mb-2" >Add some photos of your {PType ? PType.replace("_", ' ') : "house"}</h2>
              <p className="text-normal text-center text-gray-500 mb-8" >You'll need 5 photos to get started. You can add more or make changes later.</p>




              <div className="grid grid-cols-2 md:grid-cols-3 gap-4  mt-16 ">

                {isEdit ? (
                  imageproperty?.map((item, index) => (
                    <div key={index} className="relative isedits">
                      <img
                        className="image-preview object-cover border min-h-[150px] max-h-[200px] h-full w-full max-w-full rounded-lg"
                        src={item?.image_url}
                        width={200}
                        height={200}
                        alt={`Preview ${index}`}
                      />
                      <button
                        type="button"
                        onClick={() => deletePropertyImage(uuid, item?.uuid)}
                        className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1" >
                        Remove
                      </button>
                    </div>
                  ))
                ) : ''}

                {images && images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      width={200}
                      height={200}
                      alt={`Preview ${index}`}
                      className="image-preview h-full object-cover border min-h-[150px] max-h-[200px] w-full max-w-full rounded-lg"
                      onLoad={() => URL.revokeObjectURL(file)}
                    /> fsdfsdfsd
                    <button type="button"
                      onClick={() => removeImage(file)}
                      className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1" >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {isEdit ?

                <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add
                        size="100"
                        color="#ccc"
                      />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
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
                : <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add
                        size="100"
                        color="#ccc"
                      />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
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
                </div>}

            </div>


            <div className="pt-6 flex justify-between max-w-[500px] table m-auto">
              <button
                disabled={step < 1}
                type="button"
                onClick={prevStep}
                className="inline-flex justify-center items-center h-10 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" >
                Back
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 " >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 " >
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