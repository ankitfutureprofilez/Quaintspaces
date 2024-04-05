import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import Listing from '../api/Listing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from "../hook/spinner"

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
    }, [router.asPath]);

    console.log('content', content);
    const acceptReview = (uuid, id, status) => {
        const main = new Listing();
        main.reviewaccept(uuid, id, status)
            .then((response) => {
                if (response.data.status === true) {
                    // Update status locally
                    setContent(prevContent => {
                        return prevContent.map(item => {
                            if (item.id === id) {
                                return { ...item, status: status };
                            }
                            return item;
                        });
                    });
                    // Show toast message
                    toast.success(response.data.message);
                } else {
                    // Show error toast message
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error updating review status:", error);
            });
    };
    
    

    return (
        <>
            <AdminLayout>
                <section className="container px-4 mx-auto">
                    <div className="flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    {loading ? (
                                        <Loading />
                                    ) : (

                                        <table className=" table-fixed  divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Review Date
                                                    </th>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        User
                                                    </th>
                                                    <th style={{ width: '25%' }} scope="col" className="min-w-50 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Description
                                                    </th>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Property
                                                    </th>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Status
                                                    </th>
                                                    <th style={{ width: '15%' }} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {content &&
                                                    content.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                    {item?.createdAt}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
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
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                    {item?.review_text}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                    <div className="flex items-center gap-x-2">
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
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                    {item?.status === 1 ? 'Accepted' : 'Declined'}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                    <div onClick={() => acceptReview(item?.user_id, item?.properties_id, item.status === 0 ? 1 : 0)} className="cursor-pointer text-blue-500">
                                                                        {item?.status === 1 ? 'Accepted' : 'Declined'}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AdminLayout>
        </>
    );
}
