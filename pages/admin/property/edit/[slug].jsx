import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import Property from "../add/Property"
import { IoArrowBack } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { RiDoorLockBoxLine } from "react-icons/ri";
import { MdOutlineFreeBreakfast, MdOutlineKeyboardAlt, MdPhonelinkLock } from "react-icons/md";
import { House } from "iconsax-react";
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
      });
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
    }
  }, [record]);
  const [selectedInstruction, setSelectedInstruction] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [text, setText] = useState("");
  const [selectedMethod, setSelectedMethod] = useState();
  const [checkdescrtion, setcheckdescrtion] = useState();
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setcheckdescrtion("");
  };

  const handlecheckChange = (e) => {
    setcheckdescrtion(e.target.value);
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
  const [checkinquet, setCheckinquiet] = useState(
  );
  const [checkoutquet, setCheckoutquiet] = useState(
  );

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
  const [eventsAllowed, setEventsAllowed] = useState(
  );
  const [smokingAllowed, setSmokingAllowed] = useState(
  );
  const [quietHours, setQuietHours] = useState(
  );
  const [PhotographyAllowed, setPhotographyAllowed] = useState(
  );
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

  });

  const baseurl = "https://quant-stay.vercel.app/properties/";
  const fulllink = baseurl + item?.customLink;

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

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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


