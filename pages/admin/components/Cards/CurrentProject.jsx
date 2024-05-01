import Image from 'next/image'
import { WalletMoney, Clock, DocumentText, Flash, InfoCircle } from 'iconsax-react'
import AtlassianLogo from '../assets/logos/atlassian.svg'
import Avatar1 from '../assets/avatars/avatar1.png'
import Avatar2 from '../assets/avatars/avatar2.png'
import Avatar3 from '../assets/avatars/avatar3.png'
import Avatar4 from '../assets/avatars/avatar4.png'
import { useEffect, useState } from 'react'
import Listing from '../../api/Listing'
import Link from 'next/link'
import {formatMultiPrice} from "../../../../hooks/ValueData"


function CurrentProject() {
    const[record,setRecord]=useState();
    
  useEffect(() => {
    const main = new Listing();
    main
      .Top3Payments()
      .then((r) => {
        console.log("payments",r?.data?.data)
        setRecord(r?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return (
        <div className='border text-gray-500 w-full p-3 rounded-2xl'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center text-sm gap-2'>
                    <WalletMoney size={18} />
                    <p className='text-gray-800 font-medium'>Payments</p>
                </div>
                <Link href="/admin/property" className='border px-2 py-1 rounded-lg text-xs'>
                    See all
                </Link>
            </div>

            <hr className='bg-gray-400 my-4' />

            <div className='space-y-3'>
                {record && record?.map(item=>(                
                <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <Image src={item?.booking_history?.booking_property?.property_image[0]?.image_url} alt='loom' height={36} width={36} className='rounded-full' />
                                <div className='font-medium'>
                                    <div className='flex space-x-2 justify-between'>
                                    <p className='text-xs text-gray-800'>{item?.payment_id}</p>
                                    <p className='text-xs text-gray-800'>{item?.booking_history?.check_in}</p>
                                    </div>
                                    <p className='text-xs text-gray-500'> {formatMultiPrice(item?.price)}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* <div className='flex text-xxs font-medium items-center gap-1'>
                            <MinusCirlce size={14} variant='Bold' />
                            <span>Absent</span>
                        </div> */}
                    </div>
                </div>
                ))}

                <hr className='bg-gray-400' />
            </div>
        </div>
        // Old Code
        // <div className='border text-gray-500 w-full  p-3 rounded-2xl'>
        //     {/* header */}
        //     <div className='flex items-center justify-between'>
        //         <div className='flex items-center text-sm gap-2'>
        //             <Flash size={18} />
        //             <p className='text-gray-800 font-medium'>Current Project</p>
        //         </div>
        //         <button className='border flex items-center gap-1 px-2 py-1 rounded-lg text-xs'>
        //             <InfoCircle size={14} />
        //             Details
        //         </button>
        //     </div>

        //     <hr className='bg-gray-400 my-4' />

        //     {/* content */}
        //     <div className='space-y-4'>
        //         <div className='space-y-2'>
        //             <p className='text-xs text-black'>Project name</p>

        //             {/* header */}
        //             <div className='flex items-center gap-2'>
        //                 <Image src={AtlassianLogo} alt='company' height={18} width={18} />
        //                 <p className='text-sm text-gray-800 font-medium'>Atlassian docs</p>
        //                 <div className='flex text-xxs font-medium items-center gap-1 pr-1.5 bg-black-100 px-1 py-0.5 rounded-full text-white-400'>
        //                     <Clock size={14} variant='Bold' />
        //                     <span>In progress</span>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* project leads */}
        //         <div className='flex gap-12'>
        //             <div className='space-y-1'>
        //                 <p className='text-xs text-black'>Project manager</p>
        //                 <div className='flex items-center gap-2'>
        //                     <Image src={Avatar4} alt='Steve J.' width={20} height={20} className='rounded-full' />
        //                     <p className='text-sm text-gray-800 font-medium'>Steve J.</p>
        //                 </div>
        //             </div>

        //             <div className='space-y-1'>
        //                 <p className='text-xs text-black'>Tech lead</p>
        //                 <div className='flex items-center gap-2'>
        //                     <Image src={Avatar2} alt='Steve J.' width={20} height={20} className='rounded-full' />
        //                     <p className='text-sm text-gray-800 font-medium'>Andrew M.</p>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* team */}
        //         <div className='space-y-1'>
        //             <p className='text-xs text-black'>Team</p>
        //             <div className='flex items-center gap-1'>
        //                 <div className='flex group'>
        //                     <Image src={Avatar1} alt='user1' height={20} width={20} className='outline outline-white rounded-full -ml-0.5 group-hover:ml-0 duration-200' />
        //                     <Image src={Avatar2} alt='user2' height={20} width={20} className='outline outline-white rounded-full -ml-0.5 group-hover:ml-0 duration-200' />
        //                     <Image src={Avatar3} alt='user3' height={20} width={20} className='outline outline-white rounded-full -ml-0.5 group-hover:ml-0 duration-200' />
        //                 </div>
        //                 <p className='text-xxs'>+6 people</p>
        //             </div>
        //         </div>

        //         {/* timeline */}
        //         <div className='space-y-1 font-medium'>
        //             <p className='text-xs text-black'>Timeline</p>
        //             <div className='text-sm flex items-center gap-2'>
        //                 <Calendar size={18} />
        //                 <p className='text-gray-800'>12/10/2023 - 12/2/2024</p>
        //             </div>
        //         </div>

        //         {/* description */}
        //         <div className='space-y-1 font-medium'>
        //             <p className='text-xs text-black'>Description</p>
        //             <div className='text-sm flex items-center gap-2'>
        //                 <DocumentText size={18} />
        //                 <p className='text-gray-800'>Frontend website for AI app</p>
        //             </div>
        //         </div>

        //     </div>
        // </div>
    )
}

export default CurrentProject