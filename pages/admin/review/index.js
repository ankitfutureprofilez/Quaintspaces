import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import Listing from '../api/Listing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import Loading from "../hook/spinner"
import Moment from 'moment';
import Dateformat from "../hook/Dateformat";

export default function Index() {

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();

    const fetchData = async () => {
        setLoading(true);
        try {
            const Main = new Listing();
            const response = await Main.getrating();
            setContent(response?.data?.data);
            setLoading(false);
        } catch (error) {
            console.log('errr', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if(loading){
            fetchData();
        }
    }, []);

    const acceptReview = (uuid, id, newStatus) => {
        const main = new Listing();
        main.reviewaccept(uuid, id, newStatus)
            .then((response) => {
                if (response && response.data && response.data.status === true) {
                    setContent(prevContent =>
                        prevContent.map(item =>
                            item.id === id ? { ...item, status: newStatus } : item
                        )
                    );
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error updating review status:", error);
            });
    };
    
    

    console.log("content",content)
    



    return (
        <>
            <AdminLayout>
                <section className=" p-4 ">
                    <div className="flex flex-col">
                        {loading ? (
                            <div className="flex flex-wrap justify-center">
                                <Loading />
                            </div>
                        ) : (
                            <div className=" overflow-x-auto ">
                                <div className="inline-block  align-middle ">
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                                        <table className="min-w-[1200px] table-auto divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Review Date
                                                    </th>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        User
                                                    </th>
                                                    <th style={{ width: '35%' }} scope="col" className="min-w-50 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Description
                                                    </th>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Property
                                                    </th>
                                                    <th style={{ width: '10%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Status
                                                    </th>
                                                    <th style={{ width: '10%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className=" bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {content &&
                                                    content.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                                    <Dateformat item={item?.createdAt} />
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                                    <div className="flex items-center gap-x-2">
                                                                        <img
                                                                            className="object-cover w-8 h-8 rounded-full"
                                                                            src={item?.rating_user?.image_url}
                                                                            alt=""
                                                                        />
                                                                        <div>
                                                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                                                                {item?.rating_user?.name}
                                                                            </h2>
                                                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                                                                {item?.rating_user?.email}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td style={{ width: '25%' }} className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                                    {item?.review_text}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                                    <div className="flex items-center gap-x-2">
                                                                        <Link href={`/property/${item?.get_property_review?.uuid}`} className="flex items-center gap-x-2">
                                                                            <img
                                                                                className="object-cover w-8 h-8 rounded-full"
                                                                                src={item?.get_property_review?.property_image[0]?.image_url}
                                                                                alt=""
                                                                            />
                                                                            <div>
                                                                                <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                                                                    {item?.get_property_review?.name}
                                                                                </h2>
                                                                                <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                                                                    {item?.get_property_review?.price}
                                                                                </p>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                                    {item?.status === 1 ? 
                                                                    
                                                                    (
                                                                       < div className= "flex flex-wrap"> 
                                                                        <svg
                                                                        className="text-emerald-500"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
                                                                            fill="currentColor"
                                                                        ></path>
                                                                    </svg>
                                                                    <p>Accepted </p>
                                                                    </div>
                                                                ) 

                                                                    : 
                                                                    (
                                                                        <div className= "flex flex-wrap">

                                                                        <p>
                                                                        Rejected
                                                                        </p>

                                                                        <svg
                                                                        className="text-red-400"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="m19.53 5.53-14 14c-.02.02-.03.03-.05.04-.38-.32-.73-.67-1.05-1.05A9.903 9.903 0 0 1 2 12C2 6.48 6.48 2 12 2c2.49 0 4.77.91 6.52 2.43.38.32.73.67 1.05 1.05-.01.02-.02.03-.04.05ZM22 12c0 5.49-4.51 10-10 10-1.5 0-2.92-.33-4.2-.93-.62-.29-.74-1.12-.26-1.61L19.46 7.54c.48-.48 1.32-.36 1.61.26.6 1.27.93 2.7.93 4.2Z"
                                                                            fill="currentColor"
                                                                        ></path>
                                                                        <path
                                                                            d="M21.77 2.229c-.3-.3-.79-.3-1.09 0L2.23 20.689c-.3.3-.3.79 0 1.09a.758.758 0 0 0 1.08-.01l18.46-18.46c.31-.3.31-.78 0-1.08Z"
                                                                            fill="currentColor"
                                                                        ></path>
                                                                    </svg>
                                                                        </div>
                                                                    
                                                                  )
                                                                    
                                                                   
                                                                   }
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                                    <div onClick={() => acceptReview(item?.user_id, item?.properties_id, item.status === 0 ? 1 : "")} className="cursor-pointer text-green-500 flex items-center gap-2 border rounded-full p-2 mb-2">
                                                                        Accepted
                                                                        <svg
                                                                            className="text-emerald-500"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
                                                                                fill="currentColor"
                                                                            ></path>
                                                                        </svg>
                                                                    </div>
                                                                    <div onClick={() => acceptReview(item?.user_id, item?.properties_id, item.status === 1 ? 0 : "")} className="cursor-pointer text-red-500 flex items-center gap-2 border rounded-full p-2">

                                                                        <svg
                                                                            className="text-red-400"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                d="m19.53 5.53-14 14c-.02.02-.03.03-.05.04-.38-.32-.73-.67-1.05-1.05A9.903 9.903 0 0 1 2 12C2 6.48 6.48 2 12 2c2.49 0 4.77.91 6.52 2.43.38.32.73.67 1.05 1.05-.01.02-.02.03-.04.05ZM22 12c0 5.49-4.51 10-10 10-1.5 0-2.92-.33-4.2-.93-.62-.29-.74-1.12-.26-1.61L19.46 7.54c.48-.48 1.32-.36 1.61.26.6 1.27.93 2.7.93 4.2Z"
                                                                                fill="currentColor"
                                                                            ></path>
                                                                            <path
                                                                                d="M21.77 2.229c-.3-.3-.79-.3-1.09 0L2.23 20.689c-.3.3-.3.79 0 1.09a.758.758 0 0 0 1.08-.01l18.46-18.46c.31-.3.31-.78 0-1.08Z"
                                                                                fill="currentColor"
                                                                            ></path>
                                                                        </svg>
                                                                        Rejected
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </AdminLayout>
        </>
    );
}
