import React, { useEffect,useState } from "react";
import Element from "../element";
import Layout from "../layout";
import record  from "../api/Listing"
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';


export default function index() {
    const router = useRouter();
    const { slug } = router.query;

    const[record,setrecord] =useState([])
    async function fetchPropertyDetails(uuid) {
      try {
          const main = new Listing();
          const response = await main.Adminpropertydetails(uuid);
          console.log("res", response);
          setrecord(res.data.data)
      } catch (error) {
          console.error("error", error);
      }
  }
    useEffect(() => {
        if (slug) {
            fetchPropertyDetails(slug);
        }
    }, [slug]);

 
    console.log("slug",slug)

    // const deleteImage = (uuid) => {
    //   const main = new record();
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
      <div className="flex gap-2 w-full h-full">
      {record ? (
        <>
        <div className="w-1/2 h-[calc(35vh)] min-h-[500px] bg-lightBorderColor rounded-md"></div>
        <div className="w-1/2 h-[calc(35vh)] min-h-[500px] bg-lightBorderColor rounded-md"></div>
        </>
      ) : (
        <div
          className={`${
            record?.property_image?.length >= 4 ? "w-6/12" : "w-8/12"
          } `}
        >
          <div
            className="image-cover h-full w-full"
            onClick={() => {
              setImageViewer(true);
              setSelectedImage(0);
            }}
          >
            {record?.property_image?.length > 0 && (
              <img
                src={record?.property_image[0]?.image_url}
                className="h-full w-full object-cover"
                alt=""
              />
            )}
          </div>
        </div>
      )}
      {record?.property_image?.length >= 3 ? (
        <div className="flex-1 flex flex-col gap-2">
          {[...record?.data?.property_image]?.splice(1, 2).map((e, i) => (
            <div
              className="image-cover h-[calc(100%/2-4px)] w-full"
              key={uuidv4()}
              onClick={() => {
                setImageViewer(true);
                setSelectedImage(i++);
              }}
            >
              {record?.property_image?.length > 0 && (
                <img
                  src={e.image_url}
                  className="h-full w-full object-cover"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        !record &&
        record?.property_image?.length >= 2 && (
          <div
            className="image-cover h-full w-5/12"
            key={uuidv4()}
            onClick={() => {
              setImageViewer(true);
              setSelectedImage(i++);
            }}
          >
            <img
              src={record.property_image[1].image_url}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        )
      )}
      {record?.property_image?.length >= 4 && (
        <div className="flex-1 flex flex-col gap-2">
          {[...record?.data?.property_image]?.splice(3, 4).map((e, i) => (
            <div
              className="image-cover h-[calc(100%/2-4px)] w-full"
              key={uuidv4()}
              onClick={() => {
                setImageViewer(true);
                setSelectedImage(i++);
              }}
            >
              {record?.property_image?.length > 0 && (
                <img
                  src={e.image_url}
                  className="h-full w-full object-cover"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          setImageViewer(true);
          setSelectedImage(0);
        }}
        className="flex items-center justify-center gap-2 absolute bottom-4 right-4 rounded-md font-medium border darkBorderColor bg-lightBorderColor text-blackColor px-3 py-1"
      >
        <span>
          {/* <Grid /> */}
        </span>
        <span>Show all photos</span>
      </button>
    </div>

      </Layout>
    </>
  );
}
