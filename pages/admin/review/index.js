import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import Listing from '../api/Listing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import Loading from "../hook/spinner"
import Moment from 'moment';
import  Dateformat from "../hook/Dateformat";

export default function Index() {

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();
    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        try {
            const Main = new Listing();
            const response = await Main.getrating();
            console.log('res', response);
            setContent(response?.data?.data);
            setLoading(false);
        } catch (error) {
            console.log('errr', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log('content', content);
    const acceptReview = (uuid, id, newStatus) => {
        setLoading(true); 
        const main = new Listing();
        main.reviewaccept(uuid, id, newStatus)
            .then((response) => {
                setLoading(false); // Set loading state to false after the API call is completed
                if (response && response.data && response.data.status === true) {
                    // Update UI state after successful API call
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
                setLoading(false); 
                console.error("Error updating review status:", error);
            });
    };
    
    

    return (
        <>
            <AdminLayout>
                <section className=" p-4 ">
                    <div className="flex flex-col">
                                    {loading ? (
                                        <div className = "flex flex-wrap justify-center">
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
                                                                <td  style={{ width: '25%' }} className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
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
                                                                    {item?.status === 1 ? 'Accepted' : 'Rejected'}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                                                    <div onClick={() => acceptReview(item?.user_id, item?.properties_id, item.status === 0 ? 1 : 0)} className="cursor-pointer text-blue-500 flex items-center gap-2 border rounded-full p-2 mb-2">
                                                                         Accepted
                                                                    </div>
                                                                    <div onClick={() => acceptReview(item?.user_id, item?.properties_id, item.status === 1 ? 0 : 1)} className="cursor-pointer text-blue-500 flex items-center gap-2 border rounded-full p-2">
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
