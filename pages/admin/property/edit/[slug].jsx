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
              <button className="absolute top-0 right-0"
              onClick={()=>{router.push("/admin/property")}}
              >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
              </button>
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


