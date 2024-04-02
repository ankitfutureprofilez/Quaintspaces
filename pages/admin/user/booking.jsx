import react,  { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";

export default function booking({record}) {

    const[content ,setContent] =useState("")
  useEffect(()=>{
    const main =  new Listing();
    const response = main.booking(record)
    response.then((res)=>{
      console.log("res",res)
      setContent(res?.data?.data)
    }).catch((error)=>{
      console.log("error",error)
    })
  },[record])

  return (
    <div>
         <table className="w-full  text-sm rounded-md">
            <thead>
              <tr className="bg-gray-100 rounded-lg flex items-center justify-between text-gray-500">
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                      d="M9.01 20.5l-5.02-5.01M9.01 3.5v17M14.99 3.5l5.02 5.01M14.99 20.5v-17"
                    ></path>
                  </svg>
                </th>
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  Phone Number
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                      d="M9.01 20.5l-5.02-5.01M9.01 3.5v17M14.99 3.5l5.02 5.01M14.99 20.5v-17"
                    ></path>
                  </svg>
                </th>
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                Status
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                      d="M9.01 20.5l-5.02-5.01M9.01 3.5v17M14.99 3.5l5.02 5.01M14.99 20.5v-17"
                    ></path>
                  </svg>
                </th>
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                      d="M9.01 20.5l-5.02-5.01M9.01 3.5v17M14.99 3.5l5.02 5.01M14.99 20.5v-17"
                    ></path>
                  </svg>
                </th>
              </tr>
            </thead>

            <tbody className="space-y-2 divide-y">
                <tr
                  className="hover:bg-gray-100 flex items-center justify-between duration-150 text-gray-700"
                >
                  <td className="flex gap-2 items-center w-[300px] text-sm py-2 px-2">
                  <Image
                  width={30}
                  height={30}
                  className="rounded-full border border-2 "
                  src={ "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"}
                   alt={"0"}
                  />
                    <div>
                      <div className="text-gray-800 font-medium">
                        {/* {item.name} */}
                      </div>
                      <div className="text-sm">
                        {/* {item.email} */}
                        </div>
                    </div>
                  </td>
                  <td className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                    {/* {item.phone_no ? item.phone_no : ""} */}
                  </td>
                  <td className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  
                  </td>


                  <td className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                    <div  classname=" ">
                      <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 24 24"
                        id="three-dots"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="_20x20_three-dots--grey"
                          data-name="20x20/three-dots--grey"
                          transform="translate(24) rotate(90)"
                        >
                          <rect
                            id="Rectangle"
                            width="24"
                            height="24"
                            fill="none"
                          />
                          <circle
                            id="Oval"
                            cx="1"
                            cy="1"
                            r="1"
                            transform="translate(5 11)"
                            stroke="#000000"
                            stroke-miterlimit="10"
                            stroke-width="0.5"
                          />
                          <circle
                            id="Oval-2"
                            data-name="Oval"
                            cx="1"
                            cy="1"
                            r="1"
                            transform="translate(11 11)"
                            stroke="#000000"
                            stroke-miterlimit="10"
                            stroke-width="0.5"
                          />
                          <circle
                            id="Oval-3"
                            data-name="Oval"
                            cx="1"
                            cy="1"
                            r="1"
                            transform="translate(17 11)"
                            stroke="#000000"
                            stroke-miterlimit="10"
                            stroke-width="0.5"
                          />
                        </g>
                      </svg>
                    </div>
                  </td>
                </tr>
            </tbody>
          </table>
    </div>
  )
}
