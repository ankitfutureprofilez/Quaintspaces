import React, { useContext, useEffect, useState } from "react";
import Heading from "../elements/Heading";
import Button from "../elements/Button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Reorder } from "framer-motion";
import Listings from "./../api/laravel/Listings";
import { Context } from "../_app";
import Image from "next/image";
import Head from "next/head";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [ImageUploaded, setImageUploaded] = useState(false);
  const { auth, setAuth } = useContext(Context);
  const [data, setData] = useState({
    email: "",
    phone_no: "",
    first_name: "",
    last_name: "",
    image_url: "",
  });

  const [record, setRecord] = useState({
    email: "",
    phone: "",
    first: "",
    last: "",
    image: {},
  });

  const router = useRouter();

  const [previewImgSrc, setPreviewImgSrc] = useState(
    "/images/profile-no-image.jpg"
  );

  const loadFile = (event) => {
    const file = event?.target?.files[0];
    setImageUploaded(true);
    const output = document.getElementById("preview_img");
    setRecord((prevData) => ({
      ...prevData,
      image: file,
    }));

    output.src = URL.createObjectURL(file);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };

    setPreviewImgSrc(output.src);
  };

  useEffect(() => {
    const main = new Listings();
    main
      .GetUserProfile()
      .then((r) => {
        const profiledata = r?.data?.data;
        setRecord({
          first: profiledata?.first_name,
          last: profiledata?.last_name,
          phone: profiledata?.phone_no,
          image: profiledata?.image_url,
          email: profiledata?.email,
        });
        setPreviewImgSrc(
          profiledata?.image_url ||
            "/images/profile-no-image.jpg"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setRecord((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    if (record?.phone?.length != 10) {
      toast.error("Phone Number must be of 10 digits");
      return;
    }
    setLoading(true);
    const main = new Listings();
    const formdata = new FormData();
    formdata.append("email", record?.email);
    ImageUploaded === true ? formdata.append("image", record?.image) : null;
    formdata.append("first_name", record?.first);
    formdata.append("last_name", record?.last);
    formdata.append("phone_no", record?.phone);
    const response = main.UpdateUserProfile(formdata);
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res?.data?.message);
          setRecord({
            email: res?.data?.data?.email,
            phone: res?.data?.data?.phone_no,
            image: res?.data?.data?.image_url,
            first: res?.data?.data?.first_name,
            last: res?.data?.data?.last_name,
          });
          setAuth(res?.data?.data);
          setImageUploaded(false);
        } else {
          toast.error(res?.data?.message);
          setImageUploaded(false);
        }
        setLoading(false);
        setImageUploaded(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.message);
        toast.error(error?.response?.data);
        setLoading(false);
        setImageUploaded(false);
      });
  };

  // Image Uploader

  return (
    <>
      <Head>
        <title>Profile - QS Jaipur</title>
      </Head>
      <div className="container mx-auto  ">
        <div className="py-6 sm:py-12">
          <Heading text={"My Profile"} handleClick={() => router.back()} />
        </div>
      </div>
      <div className="container mx-auto mt-5">
        {/* Image Upload */}
        <div className="flex items-center profile-border">
          <div className="relative">
            <div className="shrink-0">
              <Image
                id="preview_img"
                src={previewImgSrc}
                alt="Current profile photo"
                width={64} // Set width as per your requirement
                height={64} // Set height as per your requirement
                className="h-16 border-solid border w-16 object-cover rounded-full"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" onChange={loadFile} className="hidden" />
              {/* SVG Icon */}
              <div className="absolute top-0 right-0 p-1 bg-orange-300 rounded-full">
                <svg
                  width="14px"
                  height="14px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>
          </div>

          <div className="ml-7 edit-here">
            <h2>Edit Profile</h2>
            <p>Update your profile here</p>
          </div>
          <div className="border-b-2 border-soild border-zinc-300 "> </div>
        </div>
      </div>
      <div className="container mx-auto mt-5 perso-form">

      <div className="lg:w-9/12 md:w-10/12 w-full m-auto md:p-12 sm:p-8 p-6 shadow-[0_0_17px_-6px_#ccc;] md:rounded-3xl rounded-2xl md:mt-6 mt-4">
        <div className="pers-info ">
          <h3>Personal Information</h3>
          <p>Update your personal information here </p>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
           
          >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="mb-2 sm:mb-4">
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
                value={record?.first}
                onChange={handleChange}
                className="mt-1 p-4 border rounded-full w-full"
                required
              />
            </div>

            <div className="mb-2 sm:mb-4">
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
                value={record?.last}
                onChange={handleChange}
                className="mt-1 p-4 border rounded-full w-full"
                required
              />
            </div>
            <div className="mb-2 sm:mb-4">
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
                value={record?.email}
                onChange={handleChange}
                className="mt-1 p-4 border rounded-full w-full"
                required
              />
            </div>
            <div className="mb-2 sm:mb-4">
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
                value={record?.phone}
                onChange={handleChange}
                className="mt-1 p-4 border rounded-full w-full"
                required
              />
            </div>
            </div>
            <div className="flex justify-center">
            <Button
              text={loading ? "Updating..." : "Update Details"}
              design={
                "font-inter font-lg leading-tight text-center text-[#fff] w-full sm:w-96 bg-orange-300 border-2  border-[#efa3a3] hover:bg-[#fff] hover:text-[#efa3a3]  p-4 rounded-full mt-12"
              }
            />
            </div>
          </form>
        </div>

        </div>
      </div>
    </>
  );
}
