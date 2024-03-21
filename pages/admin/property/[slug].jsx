import React, { useEffect, useRef, useState } from "react";
import Element from "../element";
import Layout from "../layout";
import Listing from "../api/Listing";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import Images from "../../../components/SingleListingComponents/Images";
import toast, { Toaster } from 'react-hot-toast';
import ImageViewer from "../../../components/SingleListingComponents/ImageViewer";
import useWishlist from "../../../hooks/useWishlist";

import { guestsData } from "../../../utils/miniData";

import Title from "../../../components/SingleListingBody/Title";
import Info from "../../../components/SingleListingBody/Info";
import Date_GuestsPickerCard from "../../../components/SingleListingBody/Date_GuestsPickerCard";
import Reviews from "../../../components/SingleListingBody/Reviews";
import Location from "../../../components/SingleListingBody/Location";
import useLabeling from "../../../hooks/useLabeling";

export default function Index() {
    const ImagesRef = useRef(null);
    const AmenitiesRef = useRef(null);
    const ReviewsRef = useRef(null);
    const LocationRef = useRef(null);
    const CardRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { slug } = router.query;
    const [record, setRecord] = useState(null);
    const [selection, setSelection] = useState(null);
    const [guests, setGuests] = useState({
        ...guestsData,
        adults: { ...guestsData.adults, value: 1 },
    });

    const result = useLabeling(guests);

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectEnd, setSelectEnd] = useState(null);

    const [imageViewer, setImageViewer] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showHeader, setShowHeader] = useState(false);
    const [rightSectionHeader, setRightSectionHeader] = useState(false);
    // const [isSaved, changeWishlist] = useWishlist(record.data, wishlist);
    const [scroll, setScroll] = useState(null);

    useEffect(() => {
        if (CardRef.current) {
            const { x } = CardRef.current?.getBoundingClientRect();

            window.addEventListener("scroll", () => {
                if (window.scrollY > x) {
                    setRightSectionHeader(true);
                } else {
                    setRightSectionHeader(false);
                }
            });
        }
    }, [CardRef.current]);

    useEffect(() => {
        if (scroll) {
            switch (scroll) {
                case "photos":
                    window.scrollBy(
                        0,
                        ImagesRef.current?.getBoundingClientRect().top - 80
                    );
                    break;
                case "amenities":
                    window.scrollBy(
                        0,
                        AmenitiesRef.current?.getBoundingClientRect().top - 80
                    );
                    break;
                case "reviews":
                    window.scrollBy(
                        0,
                        ReviewsRef.current?.getBoundingClientRect().top - 80
                    );
                    break;
                case "location":
                    window.scrollBy(
                        0,
                        LocationRef.current?.getBoundingClientRect().top - 80
                    );
                    break;
            }
        }
    }, [scroll]);

    useEffect(() => {
        if (imageViewer) {
            document.querySelector("body").style = "overflow:hidden";
        } else {
            document.querySelector("body").style = "overflow:visible";
        }
    }, [imageViewer]);

    const deleteImage = (uuid) => {
        const main = new Listing();
        main
            .propertydelete(uuid)
            .then((response) => {
                toast.success(response.data.message);
                router.push("/admin/property")
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    useEffect(() => {
        deleteImage();
    }, []);

    // useEffect(() => {
    //     if (ImagesRef.current) {
    //         const { bottom } = ImagesRef.current?.getBoundingClientRect();
    //         window.addEventListener("scroll", () => {
    //             if (window.scrollY > bottom + 300) {
    //                 setShowHeader(true);
    //             } else {
    //                 setShowHeader(false);
    //             }
    //         });
    //     }
    // }, [ImagesRef.current]);

    useEffect(() => {
        if (slug) {
            fetchPropertyDetails(slug);
        }
    }, [slug]);

    console.log("record?.data?.uuid", record?.data?.data?.uuid)
    const fetchPropertyDetails = (uuid) => {
        setLoading(true);
        const main = new Listing();
        const response = main.Adminpropertydetails(uuid);
        response.then((res) => {
            setLoading(false);
            console.log("res", res);
            setRecord(res);
        }).catch((error) => {
            setLoading(false);
            console.log("error", error);
            toast.error("Failed to fetch property details");
        });
    }

    const handleImageClick = (index) => {
        setImageViewer(true);
        setSelectedImage(index);
    }
    console.log("jjsj", record)
    return (
        <>

            {/* {imageViewer && (
        <ImageViewer
          selectedImage={selectedImage}
          images={record?.property_image}
        //   isSaved={isSaved}
          setImageViewer={setImageViewer}
        />
      )} */}
            <Layout>
                <Element />

                <div className="mt-5 px-5 py-5" >


                </div>

                <section className="w-full px-4">
                    <div className="max-w-[1120px] mx-auto py-4 sm:py-8">
                        <Title
                            // isSaved={isSaved}
                            loading={loading}
                            listing={record?.data}
                        // addWishlist={changeWishlist}
                        />
                        <button
                            className="delete-button bg-red-400 "
                            onClick={() => deleteImage(record?.data?.data?.uuid)}
                            style={{ position: "absolute", top: "6", right: "0" }}
                        >
                            <svg
                                width="32px"
                                height="32px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 12V17"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14 12V17"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M4 7H20"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                        <div
                            ref={ImagesRef}
                            className="block h-screen rounded-2xl overflow-hidden sm:my-8 my-3 relative min-h-[20vh] max-h-[40vh]"
                        >


                            <Images
                                setSelectedImage={setSelectedImage}
                                listing={record?.data}
                                setImageViewer={setImageViewer}
                                loading={loading}
                            />
                        </div>

                        <div className="flex gap-16 relative mb-8 mt-8 lg:mt-0">
                            <Info listing={record?.data} ref={AmenitiesRef}
                                loading={loading}
                            />
                            <div className="hidden lg:block">
                                <Date_GuestsPickerCard loading={loading}
                                    selection={selection}
                                    setSelection={setSelection}
                                    selectedDay={selectedDay}
                                    selectEnd={selectEnd}
                                    setSelectedDay={setSelectedDay}
                                    setSelectEnd={setSelectEnd}
                                    result={result}
                                    guests={guests}
                                    setGuests={setGuests}
                                    listing={record?.data}
                                    ref={CardRef}
                                />
                            </div>
                        </div>
                        <Reviews data={record?.data} ref={ReviewsRef} />
                        {/* <Location listing={record} ref={LocationRef} /> */}
                    </div>
                </section>

            </Layout>
            <Toaster />
        </>
    );
}
