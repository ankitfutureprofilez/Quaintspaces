import React, { useState } from "react";

export default function test() {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const [item, setItem] = useState({
    cleaning: "",
    pet: "",
    guest: "",
  });

  const [propertyDuplicated, setpropertyDuplicated] = useState(false);

  const StayPolicySelector = () => {
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    const handlePolicyChange = (policy) => {
      setSelectedPolicy(policy);
    };

    return (
      <div className="p-4 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">
          Choose your long-term stay policy
        </h2>
        <p className="text-gray-500 mb-4">
          To understand the full policies, visit the{" "}
          <span className="underline font-semibold cursor-pointer">Help Centre.</span>
        </p>
        <div className="flex space-x-2">
          <div
            className={`flex justify-center mb-4 p-4 items-center border-2 w-1/2 cursor-pointer ${
              selectedPolicy === "Flexible" ? "border-black" : "border-gray-200"
            }`}
            onClick={() => handlePolicyChange("Flexible")}
          >
            <div className="flex flex-col">
              <label className="flex items-center cursor-pointer mx-auto text-center">
                Flexible
              </label>
              <p className="text-gray-500">
                First 30 days are non-refundable. Full refund up to 30 days
                before check-in.
              </p>
            </div>
            <input
              type="radio"
              name="stayPolicy"
              value="flexible"
              checked={selectedPolicy === "Flexible"}
              onChange={() => handlePolicyChange("Flexible")}
              className="ml-2 w-4 h-4 cursor-pointer"
            />
          </div>
          <div
            className={`flex justify-center p-4 mb-4 items-center border-2 w-1/2 cursor-pointer ${
              selectedPolicy === "Strict" ? "border-black" : "border-gray-200"
            }`}
            onClick={() => handlePolicyChange("Strict")}
          >
            <div className="flex flex-col">
              <label className="flex items-center cursor-pointer mx-auto text-center">
                Strict
              </label>
              <p className="text-gray-500 ml-4">
                Full refund if canceled within 48 hours of booking and at least
                28 days before check-in. After that, the first 30 days of the
                stay are non-refundable.
              </p>
            </div>
            <input
              type="radio"
              name="stayPolicy"
              value="strict"
              checked={selectedPolicy === "Strict"}
              onChange={() => handlePolicyChange("Strict")}
              className="mr-2 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  };

  const CheckinCheckout = () => {
    const [checkinStart, setCheckinStart] = useState("flexible");
    const [checkinEnd, setCheckinEnd] = useState("flexible");
    const [checkout, setCheckout] = useState("12:00");

    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Check-in & checkout times</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Check-in window</label>
          <div className="flex flex-col">
            <div className="relative">
              <label className="absolute top-1 left-1 text-xs text-gray-500">
                Start time
              </label>
              <select
                value={checkinStart}
                onChange={(e) => setCheckinStart(e.target.value)}
                className="block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
              >
                <option value="flexible">Flexible</option>
                <option value="00:00">12:00 AM</option>
                <option value="01:00">1:00 AM</option>
                <option value="02:00">2:00 AM</option>
                <option value="03:00">3:00 AM</option>
                <option value="04:00">4:00 AM</option>
                <option value="05:00">5:00 AM</option>
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
              </select>
            </div>
            <div className="relative">
              <label className="absolute top-1 left-1 text-xs text-gray-500">
                End time
              </label>
              <select
                value={checkinEnd}
                onChange={(e) => setCheckinEnd(e.target.value)}
                className="block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
              >
                <option value="flexible">Flexible</option>
                <option value="00:00">12:00 AM</option>
                <option value="01:00">1:00 AM</option>
                <option value="02:00">2:00 AM</option>
                <option value="03:00">3:00 AM</option>
                <option value="04:00">4:00 AM</option>
                <option value="05:00">5:00 AM</option>
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Checkout time</label>
          <select
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
          >
            <option value="00:00">12:00 AM</option>
            <option value="01:00">1:00 AM</option>
            <option value="02:00">2:00 AM</option>
            <option value="03:00">3:00 AM</option>
            <option value="04:00">4:00 AM</option>
            <option value="05:00">5:00 AM</option>
            <option value="06:00">6:00 AM</option>
            <option value="07:00">7:00 AM</option>
            <option value="08:00">8:00 AM</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
            <option value="22:00">10:00 PM</option>
            <option value="23:00">11:00 PM</option>
          </select>
        </div>
      </div>
    );
  };

  const ButtonGroup = () => {
    const [selectedOption, setSelectedOption] = useState("list");

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };

    return (
      <div className="mt-32 flex flex-col items-center space-y-12">
        <h1 className="mb-8 capitalize font-bold text-2xl">
          Please select an option
        </h1>

        <div className="flex items-center space-x-4 mb-8">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="list"
              checked={selectedOption === "list"}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span>List Property</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="unlist"
              checked={selectedOption === "unlist"}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span>Unlist Property</span>
          </label>
        </div>

        {!propertyDuplicated ? (
          <>
            <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
              Add New Property
            </button>
            <button
              onClick={() => {
                setpropertyDuplicated(true);
              }}
              className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize"
            >
              Duplicate Existing Property
            </button>
          </>
        ) : (
          <>
            <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
              Edit Entire Property
            </button>
            <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
              Only Edit Image
            </button>
          </>
        )}
      </div>
    );
  };

  const PriceManageForm = () => (
    <div className={`max-w-[100%] m-auto table w-full mt-10`}>
      <h2 className="text-3xl text-center font-bold mb-8 capitalize">
        Please enter the following details?
      </h2>
      <div className="flex flex-col mt-4 text-sm font-medium text-gray-700">
        <label>Cleaning Fees</label>
        <input
          required
          type="number"
          name="cleaning"
          placeholder="Cleaning Fees Per Day"
          id="cleaning"
          className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-3/5"
          value={item?.cleaning}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col relative mt-4 text-sm font-medium text-gray-700">
        <label>Pet Fees</label>
        <input
          type="number"
          name="pet"
          placeholder="Pet Fees"
          id="pet"
          className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-3/5"
          value={item?.pet}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col relative mt-4 text-sm font-medium text-gray-700">
        <label>Extra Guest Fees (Per Guest)</label>
        <input
          required
          type="number"
          name="guest"
          placeholder="Extra Guest Fees"
          id="guest"
          className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-3/5"
          value={item?.guest}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  const DirectionManualWifiComponent = () => {
    const [direction, setDirection] = useState('');
    const [manual, setManual] = useState('');
    const [wifi, setWifi] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');

  
    const handleDirectionChange = (event) => {
      setDirection(event.target.value);
    };
    const handleManualChange = (event) => {
      setManual(event.target.value);
    };
    const handleWifiChange = (event) => {
      setWifi(event.target.value);
    };
    const handlewifiPasswordChange = (event) => {
      setWifiPassword(event.target.value);
    };
  
    return (
      <>
      <div className="flex flex-col items-center p-4">
        <label htmlFor="directions" className="block font-medium text-gray-700">
          Directions
        </label>
        <textarea
          id="directions"
          name="directions"
          rows={5}
          className="shadow-sm p-4 w-4/5 mt-1 block w-full sm:text-sm border rounded-xl"
          placeholder="Enter directions here..."
          value={direction}
          onChange={handleDirectionChange}
        />
      </div>
      <div className="flex flex-col items-center p-4">
      <label htmlFor="directions" className="block font-medium text-gray-700">
        House Manual
      </label>
      <textarea
        id="manual"
        name="manual"
        rows={5}
        className="shadow-sm p-4 w-4/5 mt-1 block sm:text-sm border rounded-xl"
        placeholder="Enter some instructions for your guest..."
        value={manual}
        onChange={handleManualChange}
      />
    </div>
    <div className="flex flex-col items-center p-4">
      <h1 className="capitalize text-lg font-bold my-8">Please enter your wifi details</h1>
      <label htmlFor="directions" className="block font-medium text-gray-700 my-2">
       Wifi Name
      </label>
      <input
        id="wifi"
        name="wifi"
        type="text"
        className="shadow-sm p-4 w-4/5 mt-1 block sm:text-sm border rounded-xl"
        placeholder="Enter your wifi name..."
        value={wifi}
        onChange={handleWifiChange}
      />
      <label htmlFor="directions" className="block font-medium text-gray-700 my-2">
        Wifi Password
      </label>
      <input
        id="wifiPassword"
        name="wifiPassword"
        type="password"
        className="shadow-sm p-4 w-4/5 mt-1 block sm:text-sm border rounded-xl"
        placeholder="Enter your wifi Password here..."
        value={wifiPassword}
        onChange={handlewifiPasswordChange}
      />
    </div>
    </>
    );
  };

  return (
    <>
      <CheckinCheckout />
      <ButtonGroup />
      <StayPolicySelector />
      <PriceManageForm />
      <DirectionManualWifiComponent/>
    </>
  );
}
