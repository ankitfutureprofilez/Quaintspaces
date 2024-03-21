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



 const deleteImage = (uuid) => {
  const main = new Listing();
  main.propertydelete(uuid)
      .then((response) => {
          console.log("response", response.data.message);
      })
      .catch((error) => {
          console.log("error", error);
      });
};

useEffect(() => {
  deleteImage();
}, []);

  console.log("record",record)

  return (
    <>
    <Layout>
        <Element />
        <div >
  <div className="flex flex-wrap mt-5 px-4 py-5">
    {record && record.map((item, index) => (
      <ul className="w-full sm:w-1/2 md:w-1/3 px-3" key={index}>
        <li>
          <div className="banipark-box">
          <div style={{ position: 'relative', display: 'inline-block' }}>
  <button className="delete-button bg-red" onClick={() => deleteImage(item.uuid)} style={{ position: 'absolute', top: '6', right: '0'  }} >
    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <img
    loading="lazy"
    width="100"
    height="300"
    decoding="async"
    data-nimg="1"
    srcSet={item.property_image[0].image_url}
    src={item.property_image[0].image_url}
    style={{
      color: "transparent",
      width: "100% !important",
      height: "auto",
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
              <a
                className="block"
                href={`/admin/property/list/${item.uuid}`}
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
