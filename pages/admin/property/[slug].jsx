import React, { useEffect, useState } from "react";
import Element from "../element";
import Layout from "../layout";
import Listing from "../api/Listing";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid'; 
import toast, { Toaster } from 'react-hot-toast';

export default function Index() {
    const router = useRouter();
    const { slug } = router.query;

    const [record, setRecord] = useState(null);
    const [imageViewer, setImageViewer] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (slug) {
            fetchPropertyDetails(slug);
        }
    }, [slug]);

    const fetchPropertyDetails = (uuid) => {
        const main = new Listing();
        const response =  main.Adminpropertydetails(uuid);
        response.then((res)=>{
            console.log("res", res);
            setRecord(res.data.data); 
        }).catch((error)=>{
            console.log("error", error);
            toast.error("Failed to fetch property details");
        });
    }

    const handleImageClick = (index) => {
        setImageViewer(true);
        setSelectedImage(index);
    }

    return (
        <>
            <Layout>
                <Element />
          
                <div className="flex gap-2 w-full">
                    {record && record.property_image?.length > 0 && (
                        <div className={`${record.property_image.length >= 4 ? "w-6/12" : "w-8/12"}`}>
                            <div className="image-cover h-full w-full" onClick={() => handleImageClick(0)}>
                                <img src={record.property_image[0].image_url} className="h-full w-full object-cover" alt="" />
                            </div>
                        </div>
                    )}
                    {record && record.property_image?.length >= 3 && (
                        <div className="flex-1 flex flex-col gap-2">
                            {[...record.property_image].splice(1, 2).map((image, index) => (
                                <div className="image-cover h-[calc(100%/2-4px)] w-full" key={uuidv4()} onClick={() => handleImageClick(index + 1)}>
                                    <img src={image.image_url} className="h-full w-full object-cover" alt="" />
                                </div>
                            ))}
                        </div>
                    )}
                    {record && record.property_image?.length >= 4 && (
                        <div className="flex-1 flex flex-col gap-2">
                            {[...record.property_image].splice(3).map((image, index) => (
                                <div className="image-cover h-[calc(100%/2-4px)] w-full" key={uuidv4()} onClick={() => handleImageClick(index + 3)}>
                                    <img src={image.image_url} className="h-full w-full object-cover" alt="" />
                                </div>
                            ))}
                        </div>
                    )}

                </div>
<div className="text-2xl lg:text-3xl  flex font-medium mb-2 peora-title">
                    <div className={"backtag"} ></div>
                    {/* <Back /> */}
                    {record && record.name}
                </div>
          <div className="h-full w-full">
            {record && record.amenities}
          </div>

            </Layout>
            <Toaster />
        </>
    );
}
