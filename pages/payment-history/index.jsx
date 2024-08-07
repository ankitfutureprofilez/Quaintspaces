import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Listings from "./api/laravel/Listings.js";
// import AuthLayout from "./layout/AuthLayout.js";s
// import NoData from "./elements/NoData.js";
import Link from "next/link";
// import { formatMultiPrice } from "../hooks/ValueData.js";
import Head from "next/head";
// ../components/Loading/ListingsLoading.jsx
import { TableLoading } from "../../components/Loading/ListingsLoading.jsx";
import NoData from "../elements/NoData.js";
import Moment from 'moment';
import { BsDot } from "react-icons/bs";
import Heading from "../elements/Heading.js";
import Listings from "../api/laravel/Listings.js";
import AuthLayout from "../layout/AuthLayout.js";
import { formatMultiPrice } from "../../hooks/ValueData.js";

export default function index() {
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const router = useRouter();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetching = async (pg) => {
        setLoading(true);
        const main = new Listings();
        main
            .PaymentHistory(pg)
            .then((r) => {
                setLoading(false);
                const newdata = r?.data?.data?.data || [];
                setListings((prevData) => {
                    if (pg === 1) {
                        return newdata;
                    } else {
                        return [...prevData, ...newdata];
                    }
                });
                setHasMore(r?.data?.current_page < r?.data?.last_page);
                setPage(r?.data?.current_page);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setHasMore(false);
                setPage(false);
                console.log(err);
            });
    };

    useEffect(() => {
        if (listings && listings?.length < 1) {
            fetching(page + 1);
        }
    }, []);

    const loadMore = () => {
        if (!loading && page) {
            fetching(page + 1);
        }
    };

    const formatDateTime = (datetime) => {
        const date = Moment(datetime).format('D MMMM YYYY');
        const time = Moment(datetime).format('h:mm A');
        return (
            <div>
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">{date}</div>
                <div className="text-start whitespace-nowrap overflow-hidden text-ellipsis">{time}</div>
            </div>
        );
    };

console.log("listings",listings)

    const BookingTable = () => {
        return (
            <>
                <div className="table-responsive">
                    <table className="w-full booking-table">
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Property Name</th>
                                <th>Payment Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        {listings?.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td className="px-2 md:px-4 py-2">
                                        <div className="flex items-center">
                                            <div className="text ml-2">
                                                <div className="title">{item?.payment_id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-2 md:px-4 py-2">
                                        <div className="items-center img-data flex gap-2 text-base">
                                            <div className="text-gray-800 font-medium text-left capitalize">
                                                <div className="title">
                                                    <Link href={`/property/${item?.booking_history?.booking_property?.uuid}`}>
                                                        {item?.booking_history?.booking_property?.name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-2 md:px-4 py-2 text-sm">
                                        {formatDateTime(item?.payment_date)}
                                    </td>
                                    <td className="px-2 md:px-4 py-2 text-sm">
                                        {formatDateTime(item?.booking_history?.check_in)}
                                    </td>
                                    <td className="px-2 md:px-4 py-2 text-sm">
                                        {formatDateTime(item?.booking_history?.check_out)}
                                    </td>
                                    <td className="px-2 md:px-4 py-2 capitalize">
                                        <div>
                                            {item?.method}
                                        </div>
                                    </td>
                                    <td className={`px-2 md:px-4 py-2 capitalize font-bold ${item?.payment_status === "success" ? "text-green-600" : "text-red-600"}`}>
                                        {item?.payment_status}
                                    </td>
                                    <td className="px-2 md:px-4 py-2">
                                        <div>
                                            {/* formatMultiPrice */}
                                            {formatMultiPrice(item?.price)}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>


            </>
        );
    };

    const PhoneDesign = () => {
        return (
            <div className="pb-[10px] pt-[10px]">
                <div className="mx-[auto] w-full">
                    <div className="space-y-[10px]">
                        {listings && listings?.map((item, index) => (
                            <div key={index} className="border-[1px] border-[#0000001a] rounded-[10px] ">
                                <div className="flex flex-wrap justify-between items-center border-b-[1px] border-[#0000001a] p-[10px]">
                                    <h4 className="text-[12px] font-normal uppercase leading-[14.7px] text-[#3F2A17]">
                                        {item?.method}
                                    </h4>


                                    <div className={`text-[11px] leading-[14px] font-normal ${item?.payment_status === "success" ? 'text-green-600 bg-[#00860D33] border-[#00860D]' : 'text-red-600 bg-[#FF000033] border-[#FF0000]'} border-[1px] rounded-[45px] px-[8px] py-[5px] inline-flex items-center`}>
                                        <BsDot className="text-[20px] w-[15px] h-[15px]" />
                                        {item?.payment_status }
                                    </div>
                                </div>
                                <div className="p-[10px]">
                                    <div className="flex flex-wrap items-center justify-between border-b-[1px] border-[#0000001a] pb-[15px] mb-[15px]">
                                        <div className="flex items-center">
                                            <div className="">
                                                <h3 className="text-[15px] capitalize font-normal leading-[18.38px] text-[#3F2A17] mb-[5px]">
                                                    {item?.booking_history?.booking_property?.name}
                                                </h3>
                                                <p className="text-[13px] font-normal leading-[15.77px] text-[#80746A]">
                                                    {item?.payment_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <h3 className="text-[15px] font-normal leading-[18.38px] text-[#3F2A17] mb-[5px]">
                                                {formatMultiPrice(item?.price)}
                                            </h3>
                                            <p className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A]">
                                                INR
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="w-1/2 border-r-[1px] border-[#0000001a] flex items-center">
                                            <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">
                                                {formatDateTime(item?.booking_history?.check_in)}
                                            </span>
                                        </div>
                                        <div className="w-1/2 text-end flex justify-end items-center">
                                            <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">
                                                {formatDateTime(item?.booking_history?.check_out)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

    }


    const MobileLoading = () => {
        return <>
            <div role="status" class="w-full animate-pulse mt-4 border border-gray-300 rounded-xl p-4">
                <div class="h-[20px] w-full bg-gray-200 rounded-xl mb-2 p-4"></div>
                <div class="h-[40px] w-full bg-gray-200 rounded-xl mb-2 p-4"></div>
                <div className='grid grid-cols-2 gap-2'>
                    <div class="h-[70px] w-[100%] bg-gray-200 rounded-xl p-4"></div>
                    <div class="h-[70px] w-[100%] bg-gray-200 rounded-xl p-4"></div>
                </div>
            </div>
        </>
    }

    return (
        <AuthLayout>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
                <title>Payment History - Quaint Spaces Jaipur</title>
            </Head>

            <div className="container mx-auto">
                <div className="account-btn">
                    <div className="pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
                        <Heading text={"Payment History"} handleClick={() => router.back()} />
                    </div>
                </div>

                <div className="tble-ma">
                    {listings && listings.length > 0 ? (
                        isMobile ? <PhoneDesign /> : <BookingTable />
                    ) : (
                        <>
                            {!loading ? <NoData
                                url={"/apartments"}
                                Heading={"No Data Found"}
                                content={"You have not done any payment yet. Click below to go to the page"}
                            /> : ''}
                        </>
                    )}

                    {loading ?
                        <> {isMobile ?
                            <>
                                <MobileLoading />
                                <MobileLoading />
                                <MobileLoading />
                            </>
                            : <TableLoading />} </>
                        : ""}

                    {!loading && listings && listings.length > 0 && hasMore && (
                        <div className="flex justify-center mt-6">
                            <button className="bg-[#efa3a3] text-[#fff] text-[13px] md:text-[16px] border border-[#efa3a3] px-[30px] py-[12px] flex rounded-full hover:text-[#efa3a3] hover:bg-[#ffffff00]" onClick={loadMore}>
                                Load More
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </AuthLayout>
    );
}
