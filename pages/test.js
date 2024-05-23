import React, { useState } from "react";

export default function test() {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const [propertyDuplicated, setpropertyDuplicated] = useState(false);
  const [item, setItem] = useState({
    cleaning: "",
    pet:"",
    guest:"",
  });

  return (
    <>
    <div className="mt-32 flex flex-col items-center space-y-12">
      <h1 className="mb-8 capitalize font-bold text-2xl">
        {" "}
        Please select an option
      </h1>
      {!propertyDuplicated ? (
        <>
          <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
            Add New Property
          </button>
          <button 
          onClick={()=>{setpropertyDuplicated(true);}}
          className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
            Duplicate Existing Property
          </button>
        </>
      ) : (
        <>
          <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
            Edit Entire Propertty
          </button>
          <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
            Only edit Image
          </button>
        </>
      )}
    </div>
    {/* Form Code Starts */}
    <div className={`max-w-[100%] m-auto table w-full mt-10`}>
              <h2 className="text-3xl text-center font-bold mb-8 capitalize">Please enter the following details?</h2>
              <div className="flex flex-col mt-4 text-sm font-medium text-gray-700">
                <label>Cleaning Fees</label>
                <input
                  required
                  type="number"
                  name="cleaning" placeholder="Cleaning Fees Per Day"
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
                  name="pet" placeholder="Pet Fees"
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
                  name="guest" placeholder="Extra Guest Fees"
                  id="guest"
                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-3/5"
                  value={item?.guest}
                  onChange={handleInputChange}
                />
              </div>
            </div>
    </>
  );
}
