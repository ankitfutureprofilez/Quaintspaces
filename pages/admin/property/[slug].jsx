import React, { useEffect, useRef, useState } from "react";
import Element from "../element";
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
import Property from "./add/Property"
import AdminLayout from "../AdminLayout";

export default function Index() {
    const ImagesRef = useRef(null);
    const AmenitiesRef = useRef(null);
    const ReviewsRef = useRef(null);
    const LocationRef = useRef(null);
    const CardRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { slug } = router.query;
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    console.log("slug", slug)
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
    const [scroll, setScroll] = useState(null);


    const fetchPropertyDetails = () => {
        setLoading(true);
        const main = new Listing();
        const response = main.Adminpropertydetails(slug);
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


    useEffect(() => {
        if (slug !== null) {
            fetchPropertyDetails();
        }
    }, [slug]);

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


    const [showConfirmation, setShowConfirmation] = useState(false);
    const deleteImage = () => {
        const main = new Listing();
        main
            .propertydelete(slug)
            .then((response) => {
                router.push("/admin/property")
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log("error", error);
            });
    };


    const handleDelete = () => {
        setShowConfirmation(true);
    }

    const handleConfirmation = () => {
        deleteImage(slug);
        setShowConfirmation(false);
    }

    const handleCancel = () => {
        setShowConfirmation(false);
    }


    return <>
        <AdminLayout>

            <Element />
            <section className="w-full sm:px-4">
                <div className="container mx-auto !py-4 sm:py-8">
                    <Title
                        // isSaved={isSaved}
                        loading={loading}
                        listing={record?.data}
                    // addWishlist={changeWishlist}
                    />
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
                    <div className="flex  items-left  justify-left gap-5">
                        <div>
                            <button
                                className="hover:border hover:border-black bg-red-600 rounded-full transition-none m-1 p-2"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            {showConfirmation &&
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                                    <div className="bg-white p-6 rounded-lg">
                                        <p>Are you sure you want to delete this property?</p>
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                className="mr-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                onClick={handleConfirmation}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div>
                            <button
                                onClick={togglePopup}
                                className="hover:border hover:border-black bg-green-600 rounded-full transition-none m-1 p-2"
                            >
                                Update
                            </button>
                            {isPopupOpen && (
                                <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 overflow-auto">
                                    <div className="bg-gray-200 rounded-lg flex flex-col items-center justify-center p-8 property-popup">
                                        <Property record={record?.data?.data} uuid={slug} onClose={togglePopup} />
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                    <div className="flex gap-16 relative mb-8 mt-8 lg:mt-0">
                        <Info listing={record?.data} ref={AmenitiesRef}
                            loading={loading}
                        />
                        <div className="hidden lg:block">
                            {/* <Date_GuestsPickerCard
                                loading={loading}
                                selection={selection}
                                setSelection={setSelection}
                                selectedDay={selectedDay}
                                selectEnd={selectEnd}
                                setSelectedDay={setSelectedDay}
                                setSelectEnd={setSelectEnd}
                                result={result}
                                guests={guests}
                                setGuests={setGuests}
                                listing={record?.data?.data}
                                ref={CardRef}
                            /> */}
                        </div>
                    </div>
                    {/* <Reviews data={record?.data} ref={ReviewsRef} />  */}
                    {/* <Location listing={record} ref={LocationRef} /> */}
                </div>
            </section>
        </AdminLayout>
        {/* </Layout> */}
    </>
}