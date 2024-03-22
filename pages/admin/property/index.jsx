import React, { useEffect, useState } from "react";
import Element from "../element";
import Layout from "../AdminLayout";
import Listing from "../api/Listing";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from 'next/image';
import AdminLayout from "../AdminLayout";

export default function index() {

  const [record, setRecord] = useState();
  useEffect(() => {
    const main = new Listing();
    const response = main
      .Adminproperty()
      .then((res) => {
        setRecord(res?.data?.data);
      })
      .catch((error) => {
        console.log("erorr0", error);
      });
  }, []);

 console.log("re",record)

  return (
      <>
      
      <AdminLayout>
        <Element />
        <div>
          <div className="flex flex-wrap mt-5 px-4 py-5">
            {record &&
              record.map((item, index) => (
                <ul className="w-full sm:w-1/2 md:w-1/3 px-3" key={index}>
                  <li>
                    <div className="banipark-box">
                      <div className="w-full"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                       
                        <img
                          loading="lazy"
                          width="100"
                          height="300"
                          decoding="async"
                          data-nimg="1"
                          srcSet={item?.property_image[0]?.image_url}
                          src={item?.property_image[0]?.image_url}
                          style={{
                            color: "transparent",
                            width: "100% !important",
                            height: "100% !important",
                          }}
                        />
                      </div>

                      <div className="flat-info">
                        <h5>{item.location}</h5>
                        <h3 className="line-limit">{item.name}</h3>
                        <p>
                          {item.bedrooms} Bedrooms · {item.beds} Bed
                        </p>
                        <h4>
                          From <span> ₹ {item.price}</span> /night
                        </h4>
                      </div>
                      <div className="explor-btn">
                        <Link
                          className="block"
                          href={`/admin/property/${item.uuid}`}
                        >
                          Explore{" "}
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.6069 1.9997L0 10.6066L1.41421 12.0208L10.0211 3.41391V10.9998H12.0208V0H1.02106L1.02106 1.9997H8.6069Z"
                              fill="#DCAC81"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
