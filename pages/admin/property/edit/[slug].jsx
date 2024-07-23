import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import Property from "../add/Property"
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { RiDoorLockBoxLine } from "react-icons/ri";
import { MdOutlineFreeBreakfast, MdOutlineKeyboardAlt, MdPhonelinkLock } from "react-icons/md";
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
import Guest from "../add/Guest";
import CancelPolicy from "../add/CancelPolicy";
import HouseRules from "../add/HouseRules";
import Amenities from "../add/Amenities";
import Checkout from "../add/Checkout";
import axios from "axios";

const propertyTypes = [
  { value: "flat", label: "Flat & Apartment" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "farm", label: "Farm" },
  { value: "breakfast", label: "Bed & Breakfast" },
];

export default function Edit() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [editguide, setEditguide] = useState("space");
  const [record, setRecord] = useState({
    loading: true,
    data: {},
  });

  console.log("record", record)

  const fetchProperty = async (slug) => {
    if (slug) {
      setLoading(true);
      const main = new Listing();
      try {
        const response = await main.viewproperty(slug || "");
        setRecord({
          loading: false,
          data: response?.data?.data,
        });
      } catch (err) {
        setRecord({
          loading: true,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProperty(slug);
  }, [slug]);

  function stringToArray(inputString) {
    return inputString.split(",");
  }
  console.log("record", record);

  const useExistingImages = true;
  const isEdit = true;
  useEffect(() => {
    if (!record.loading) {
      setItem({
        Guests: record?.data?.guests || "",
        name: record?.data?.name || "",
        about: record?.data?.description || "",
        propertytype: record?.data?.property_type || "flat",
        customLink: record?.data?.custom_link || "",
        price: record?.data?.price || "",
        discount: record?.data?.discount_offer || "",
        Direction: record?.data?.property_rule?.direction || "",
        wifi: record?.data?.property_rule?.wifi_username || "",
        additonalrule: record?.data?.property_rule?.additional_rules || "",
        wifiPassword: record?.data?.property_rule?.wifi_password || "",
        housemanual: record?.data?.property_rule?.house_manuals || "",
        location: record?.data?.address || "",
        extra_guest: record?.data?.extra_guest_fee || "",
        pet: record?.data?.pet_fee || "",
        cleaning: record?.data?.cleaning_fee || ""
      });
      setImagesproperty(record?.data?.property_image || [])
      setGuests(record?.data?.guests || 1)
      setBeds(record?.data?.beds || 1)
      setBeds(record?.data?.beds || 1)
      setBathrooms(record?.data?.bathrooms || 0.5)
      setBedrooms(record?.data?.bedrooms || 1)
      setPType(record?.data?.property_type || "flat");
      setSelectedPolicy(record?.data?.property_rule?.standard_policy)
      setPetsAllowed(record?.data?.property_rule?.pet_allowed || 0);
      setEventsAllowed(record?.data?.property_rule?.events_allowed || 0);
      setSmokingAllowed(record?.data?.property_rule?.smoking_allowed || 0);
      setQuietHours(record?.data?.property_rule?.quiet_hours_allowed || 0);
      setPhotographyAllowed(record?.data?.property_rule?.photography_allowed || 0);
      setPets(record?.data?.property_rule?.pet_allowed || 0);
      setLongTermPolicy(record?.data?.property_rule?.long_term_policy);
      setCheckinStart(record?.data?.check_in || "00:00");
      setCheckinquiet(record?.data?.property_rule?.quite_hours_in_time || "00:00")
      setCheckoutquiet(record?.data?.property_rule?.quite_hours_out_time || "00:00")
      setSelectedAmenity(record?.data?.amenities ? (stringToArray(record?.data?.amenities)) : []);
      setstandoutAmenity(record?.data?.standout_amenity ? (stringToArray(record?.data?.standout_amenity)) : [])
      setAmenity(record?.data?.safety_amenity ? (stringToArray(record?.data?.safety_amenity)) : [])
      setCheckinEnd(record?.data?.flexible_check_in || "flexible");
      setCheckout(record?.data?.check_out || "00:00");
      setSelectedMethod(record?.data?.check_in_method || "smartlock");
      setcheckdescrtion(record?.data?.check_in_description || "");
      setselecbhktype(record?.data?.bhk_type || null);
      setTypeHere(record?.data?.type || "entire_place");
      setSelectedOption(record?.data?.status || 0);
    }
  }, [record]);
  const [typeHere, setTypeHere] = useState();

  const [selectedOption, setSelectedOption] = useState();
  const handleOptionChange = (event) => {
    const option = parseInt(event.target.value, 10);
    setSelectedOption(selectedOption === option ? "" : option);
  };
  const [selectedInstruction, setSelectedInstruction] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [text, setText] = useState("");
  const [selectedMethod, setSelectedMethod] = useState();
  const [checkdescrtion, setcheckdescrtion] = useState();
  const [checkoutInstructions, setCheckoutInstructions] = useState([]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setcheckdescrtion("");
  };

  const handlecheckChange = (e) => {
    setcheckdescrtion(e.target.value);
  };

  const [item, setItem] = useState({
    about: "",
    propertytype: "",
    name: "",
    Guests: "",
    Beds: "",
    Bedrooms: "",
    Bathrooms: "",
    customLink: '',
    discount: '',
    price: '',
    Direction: "",
    wifi: "",
    wifiPassword: "",
    housemanual: "",
    cleaning: "",
    pet: "",
    extra_guest: ""
  });
  console.log("location",record?.data?.location )
  const lstring = record?.data?.location ? JSON.parse(record?.data?.location?.replace('/\\/g', '"')) : null;
  console.log("lstring",lstring)
  
  const l = JSON.parse(lstring);
  console.log("l",l)


  const [address, setAddress] = useState({
    street_address: '',
    flat_house: '',
    district: '',
    nearby: '',
    city: '',
    state: '',
    pin: '',
    location: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    setAddress({
      street_address: l?.street_address,
      flat_house: l?.flat_house ?? "",
      district: l?.district ?? "",
      nearby: l?.nearby ?? "",
      city: l?.city ?? "",
      state: l?.state ?? "",
      pin: l?.pin ?? "",
      location: l?.location ?? "",
      latitude: l?.latitude ?? "",
      longitude: l?.longitude ?? "",
    });
  }, [l]);

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
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
  const [loadinglocation, setLoadinglocation] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState("");
  const [infoWindow, setInfoWindow] = useState(null); // For handling InfoWindow instance
  const [map, setMap] = useState(null);


  const fetchLocationData = async () => {
    if (loadinglocation) {
      return;
    }
    setLoadinglocation(true);
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
            setMarkerPosition({
              lat: latitude,
              lng: longitude,
            });
            setCenter({
              lat: latitude,
              lng: longitude,
            });
            setLocationName(locationData.display_name);
            setLoadinglocation(false);
          } catch (error) {
            setLoadinglocation(false);
            console.log("Error fetching data:", error);
          }
        },
        () => {
          setLoadinglocation(false);
          console.log("Geolocation failed");
        }
      );
    }
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
        setMarkerPosition({
          lat: results[0]?.geometry?.location?.lat,
          lng: results[0]?.geometry?.location?.lng,
        });
        setCenter({
          lat: results[0]?.geometry?.location?.lat,
          lng: results[0]?.geometry?.location?.lng,
        });
        setAddress({
          ...address,
          location: results[0]?.formatted_address,
          latitude: results[0]?.geometry?.location?.lat,
          longitude: results[0]?.geometry?.location?.lng,
        });
        setLocationName(results[0].formatted_address);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [markerPosition]);

  const initializeMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 16, // Higher zoom level
      center: markerPosition,
    });

    const marker = new window.google.maps.Marker({
      position: markerPosition,
      map: map,
      draggable: true,
    });

    // Initialize InfoWindow
    const infoWindow = new window.google.maps.InfoWindow({
      content: locationName,
    });

    // Set InfoWindow instance to state
    setInfoWindow(infoWindow);

    // Show location info when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(locationName);
      infoWindow.open(map, marker);
    });

    // Update marker position and address on drag end
    window.google.maps.event.addListener(marker, "dragend", function (event) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      setMarkerPosition({ lat: newLat, lng: newLng });
      setCenter({ lat: newLat, lng: newLng });

      // Fetch the new address
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${newLat}&lon=${newLng}&format=json`
        )
        .then((response) => {
          const locationData = response.data;
          setAddress((prev) => ({
            ...prev,
            location: locationData.display_name,
            latitude: newLat,
            longitude: newLng,
            street_address: locationData?.address?.road || "",
            district: locationData?.address?.state_district || "",
            nearby: locationData?.address?.suburb || "",
            city: locationData?.address?.city || "",
            state: locationData?.address?.state || "",
            pin: locationData?.address?.postcode || "",
          }));
          setLocationName(locationData.display_name); // Update the location name
          infoWindow.setContent(locationData.display_name); // Update the info window content
        })
        .catch((error) => {
          console.error("Error fetching new address:", error);
        });
    });
  };

  const options = [
    {
      item: "smartlock",
      data: "Guests will use a code or app to open a wifi-connected lock.",
      icon: <MdPhonelinkLock size={24} />,
    },
    {
      item: "keypad",
      data: "Guests will use the code you provide to open an electronic lock.",
      icon: <MdOutlineKeyboardAlt size={24} />,
    },
    {
      item: "lockbox",
      data: "Guests will use a code you provide to open a small safe that has a key inside.",
      icon: <RiDoorLockBoxLine size={24} />,
    },
    {
      item: "staff",
      data: "Someone will be available 24 hours a day to let guests in.",
      icon: <GrUserWorker size={24} />,
    },
  ];
  const [selectedAmenity, setSelectedAmenity] = useState();
  // 
  const [checkinEnd, setCheckinEnd] = useState();
  // 
  const [checkout, setCheckout] = useState();


  const [Amenity, setAmenity] = useState();
  const [standoutAmenity, setstandoutAmenity] = useState();
  const [Guests, setGuests] = useState();
  const [Beds, setBeds] = useState();
  const [Bathrooms, setBathrooms] = useState();
  const [Bedrooms, setBedrooms] = useState();
  const [pets, setPets] = useState();
  const [checkinStart, setCheckinStart] = useState();
  const [checkinquet, setCheckinquiet] = useState( );
  const [checkoutquet, setCheckoutquiet] = useState( );
  const [PType, setPType] = useState(record?.data?.property_type || "flat");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const [selectbooking, setSelectedbooking] = useState('instant');
  const handleBookingChange = (option) => {
    setSelectedbooking(option);
  };

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [longTermPolicy, setLongTermPolicy] = useState(null);
  const [showFlexible, setShowFlexible] = useState(true);
  const [showFirm, setShowFirm] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(

  );
  const [eventsAllowed, setEventsAllowed] = useState( );
  const [smokingAllowed, setSmokingAllowed] = useState( );
  const [quietHours, setQuietHours] = useState( );
  const [PhotographyAllowed, setPhotographyAllowed] = useState( );
  
 
  const baseurl = "https://quant-stay.vercel.app/properties/";
  const fulllink = baseurl + item?.customLink;
  const handleFileChange = async (e) => {
    let files = Array.from(e?.target?.files);
    setImages([...images, ...files]);
  };

  const removeImage = (f) => {
    const filteredImages = images.filter((file) => file !== f);
    setImages(filteredImages);
  };

  const moveImageToFront = (index) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages?.splice(index, 1);
    updatedImages?.unshift(movedImage);
    setImages(updatedImages);
  };

  const moveImageBackward = (index) => {
    if (index < images?.length - 1) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index + 1]] = [
        updatedImages[index + 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };

  const moveImageForward = (index) => {
    if (index > 0) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index - 1]] = [
        updatedImages[index - 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };

  const handleAction = (action, index) => {
    if (action === "remove") removeImage(images[index]);
    if (action === "makeCover") moveImageToFront(index);
    if (action === "moveForward") moveImageForward(index);
    if (action === "moveBackward") moveImageBackward(index);
  };
  const [images, setImages] = useState([]);

  const handleDrag = (ev) => {
    setDragId(ev?.currentTarget?.id);
  };
  const copyToClipboard = () => {
    const textToCopy = `${baseurl}${item?.customLink}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => { })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleTabClick = (value) => {
    setEditguide(value);
  };

  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? 0 : index);
  };

  const handleOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = images?.find((image) => image.name === dragId);
    const dropImage = images?.find(
      (image) => image.name === ev.currentTarget.id
    );
    const dragIndex = images?.indexOf(dragImage);
    const dropIndex = images?.indexOf(dropImage);
    const updatedImages = [...images];
    updatedImages?.splice(dragIndex, 1);
    updatedImages?.splice(dropIndex, 0, dragImage);
    setImages(updatedImages);
  };

  const [imageproperty, setImagesproperty] = useState();

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
  const DropdownMenu = ({ index, isFirst, isLast }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleActionClick = (action) => {
      handleAction(action, index);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-white text-xl text-black rounded-lg px-2 py-1 mx-1 mt-1 shadow-lg"
        >
          <BsThreeDotsVertical />
        </button>
        {isOpen && (
          <ul className="absolute text-sm right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <li
              className="cursor-pointer px-2 py-2 hover:bg-gray-200"
              onClick={() => handleActionClick("remove")}
            >
              Remove
            </li>
            {!isFirst && (
              <>
                <li
                  className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                  onClick={() => handleActionClick("makeCover")}
                >
                  Make Cover
                </li>
                <li
                  className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                  onClick={() => handleActionClick("moveForward")}
                >
                  Move Forward
                </li>
              </>
            )}
            {!isLast && (
              <li
                className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                onClick={() => handleActionClick("moveBackward")}
              >
                Move Backward
              </li>
            )}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => { }, [images]);

  const [selecbhktype, setselecbhktype] = useState();

  const handleselecbhktype = (option) => {
    setselecbhktype(option);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("type", typeHere);
    formData.append("properties_type", PType);
    formData.append("name", item?.name);
    formData.append("no_of_pet_allowed", pets);
    formData.append("description", item?.about);
    formData.append("price", item?.price);
    formData.append("bedrooms", Bedrooms);
    formData.append("bathrooms", Bathrooms);
    formData.append("guests", Guests);
    formData.append("beds", Beds);
    formData.append("custom_link", item?.customLink);
    formData.append("address", JSON.stringify(address));
    formData.append("amenities", selectedAmenity);
    formData.append("standout_amenity", standoutAmenity);
    formData.append("safety_amenity", Amenity);
    formData.append("cleaning_fee", item?.cleaning);
    formData.append("extra_guest_fee", item?.extra_guest);
    formData.append("pet_fee", item?.pet);
    formData.append("flexible_check_in", checkinEnd);
    formData.append("check_in", checkinStart);
    formData.append("bhk_type",selecbhktype)
    formData.append("check_out", checkout);
    formData.append("status", selectedOption);
    formData.append("standard_policy", selectedPolicy);
    formData.append("wifi_username", item?.wifi);
    formData.append("wifi_password", item?.wifiPassword);
    formData.append("long_term_policy", longTermPolicy);
    formData.append("house_manuals", item?.housemanual);
    formData.append("pet_allowed", petsAllowed);
    formData.append("events_allowed", eventsAllowed);
    formData.append("direction", item?.Direction);
    formData.append("smoking_allowed", smokingAllowed);
    formData.append("quiet_hours_allowed", quietHours);
    formData.append("photography_allowed", PhotographyAllowed);
    formData.append("additional_rules", item?.additonalrule);
    formData.append("quite_hours_in_time", checkinquet);
    formData.append("quite_hours_out_time", checkoutquet);
    formData.append("check_in_description", checkdescrtion);
    formData.append("check_in_method", selectedMethod);
    formData.append(
      "check_out_instruction",
      JSON.stringify(checkoutInstructions)
    );
    formData.append("discount_offer", item?.discount);

    images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    const response =
      main.propertyedit(slug, formData)
    response
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
           fetchProperty(slug);
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        ("error", error);
      });
  }


  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <div className="flex justify-center">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                <Property
                  fetchProperties={() => fetchProperty(slug)}
                  isEdit={true}
                  stepdata={false}
                  p={record.data}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


