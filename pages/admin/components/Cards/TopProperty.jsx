import Image from 'next/image'
import { Clock, MinusCirlce, House } from 'iconsax-react'
import Avatar1 from '../assets/avatars/avatar1.png'
import Avatar2 from '../assets/avatars/avatar2.png'
import Avatar3 from '../assets/avatars/avatar3.png'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Listing from '../../api/Listing'
import {formatMultiPrice} from "../../../../hooks/ValueData"

function StatusTracker({properties}) {
    const[propertylist, setPropertylist]=useState();

    useEffect(()=>{
        const main =  new Listing();
        const response =  main.Top3Properties();
        response.then((res)=>{
          setPropertylist(res?.data?.data)
        }
        ).catch((error)=>{
          console.log("error",error)
        })
      },[])

    return (
        <div className='border text-gray-500 w-full p-3 rounded-2xl'>
            {/* header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center text-sm gap-2'>
                    <House size={18} />
                    <p className='text-gray-800 font-medium'>Total Properties - {properties}</p>
                </div>
                <Link href="/admin/property" className='border px-2 py-1 rounded-lg text-xs'>
                    See all
                </Link>
            </div>

            <hr className='bg-gray-400 my-4' />

            {/* content */}
            <div className='space-y-3'>
                {/* absent */}
                {propertylist && propertylist.map(item=>(                
                <div className='space-y-3'>
                    {/* <p className='text-xs text-black'>Absent</p> */}
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <Image src={item?.image} alt='loom' height={36} width={36} className='rounded-full' />
                                <div className='font-medium'>
                                    <p className='text-sm text-gray-800'>{item?.name}</p>
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

                {/* away */}
                {/* <div className='space-y-3'>
                    <p className='text-xs text-black'>Away</p>

                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <Image src={Avatar2} alt='loom' height={36} width={36} className='rounded-full' />
                                <div className='font-medium'>
                                    <p className='text-sm text-gray-800'>Walter White</p>
                                    <p className='text-xs text-gray-500'>Backend Developer</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex text-xxs font-medium items-center gap-1 pr-1.5 bg-black-100 px-1 py-0.5 rounded-full text-white-400'>
                            <Clock size={14} variant='Bold' />
                            <span>25m</span>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <Image src={Avatar3} alt='loom' height={36} width={36} className='rounded-full' />
                                <div className='font-medium'>
                                    <p className='text-sm text-gray-800'>Dwayne Johnson</p>
                                    <p className='text-xs text-gray-500'>DevOps Engineer</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex text-xxs font-medium items-center gap-1 pr-1.5 bg-black-100 px-1 py-0.5 rounded-full text-white-400'>
                            <Clock size={14} variant='Bold' />
                            <span>12m</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default StatusTracker