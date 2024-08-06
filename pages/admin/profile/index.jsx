import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Listing from "../api/Listing";
import AdminLayout from "../AdminLayout";
import { Context } from "../../_app";
import Image from 'next/image';

export default function Profileindex() {
  const { auth, setAuth } = useContext(Context);
  const [Loading, setLoading] = useState(false);
  const [record, setRecord] = useState({
    email: "",
    phone: "",
    name: "",
    image: {},
  });
  const [previewImgSrc, setPreviewImgSrc] = useState("");

  const fetchData = async (signal) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.Adminprofile({ signal });
      const profiledata = response?.data?.data;

      setAuth(profiledata);
      setRecord({
        name: profiledata.name,
        phone: profiledata.phone_no,
        email: profiledata.email,
      });
      setPreviewImgSrc(profiledata.image_url);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error("Error fetching profile data:", error);
      }
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchData(signal);

    return () => {
      controller.abort(); // Clean up: abort any ongoing requests
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Listing();
    const formdata = new FormData();
    formdata.append("email", record.email || "");
    formdata.append("image", record.image || "");
    formdata.append("name", record.name || "");
    formdata.append("phone_no", record.phone || "");
    const response = main.AdminProfileUpdate(formdata);
    response
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const loadFile = (event) => {
    const file = event.target.files[0];
    setRecord((prevData) => ({
      ...prevData,
      image: file,
    }));
    setPreviewImgSrc(URL.createObjectURL(file));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => controller.abort();
  }, []);

  return (
    <>
      <AdminLayout heading={"Profile Management"}>
        {Loading ? (
          <>
            <div className="container mx-auto mt-5">
              <div className="flex items-center profile-border">
                <div className="relative mt-5">
                  <div className="shrink-0">
                    <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                  </div>
                  <label className="block">
                    <div className="sr-only">Choose profile photo</div>
                    <div className="absolute top-0 right-0 p-1 bg-gray-200 rounded-full h-6 w-6"></div>
                  </label>
                </div>
              </div>
              <div className="container mx-auto mt-5 perso-form">
                <div className="w-full">
                  <div className="grid grid-cols-1 gap-4 justify-center">
                    <div className="mb-2 sm:mb-2">
                      <div className="block text-lg font-medium text-gray-700">
                        <div className="w-24 h-5 bg-gray-200 rounded"></div>
                      </div>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 h-10 bg-gray-200"></div>
                    </div>
                    <div className="mb-2 sm:mb-2">
                      <div className="block text-lg font-medium text-gray-700">
                        <div className="w-24 h-5 bg-gray-200 rounded"></div>
                      </div>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 h-10 bg-gray-200"></div>
                    </div>
                    <div className="mb-2 sm:mb-2">
                      <div className="block text-lg font-medium text-gray-700">
                        <div className="w-24 h-5 bg-gray-200 rounded"></div>
                      </div>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 h-10 bg-gray-200"></div>
                    </div>
                  </div>
                  <div className="w-full text-white bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10 mt-4"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container mx-auto mt-5">
              <div className="flex items-center profile-border">
                <div className="relative mt-2">
                  <div className="shrink-0  ">
                    <Image
                      id="preview_img"
                      className="h-16 w-16 object-cover rounded-full"
                      src={previewImgSrc}
                      alt="Current profile photo"
                      width={64}
                      height={64}
                    />
                  </div>
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input type="file" onChange={loadFile} className="hidden" />
                    <div className="absolute top-0 right-0 p-1 bg-[#efa3a3] rounded-full">
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
              </div>
            </div>
            <div className="container mx-auto mt-2 perso-form">
              <div className="w-full  ">
                <form className="grid  grid-cols-1 gap-4 justify-center">
                  <div className="mb-2 sm:mb-2 w-full">
                    <label
                      htmlFor="name"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={record.name}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="mb-2 sm:mb-2">
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
                      value={record.email}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="mb-2 sm:mb-2">
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
                      maxLength="10"
                      value={record.phone}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                </form>
                <button
                  onClick={handleSubmit}
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {Loading ? "Updating..." : "Update Details"}
                </button>
              </div>
            </div>
          </>
        )}

      </AdminLayout>
    </>
  );
}
