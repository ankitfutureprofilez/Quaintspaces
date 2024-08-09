import React from "react";
import { PiHairDryerBold, PiFireExtinguisherThin, PiPicnicTableThin, } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { MdBeachAccess } from "react-icons/md";
import { TbBrandCarbon } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaBath } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { LiaToriiGateSolid } from "react-icons/lia";

import {
  MdOutlineLocalParking,
  MdOutlineFireplace,
  MdPool,
  MdOutdoorGrill,
} from "react-icons/md";
import { MdOutlineScreenshotMonitor } from "react-icons/md";

import { RiFirstAidKitFill } from "react-icons/ri";
import { BiChair } from "react-icons/bi";
import { FaParking } from "react-icons/fa";
import {
  FaWifi,
  FaArrowUpFromWaterPump,
  FaFireBurner,
  FaHotTubPerson,
} from "react-icons/fa6";
import { BiSolidAlarmExclamation } from "react-icons/bi";
import { FaPersonSkiingNordic } from "react-icons/fa6";
import { GiPoolTableCorner, GiKitchenKnives } from "react-icons/gi";
import { VscPiano } from "react-icons/vsc";
import { PiTelevision, PiWashingMachine } from "react-icons/pi";
import { CgGames } from "react-icons/cg";
const amenitiesData = {
  amenities: [
    {
      value: "wifi",
      title: "Wifi",
      icons: <FaWifi style={{ color: "#222222", fontSize: "30px" }} />
    },
    {
      value: "tv",
      title: "TV",
      icons: <PiTelevision style={{ color: "#222222", fontSize: "30px" }} />
    },
    {
      value: "kitchen",
      title: "Kitchen",
      icons: <GiKitchenKnives style={{ color: "#222222", fontSize: "30px" }} />
    },
    {
      value: "washing_machine",
      title: "Washing machine",
      icons: <PiWashingMachine style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "free_parking_on_premises",
      title: "Free parking ",
      icons: <FaParking style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "paid_parking_on_premises",
      title: "Paid parking ",
      icons: <MdOutlineLocalParking style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "air_conditioning",
      title: "Air conditioning",
      icons: <TbAirConditioning style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "dedicated_workspace",
      title: "Dedicated workspace",
      icons: <BsPersonWorkspace style={{ color: "#222222", fontSize: "30px" }} />,
    },
  ],
  standout_amenity: [
    { value: "pool", title: "Pool", icons: <MdPool style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "hot_tub", title: "Hot tub", icons: <FaHotTubPerson style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "patio", title: "Patio", icons: <BiChair style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "bbq_grill", title: "BBQ grill", icons: <MdOutdoorGrill style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "outdoor_dining_area",
      title: "Outdoor dining area",
      icons: <PiPicnicTableThin style={{ color: "#222222", fontSize: "30px" }} />,
    },
    { value: "firepit", title: "Firepit", icons: <FaFireBurner style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "pool_table", title: "Pool table", icons: <GiPoolTableCorner style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "indoor_fireplace",
      title: "Indoor fireplace",
      icons: <MdOutlineFireplace style={{ color: "#222222", fontSize: "30px" }} />,
    },
    { value: "piano", title: "Piano", icons: <VscPiano style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "exercise_equipment",
      title: "Exercise equipment",
      icons: <CgGym style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "lake_access",
      title: "Lake access",
      icons: <FaArrowUpFromWaterPump style={{ color: "#222222", fontSize: "30px" }} />,
    },
    { value: "beach_access", title: "Beach access", icons: <MdBeachAccess style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "ski_in_out", title: "Ski-in/out", icons: <FaPersonSkiingNordic style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "hair_dryer", title: "Hair dryer", icons: <PiHairDryerBold style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "outdoor_shower", title: "Outdoor shower", icons: <FaShower style={{ color: "#222222", fontSize: "30px" }} /> },
  ],

  safety_amenity: [
    { value: "smoke_alarm", title: "Smoke alarm", icons: <BiSolidAlarmExclamation style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "first_aid_kit",
      title: "First aid kit",
      icons: <RiFirstAidKitFill style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "fire_extinguisher",
      title: "Fire extinguisher",
      icons: <PiFireExtinguisherThin style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "carbon_monoxide_alarm",
      title: "Carbon monoxide alarm",
      icons: <TbBrandCarbon style={{ color: "#222222", fontSize: "30px" }} />,
    },
  ],
  // normal_aminieties: [
  //   {
  //     value: "air_conditioning",
  //     title: "Air Conditioning",
  //     icons: <TbAirConditioning  style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "arcade_games",
  //     title: "Arcade Games",
  //     icons: <CgGames  style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "baby_bath",
  //     title: "Baby Bath",
  //     icons:<FaBath  style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "baby_monitor",
  //     title: "Baby Monitor",
  //     icons:<MdOutlineScreenshotMonitor style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "baby_safety_gates",
  //     title: "Baby Safety Gates",
  //     icons:<LiaToriiGateSolid style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "babysitter_recommendations",
  //     title: "Babysitter Recommendations",
  //     icons:<RiUserStarFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "baking_sheet",
  //     title: "Baking Sheet",
  //     icons:<RiCake2Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "barbecue_utensils",
  //     title: "Barbecue Utensils",
  //     icons:<RiBarChartHorizontalFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "bath",
  //     title: "Bath",
  //     icons:<RiBathtubFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "batting_cage",
  //     title: "Batting Cage",
  //     icons:<RiBaseballFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "bbq_grill",
  //     title: "BBQ Grill",
  //     icons:<RiBbqFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "beach_access",
  //     title: "Beach Access",
  //     icons:<RiBeachFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "beach_essentials",
  //     title: "Beach Essentials",
  //     icons:<RiSunscreenFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "bed_linen",
  //     title: "Bed Linen",
  //     icons:<RiHotelBedFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "bidet",
  //     title: "Bidet",
  //     icons:<RiShowerHeadFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "bikes",
  //     title: "Bikes",
  //     icons:<RiBicycleFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "blender",
  //     title: "Blender",
  //     icons:<RiBlenderFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "board_games",
  //     title: "Board Games",
  //     icons:<RiGamepadLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "boat_berth",
  //     title: "Boat Berth",
  //     icons:<RiAnchorFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "body_soap",
  //     title: "Body Soap",
  //     icons:<RiSoapFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "books_and_reading_material",
  //     title: "Books and Reading Material",
  //     icons:<RiBookOpenFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "bowling_alley",
  //     title: "Bowling Alley",
  //     icons:<RiBowlingBallFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "bread_maker",
  //     title: "Bread Maker",
  //     icons:<RiBreadFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "breakfast",
  //     title: "Breakfast",
  //     icons:<RiRestaurantFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "carbon_monoxide_alarm",
  //     title: "Carbon Monoxide Alarm",
  //     icons:<RiAlarmWarningFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "ceiling_fan",
  //     title: "Ceiling Fan",
  //     icons:<RiFanFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "changing_table",
  //     title: "Changing Table",
  //     icons:<RiTableFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "childrens_bikes",
  //     title: "Children’s Bikes",
  //     icons:<RiBikeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "childrens_books_and_toys",
  //     title: "Children’s Books and Toys",
  //     icons:<RiBookReadFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "childrens_playroom",
  //     title: "Children’s Playroom",
  //     icons:<RiPlaystationFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "childrens_tableware",
  //     title: "Children’s Tableware",
  //     icons:<RiRestaurantLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "cinema",
  //     title: "Cinema",
  //     icons:<RiMovie2Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "cleaning_available_during_stay",
  //     title: "Cleaning Available During Stay",
  //     icons:<RiCleanFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "cleaning_products",
  //     title: "Cleaning Products",
  //     icons:<RiBrushFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "climbing_wall",
  //     title: "Climbing Wall",
  //     icons:<RiWallFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "clothes_drying_rack",
  //     title: "Clothes Drying Rack",
  //     icons:<RiHangerFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "clothes_storage",
  //     title: "Clothes Storage",
  //     icons:<RiWardrobeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "coffee",
  //     title: "Coffee",
  //     icons:<RiCoffeeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "coffee_maker",
  //     title: "Coffee Maker",
  //     icons:<RiCoffeeMakerFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "conditioner",
  //     title: "Conditioner",
  //     icons:<RiShampooFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "cooker",
  //     title: "Cooker",
  //     icons:<RiCookerFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "cooking_basics",
  //     title: "Cooking Basics",
  //     icons:<RiKnifeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "cot",
  //     title: "Cot",
  //     icons:<RiCribFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "dedicated_workspace",
  //     title: "Dedicated Workspace",
  //     icons:<RiComputerFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "dining_table",
  //     title: "Dining Table",
  //     icons:<RiTableLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "dishes_and_cutlery",
  //     title: "Dishes and Cutlery",
  //     icons:<RiDishLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "dishwasher",
  //     title: "Dishwasher",
  //     icons:<RiDishFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "dryer",
  //     title: "Dryer",
  //     icons:<RiTShirt2Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "essentials",
  //     title: "Essentials",
  //     icons:<RiSuitcase2Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "ethernet_connection",
  //     title: "Ethernet Connection",
  //     icons:<RiRouterFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "ev_charger",
  //     title: "EV Charger",
  //     icons:<RiChargingPileFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "exercise_equipment",
  //     title: "Exercise Equipment",
  //     icons:<RiDumbbellFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "extra_pillows_and_blankets",
  //     title: "Extra Pillows and Blankets",
  //     icons:<RiPillowFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "fire_extinguisher",
  //     title: "Fire Extinguisher",
  //     icons:<RiFireFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "firepit",
  //     title: "Firepit",
  //     icons:<RiFireLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "fireplace_guards",
  //     title: "Fireplace Guards",
  //     icons:<RiShieldStarFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "first_aid_kit",
  //     title: "First Aid Kit",
  //     icons:<RiFirstAidKitFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "free_on_street_parking",
  //     title: "Free On-Street Parking",
  //     icons:<RiParkingFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "free_parking_on_premises",
  //     title: "Free Parking on Premises",
  //     icons:<RiCarFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "freezer",
  //     title: "Freezer",
  //     icons:<RiFridgeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "fridge",
  //     title: "Fridge",
  //     icons:<RiFridgeLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "games_console",
  //     title: "Games Console",
  //     icons:<RiGamepadFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "garden",
  //     title: "Garden",
  //     icons:<RiPlantFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "gym",
  //     title: "Gym",
  //     icons:<RiRunFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "hair_dryer",
  //     title: "Hair Dryer",
  //     icons:<RiScissorsFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "hammock",
  //     title: "Hammock",
  //     icons:<RiHammockFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "hangers",
  //     title: "Hangers",
  //     icons:<RiHangerLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "heating",
  //     title: "Heating",
  //     icons:<RiTempHotFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "high_chair",
  //     title: "High Chair",
  //     icons:<RiChairLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "hot_tub",
  //     title: "Hot Tub",
  //     icons:<RiHotTubFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "hot_water",
  //     title: "Hot Water",
  //     icons:<RiTempHotLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "ice_hocvalue_rink",
  //     title: "Ice Hocvalue Rink",
  //     icons:<RiHocvalueFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "indoor_fireplace",
  //     title: "Indoor Fireplace",
  //     icons:<RiFireplaceFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "iron",
  //     title: "Iron",
  //     icons:<RiIronFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "kayak",
  //     title: "Kayak",
  //     icons:<RiSailboatFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "kettle",
  //     title: "Kettle",
  //     icons:<RiKettleFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "kitchen",
  //     title: "Kitchen",
  //     icons:<RiRestaurantFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "kitchenette",
  //     title: "Kitchenette",
  //     icons:<RiRestaurantLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "lake_access",
  //     title: "Lake Access",
  //     icons:<RiWaterFlashFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "laser_tag",
  //     title: "Laser Tag",
  //     icons:<RiLaserPointerFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "launderette_nearby",
  //     title: "Launderette Nearby",
  //     icons:<RiTShirtLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "life_size_games",
  //     title: "Life-Size Games",
  //     icons:<RiGamepadLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "lift",
  //     title: "Lift",
  //     icons:<RiArrowUpCircleFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "long_term_stays_allowed",
  //     title: "Long-Term Stays Allowed",
  //     icons:<RiCalendarLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "luggage_drop_off_allowed",
  //     title: "Luggage Drop-Off Allowed",
  //     icons:<RiSuitcaseFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "microwave",
  //     title: "Microwave",
  //     icons:<RiMicrowaveFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "mini_fridge",
  //     title: "Mini Fridge",
  //     icons:<RiFridgeMiniFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "mini_golf",
  //     title: "Mini Golf",
  //     icons:<RiGolfFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "mosquito_net",
  //     title: "Mosquito Net",
  //     icons:<RiShieldStarLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "outdoor_dining_area",
  //     title: "Outdoor Dining Area",
  //     icons:<RiTableLine style={{ color: 'black', fontSize: '40px' }} />
  //   },

  //   {
  //     value: "outdoor_furniture",
  //     title: "Outdoor Furniture",
  //     icons:<RiSeatLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "outdoor_kitchen",
  //     title: "Outdoor Kitchen",
  //     icons:<RiRestaurantFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "outdoor_playground",
  //     title: "Outdoor Playground",
  //     icons:<RiPlaygroundFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "outdoor_shower",
  //     title: "Outdoor Shower",
  //     icons: <RiShowerFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "oven",
  //     title: "Oven",
  //     icons: <RiOvenFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "paid_parking_off_premises",
  //     title: "Paid Parking Off Premises",
  //     icons: <RiParkingBoxFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "paid_parking_on_premises",
  //     title: "Paid Parking On Premises",
  //     icons: <RiCarFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "patio_or_balcony",
  //     title: "Patio or Balcony",
  //     icons:<RiHotelBedFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "piano",
  //     title: "Piano",
  //     icons:<RiPianoFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "ping_pong_table",
  //     title: "Ping Pong Table",
  //     icons:<RiPingPongFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "plug_socket_covers",
  //     title: "Plug Socket Covers",
  //     icons:<RiPlugFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "pocket_wifi",
  //     title: "Pocket WiFi",
  //     icons:<RiWifiFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "pool",
  //     title: "Pool",
  //     icons:<RiPoolFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "pool_table",
  //     title: "Pool Table",
  //     icons:<RiBilliardsFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "portable_fans",
  //     title: "Portable Fans",
  //     icons:<RiFanLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "private_entrance",
  //     title: "Private Entrance",
  //     icons:<RiDoorClosedFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "private_living_room",
  //     title: "Private Living Room",
  //     icons:<RiHome2Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "record_player",
  //     title: "Record Player",
  //     icons:<RiRecordVinylFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "resort_access",
  //     title: "Resort Access",
  //     icons:<RiHotelLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "rice_cooker",
  //     title: "Rice Cooker",
  //     icons:<RiPlantLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "room_darkening_blinds",
  //     title: "Room-Darkening Blinds",
  //     icons:<RiBlindsFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "safe",
  //     title: "Safe",
  //     icons:<RiShieldvalueholeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "sauna",
  //     title: "Sauna",
  //     icons:<RiSteamFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "shampoo",
  //     title: "Shampoo",
  //     icons:<RiShampooFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "shower_gel",
  //     title: "Shower Gel",
  //     icons:<RiShowerFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "single_level_home",
  //     title: "Single Level Home",
  //     icons:<RiHomeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "skate_ramp",
  //     title: "Skate Ramp",
  //     icons:<RiSkateboardFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "ski_in_out",
  //     title: "Ski-In/Out",
  //     icons:<RiSnowyFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "smoke_alarm",
  //     title: "Smoke Alarm",
  //     icons:<RiAlarmWarningLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "sound_system",
  //     title: "Sound System",
  //     icons:<RiSpeaker3Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "sun_loungers",
  //     title: "Sun Loungers",
  //     icons:<RiSunFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "table_corner_guards",
  //     title: "Table Corner Guards",
  //     icons:<RiShieldUserFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "theme_room",
  //     title: "Theme Room",
  //     icons:<RiHome4Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "toaster",
  //     title: "Toaster",
  //     icons:<RiToasterFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "travel_cot",
  //     title: "Travel Cot",
  //     icons:<RiSuitcase2Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "tv",
  //     title: "TV",
  //     icons:<RiTv2Fill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "washing_machine",
  //     title: "Washing Machine",
  //     icons:<RiWashingMachineFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "waste_compactor",
  //     title: "Waste Compactor",
  //     icons:<RiRecycleFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "waterfront",
  //     title: "Waterfront",
  //     icons:<RiWaterFlashFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "wifi",
  //     title: "WiFi",
  //     icons:<RiWifiLine style={{ color: 'black', fontSize: '40px' }} />
  //   },
  //   {
  //     value: "wine_cooler",
  //     title: "Wine Cooler",
  //     icons:<RiFridgeFill style={{ color: 'black', fontSize: '40px' }} />
  //   },
  // ]





};

export default function Amenities({ selectedAmenity, setSelectedAmenity, standoutAmenity, setstandoutAmenity, Amenity, setAmenity }) {


  const toggleSelectedAmenity = (amenityValue) => {
    const isSelected = selectedAmenity?.includes(amenityValue);
    if (isSelected) {
      setSelectedAmenity((prevSelected) =>
        prevSelected?.filter((item) => item !== amenityValue)
      );
    } else {
      setSelectedAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  const toggleAmenity = (amenityValue) => {
    const isSelected = Amenity?.includes(amenityValue);
    if (isSelected) {
      setAmenity((prevSelected) =>
        prevSelected?.filter((item) => item !== amenityValue)
      );
    } else {
      setAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  const togglestandoutAmenity = (amenityValue) => {
    const isSelected = standoutAmenity?.includes(amenityValue);
    if (isSelected) {
      setstandoutAmenity((prevSelected) =>
        prevSelected?.filter((item) => item !== amenityValue)
      );
    } else {
      setstandoutAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-[20px] md:text-[24px] capitalize lg:text-[28px] text-center mt-4 font-[500] text-[#222222] mb-4">
        Tell guests what your place has to offer
      </h2>
      <p className="text-normal text-center text-gray-500 mb-8">
        You can add more amenities after you publish your listing.
      </p>

      <p className="text-bold font-bold text-left text-gray-800 mb-3 mt-6">
        What about these guest favourites?
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4    ">

        {amenitiesData &&
          amenitiesData?.amenities?.map((amenity, i) => (
            <div key={i} className="p-1">
              <div
                onClick={() => toggleSelectedAmenity(amenity?.value)}
                className={`property-type-wrap cursor-pointer p-4 h-full hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px]  ${selectedAmenity?.includes(amenity.value) ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700 " : ""
                  }`}
              >
                {amenity?.icons}
                <h2
                  className={`text-[15px] mt-[10px] font-normal capitalize ${selectedAmenity?.includes(amenity.value)
                    ? "text-[#222222]"
                    : "text-[#222222]"
                    }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div>

      <p className="text-bold font-bold text-left text-gray-800 mb-3 mt-6">
        Do you have any standout amenities?
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4   ">
        {amenitiesData &&
          amenitiesData?.standout_amenity?.map((amenity, i) => (
            <div key={i} className="p-1">
              <div
                onClick={() => togglestandoutAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer p-4 h-full hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px] ${standoutAmenity?.includes(amenity.value) ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700" : ""
                  }`}
              >
                {amenity.icons}
                <h2
                  className={`text-[15px] mt-[10px] font-normal  capitalize ${standoutAmenity?.includes(amenity.value)
                    ? "text-[#222222]"
                    : "text-[#222222]"
                    }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div>

      <p className="text-bold font-bold text-left text-gray-800 mb-3 mt-6">
        Do you have any of these safety items?
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4    ">
        {amenitiesData &&
          amenitiesData?.safety_amenity?.map((amenity, i) => (
            <div key={i} className="p-1">
              <div
                onClick={() => toggleAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer p-4 h-full hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px]  ${Amenity?.includes(amenity.value) ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700 " : ""
                  }`}
              >
                {amenity.icons}
                <h2
                  className={`text-[15px] mt-[10px] font-normal capitalize ${Amenity?.includes(amenity.value)
                    ? "text-[#222222]"
                    : "text-[#222222]"
                    }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div>

      {/* <p className="text-bold font-bold text-left text-gray-500 mb-6 mt-6">
        Do you have any of these safety items?
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4    ">

        {amenitiesData &&
          amenitiesData?.normal_aminieties?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => toggleSelectedAmenity(amenity?.value)}
                className={`property-type-wrap cursor-pointer p-4 hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px]  ${selectedAmenity?.includes(amenity.value) ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700 " : ""
                  }`}
              >
                {amenity?.icons}
                <h2
                  className={`text-[16px] mt-[10px] font-normal capitalize ${selectedAmenity?.includes(amenity.value)
                    ? "text-[#222222]"
                    : "text-[#222222]"
                    }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
}