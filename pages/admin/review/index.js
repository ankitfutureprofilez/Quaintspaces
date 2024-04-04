import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import Listing from '../api/Listing';
import Link from 'next/link';

export default function Index() {
    const [content, setContent] = useState();

    useEffect(() => {
        const Main = new Listing();
        const response = Main.getrating();
        response
            .then((res) => {
                console.log('res', res);
                setContent(res?.data?.data);
            })
            .catch((error) => {
                console.log('errr', error);
            });
    }, []);

    console.log('content', content);


     
  const deleteProperty = (uuid) => {
    const main = new Listing();
    main.reviewaccept(uuid).then((response) => {
      if(response.data.status ===true){
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }).catch((error) => {
      console.error("Error deleting property:", error);
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
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                >
                                                    Review Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                >
                                                    user
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                >
                                                    Description
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    Property
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                >
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
                                                                {item?.status === 1 ? 'Accept ' : 'Decline '}
                                                            </td>

                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                {item?.status === 1 ? 'Accept ' : 'Decline '}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AdminLayout>
        </>
    );
}



  