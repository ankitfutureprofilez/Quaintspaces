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

  const CheckinCheckout = () => {
    const [checkinStart, setCheckinStart] = useState('3:00 pm');
    const [checkinEnd, setCheckinEnd] = useState('5:00 pm');
    const [checkout, setCheckout] = useState('12:00 am');
  
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Check-in & checkout times</h2>
        
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Check-in window</label>
          <div className="flex flex-col">
            <div className="relative">
              <label className="absolute top-1 left-1 text-xs text-gray-500">Start time</label>
              <select 
                value={checkinStart} 
                onChange={(e) => setCheckinStart(e.target.value)} 
                className="block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
              >
                <option>3:00 pm</option>
                <option>4:00 pm</option>
                <option>5:00 pm</option>
              </select>
            </div>
            <div className="relative">
              <label className="absolute top-1 left-1 text-xs text-gray-500">End time</label>
              <select 
                value={checkinEnd} 
                onChange={(e) => setCheckinEnd(e.target.value)} 
                className="block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option>4:00 pm</option>
                <option>5:00 pm</option>
                <option>6:00 pm</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-semibold">Checkout time</label>
          <select 
            value={checkout} 
            onChange={(e) => setCheckout(e.target.value)} 
            className="mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>12:00 am</option>
            <option>1:00 am</option>
            <option>2:00 am</option>
          </select>
        </div>
      </div>
    );
  };

  const ButtonGroup = () => {

  const [selectedOption, setSelectedOption] = useState('list'); 

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
              checked={selectedOption === 'list'}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span>List Property</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="unlist"
              checked={selectedOption === 'unlist'}
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

  return (
    <>
    <CheckinCheckout/>
      <ButtonGroup />
      <PriceManageForm />
    </>
  );
}
