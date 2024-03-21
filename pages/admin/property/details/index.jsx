import React, { useEffect,useState } from "react";
import Element from "../../element";
import Layout from "../../layout";
import Listing  from "../../api/Listing"
import { useRouter } from "next/router";

export default function index() {
    const router = useRouter();
    const { slug } = router.query;
   
  console.log("slug",slug)

useEffect(()=>{
    const main = new Listing();
    const response =  main.Adminpropertydetails(slug);
    response.then((res)=>{
        console.log("res",res)
    }).catch((error)=>{
        console.log("eroirr",erorr)
    })
},[])
  
 const deleteImage = (uuid) => {
  const main = new Listing();
  main.propertydelete(uuid)
      .then((response) => {
          console.log("response", response.data.message);
          toast.success(response.data.message)
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
       <h1>hello
        </h1>

      </Layout>
    </>
  );
}
