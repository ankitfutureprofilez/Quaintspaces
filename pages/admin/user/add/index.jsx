import React, { useState, useEffect } from "react";
import AdminLayout from "../../AdminLayout";
import Element from "../../element"
import toast, { Toaster } from 'react-hot-toast';
import Listing from "../../app/laravel/Listing";

export default function Index() {

  const [record, setRecord] = useState({
    email: "",
    phone_no: "",
    name: "",
    image_url: "",
    password:"",
    confirm_password :"",

  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [previewImgSrc, setPreviewImgSrc] = useState(
    "https://w7.pngwing.com/pngs/812/572/png-transparent-computer-icons-user-name-heroes-monochrome-black-thumbnail.png"
  );
  const loadFile = (event) => {
    const file = event.target.files[0];
    const output = document.getElementById("preview_img");
    setRecord((prevData) => ({
      ...prevData,
      image_url: file,
    }));
  };
  console.log("record",record)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const main = new Listing();
      const formdata = new FormData();
      formdata.append("name", record.name);
      formdata.append("phone_no", record.phone_no);
      formdata.append("email", record.email);
      formdata.append("password", record.password);
      formdata.append("confirm_password", record.confirm_password);
      formdata.append("image", record.image_url); 
      const response = await main.userAdd(formdata); 
      if (response && response.data && response.data.status) {
        toast.success(response.data.message);
        setRecord({
          email: "",
          phone_no: "",
          image: "", 
          name: "",
          password: "",
          confirm_password: ""
        });
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
      toast.error(error?.response?.data);
    }
  };
  

  return (
    <div>
      
      <AdminLayout>
        <Element text={"User Add"}/>
        <div className="container mx-auto mt-5">
        {/* Image Upload */}
        <div className="flex items-center ">
          <div className="relative">
            <div className="shrink-0">
              <img id='preview_img' className="h-16 w-16 object-cover rounded-full" src={previewImgSrc} alt="Current profile photo" />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" onChange={loadFile} className="hidden" />
              {/* SVG Icon */}
              <div className='absolute top-0 right-0 p-1 bg-orange-300 rounded-full'>
                <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

            </label>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-5 perso-form'>
        <div className='w-full md:w-9/12 '>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
  <div className="mb-2 sm:mb-4 col-span-2">
    <label htmlFor="name" className="block text-lg font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={record.name}
      onChange={handleChange}
      className="mt-1 p-4 border rounded-full w-full"
      required
    />
  </div>
  <div className="mb-2 sm:mb-4">
    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={record.email}
      onChange={handleChange}
      className="mt-1 p-4 border rounded-full w-full"
      required
    />
  </div>
  <div className="mb-2 sm:mb-4">
    <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
      Phone
    </label>
    <input
      type="tel"
      id="phone"
      name="phone_no"
      maxLength="10"
      value={record.phone_no}
      onChange={handleChange}
      className="mt-1 p-4 border rounded-full w-full"
      required
    />
  </div>
  <div className="mb-2 sm:mb-4">
    <label htmlFor="password" className="block text-lg font-medium text-gray-700">
      Password
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={record.password}
      onChange={handleChange}
      className="mt-1 p-4 border rounded-full w-full"
      required
    />
  </div>
  <div className="mb-2 sm:mb-4">
    <label htmlFor="confirm_password" className="block text-lg font-medium text-gray-700">
      Confirm Password
    </label>
    <input
      type="password"
      id="confirm_password"
      name="confirm_password"
      value={record.confirm_password}
      onChange={handleChange}
      className="mt-1 p-4 border rounded-full w-full"
      required
    />
  </div>
</form>


             <button  className={"font-inter font-lg leading-tight text-center text-black-400 w-full sm:w-96 bg-indigo-500 p-4 rounded-full mt-14"} >
              Submit
              </button>
        </div>
        <div className="border-bottom-form"></div>
      </div>
      </AdminLayout>
    </div>
  );
}
