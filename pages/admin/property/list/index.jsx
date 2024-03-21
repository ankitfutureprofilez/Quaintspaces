import React, { useEffect,useState } from "react";
import Element from "../../element";
import Layout from "../../layout";
import Listing  from "../../api/Listing"

export default function index() {

  const[record,setRecord] =useState();
  useEffect(()=>{
    const main  = new Listing();
    const response = main.Adminproperty().then((res)=>{
      console.log("res",res)
      setRecord(res?.data?.data)
    }).catch((error)=>{
      console.log("erorr0",error)
    })

  },[])

  return (
    <>
    <Layout>
        <Element />
        <div>
          <div className="tip-top-sec" id="places">
            {record.map((item, index) => (
              <ul className="flex flex-wrap" key={index}>
                <li className="w-full sm:w-3/6 md:w-2/6 px-3">
                  <div className="banipark-box">
                    {item.property_image.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        loading="lazy"
                        width="100"
                        height="300"
                        decoding="async"
                        data-nimg="1"
                        sizes="100vw"
                        srcSet={img.image_url}
                        src={img.image_url}
                        style={{
                          color: "transparent",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    ))}
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
                      <a
                        className="block"
                        href={`/listings/${item.id}`}
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
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
