import React from 'react';
import { Diagram,Profile2User ,Profile } from 'iconsax-react';
import Link from 'next/link';

function TraningAnalysis({data}) {
    return (
        <div className='border text-gray-500 w-full p-3 rounded-2xl'>
            {/* header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center text-sm gap-2'>
                    {/* <Diagram size={18} /> */}
                    <Profile2User size="18" color="#FF8A65"/>
                    <p className='text-gray-800 font-medium'>Users {data?.total_user}</p>
                </div>
                <button className='border px-2 py-1 rounded-lg text-xs'>
                    <Link href="/admin/user-history">
                    Details
                    </Link>
                </button>
            </div>
            <hr className='bg-gray-400 my-4' />
            {/* content */}
          
                <div className="flex justify-between w-full mr-3">
    <div className="mr-2 items-center flex p-1.5 bg-blue-100 rounded-md w-full">
        <p className='text-2xl mr-2'>{data?.total_user}</p>
        <p className='text-sm text-gray-800 font-medium mr-2'>User</p>
    </div>
    <div className="mr-2 items-center flex p-1.5 bg-blue-100 rounded-md w-full">
        <p className='text-2xl mr-2'>{data?.activate}</p>
        <p className='text-sm text-gray-800 font-medium'>Active User</p>
    </div>
    <div className="mr-2 items-center flex p-1.5 bg-blue-100 rounded-md w-full">
        <p className='text-2xl mr-2'>{data?.deactivate}</p>
        <p className='text-sm text-gray-800 font-medium'>Deactivated User</p>
    </div>
</div>

                    {/* attendees */}
                    {/* <div className='flex items-center gap-1'>
                        <div className='flex group'>
                            <Image src={Avatar1} alt='user1' height={20} width={20} className='outline outline-white rounded-full -ml-0.5 group-hover:ml-0 duration-200' />
                            <Image src={Avatar2} alt='user2' height={20} width={20} className='outline outline-white rounded-full -ml-0.5 group-hover:ml-0 duration-200' />
                            <Image src={Avatar3} alt='user3' height={20} width={20} className='outline outline-white rounded-full -ml-0.5 group-hover:ml-0 duration-200' />
                        </div>
                        <p className='text-xxs'>26 Attended</p>
                    </div> */}
              

                {/* graph */}
                {/* <div className='flex gap-1.5 items-end h-20'>
                    <motion.div initial={{ height: 0 }} animate={{ height: '' }} transition={{ duration: 0.2 }} className='w-3 h-14 rounded-sm duration-200 bg-primary/60' />
                    <motion.div initial={{ height: 0 }} animate={{ height: '' }} transition={{ duration: 0.2 + 0.2 }} className='w-3 h-16 rounded-sm duration-200 bg-primary' />
                    <motion.div initial={{ height: 0 }} animate={{ height: '' }} transition={{ duration: 0.2 + 0.4 }} className='w-3 h-12 rounded-sm duration-200 bg-primary/60' />
                    <motion.div initial={{ height: 0 }} animate={{ height: '' }} transition={{ duration: 0.2 + 0.6 }} className='w-3 h-16 rounded-sm duration-200 bg-primary' />
                    <motion.div initial={{ height: 0 }} animate={{ height: '' }} transition={{ duration: 0.2 + 0.8 }} className='w-3 h-14 rounded-sm duration-200 bg-primary/60' />
                    <motion.div initial={{ height: 0 }} animate={{ height: '' }} transition={{ duration: 0.2 + 0.11 }} className='w-3 h-20 rounded-sm duration-200 bg-primary' />
                    <motion.div initial={{ height: 0 }} animate={{ height: '' }} transition={{ duration: 0.2 + 0.13 }} className='w-3 h-12 rounded-sm duration-200 bg-primary/60' />
                </div> */}
           
        </div>
    );
}

export default TraningAnalysis;
