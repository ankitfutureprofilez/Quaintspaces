import React, { useEffect,useState } from "react";
import Element from "../element";
import Layout from "../layout";
import Listing  from "../api/Listing"
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';

export default function index() {
    const router = useRouter();
    const { slug } = router.query;
    console
    useEffect(()=>{
        const main = new Listing();
        const response =  main.Adminpropertydetails(slug || "");
        response.then((res)=>{
            console.log("res",res)
        }).catch((error)=>{
            console.log("eroirr",error)
        })
    },[])

    console.log("slug",slug)
    // const deleteImage = (uuid) => {
    //   const main = new Listing();
    //   main.propertydelete(uuid)
    //       .then((response) => {
    //           console.log("response", response.data.message);
    //           toast.success(response.data.message)
    //       })
    //       .catch((error) => {
    //           console.log("error", error);
    //       });
    // };

    // useEffect(() => {
    //   deleteImage();
    // }, []);


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
