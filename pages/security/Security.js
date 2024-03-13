import React, { useState } from 'react'
import Heading from '../elements/Heading'
import Button from '../elements/Button'



export default function Security() {

    const [formData, setFormData] = useState({
        new_password: "",
        confirm_password: "",
        cuurent_Password:'',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setFormData({
            new_password: "",
            confirm_password: "",
            cuurent_Password:'',
        });
      };

  return (
    <div>
        <div className="container mx-auto">
            <Heading text={"Security "}/>
            </div>

            <div className="container mx-auto">
            <div className="ml-3">
                    <h1 className="text-lg ">
                    Update Password
                        </h1>
                    <p>
                    Increase the security of your account by updating password etc. 
                       </p>
                </div>


                <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 "
          >
            First Name
          </label>
          <input
            type="password"
            id="email"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            className="mt-1 p-4 border rounded-full w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="password"
            id="email"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            className="mt-1 p-4 border rounded-full w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="password"
            id="email"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="mt-1 p-4 border rounded-full w-full"
            required
          />
        </div>

      <Button text={"Update Details"} className={"font-inter font-lg leading-tight text-center text-black-400 w-96 bg-orange-300  border-2 p-4 rounded-full"}/>
        
      </form>


            </div>
    </div>
  )
}
