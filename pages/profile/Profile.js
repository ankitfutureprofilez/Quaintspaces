import React, { useState } from 'react'
import Heading from '../elements/Heading'
import Image from "next/image";
import Button from '../elements/Button';


export default function Profile() {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        first: '',
        last: ""
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
            email: "",
            phone: "", 
            first: "",
            last: "",
        });
    };
    // Image Uploader
    const [previewImgSrc, setPreviewImgSrc] = useState('https://w7.pngwing.com/pngs/812/572/png-transparent-computer-icons-user-name-heroes-monochrome-black-thumbnail.png');

  const loadFile = (event) => {
    const file = event.target.files[0];
    const output = document.getElementById('preview_img');

    output.src = URL.createObjectURL(file);
    output.onload = () => {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
    return (
        <>
            <div className='container mx-auto '>
            <div className="py-12">
                <Heading text={"My Profile"} />
            </div>
            <div className="container mx-auto mt-5">
                {/* Image Upload */}
                <div className="flex items-center space-x-6">
        <div className="shrink-0">
          <img id='preview_img' className="h-16 w-16 object-cover rounded-full" src={previewImgSrc} alt="Current profile photo" />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input type="file" onChange={loadFile} className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
          />
        </label>
      </div>
                {/* <Image className='img-fuild' alt="nit" />
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg> */}

                <div className="ml-7 profile-text">
                    <h1 >Edit Profile</h1>
                    <p>Update your profile here</p>
                </div>
                </div>
                <div className='border-b-2 border-soild border-zinc-300 '> </div>

            </div>
            <div className='container mx-auto'>
                <div className="mb-24 mt-12">
                <div className="mb-10">
                    <h1 className="text-lg ">Personal Information</h1>
                    <p>Update your personal information here </p>
                </div>
                <div className='w-full md:w-9/12 '>
                    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-700 "
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="first"
                                value={formData.first}
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
                                type="text"
                                id="email"
                                name="last"
                                value={formData.last}
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
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-4 border rounded-full w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                maxlength="10"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 p-4 border rounded-full w-full"
                                required
                            />
                        </div>
                        
                        <Button text={"Update Details"} design={"font-inter font-lg leading-tight update-btn text-center text-black-400 w-96 bg-orange-300  border-0 p-4 rounded-full mt-24"} />
                    </form>
                </div>
                <div className='border-b-2 border-soild border-zinc-300  -mt-28'> </div>
                </div>
            </div>
        </>
    )
}
