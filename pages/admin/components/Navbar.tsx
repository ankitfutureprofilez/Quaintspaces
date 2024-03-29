import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import {useContext} from  "react";
import {Context} from "../../_app"
import ProfileImage from '../components/assets/profile.png'
import { Add, CalendarEdit, DirectNotification, SearchNormal1, SidebarLeft } from 'iconsax-react'

function Navbar({ isOpen, sidebarChange }: { isOpen: boolean, sidebarChange: (value: boolean) => void }) {
     
    const router= useRouter();
    
    function handleproperty(){
        router.push("/admin/property/add")
      }

      const auth = useContext(Context)
      console.log("aaanav",auth)
    return (
        <div>
            <div className='flex p-4 md:p-6 justify-between items-center'>
                {auth ? (
                     <div className='flex items-center justify-between gap-2'>
                     <Image
                         src={auth?.auth?.admin_profile_url}
                         alt='User'
                         width={40}
                         height={40}
                         className='rounded-full'
                     />
                     <div className=''>
                         <p className='text-sm font-semibold text-gray-800'>{auth?.auth?.name}</p>
                         <p className='text-xs font-medium text-gray-500'>Welcome back</p>
                     </div>
                 </div>
                ) : (
                     <div className='flex items-center justify-between gap-2'>
                     <Image
                         src={ProfileImage}
                         alt='User'
                         width={40}
                         height={40}
                         className='rounded-full'
                     />
                     <div className=''>
                         <p className='text-sm font-semibold text-gray-800'>Steve Jobs</p>
                         <p className='text-xs font-medium text-gray-500'>Welcome back</p>
                     </div>
                 </div>
                )}
               

                <button onClick={() => sidebarChange(!isOpen)} className='all-center text-gray-500 h-8 w-8 md:hidden'>
                    <SidebarLeft size={16} />
                </button>

                {/* right section */}
                <div className='text-gray-500 hidden md:flex gap-2'>
                    <button className='all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg flex justify-center items-center'>
                        <SearchNormal1 size={16} />
                    </button>

                    <button className='all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg flex justify-center items-center'>
                        <DirectNotification size={16} />
                    </button>

                    {/* <button className='h-8 w-8 gap-1 md:w-auto md:border py-1 px-2 duration-200 hover:bg-gray-100 rounded-lg text-xs all-center flex items-center'>
                        <CalendarEdit size={16} />
                        <span className='hidden md:inline'>Schedule</span>
                    </button> */}

                    <button className='h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-black rounded-lg border-2 h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-black rounded-lg text-xs border-2 md:flex items-center justify-centertext-xs md:flex items-center justify-center' onClick={handleproperty}>
                        <Add size={16} />
                        <span className='hidden md:inline'>Add Property</span>
                    </button>
                </div>

            </div>

            <hr className='bg-gray-400 mx-2' />

        </div>
    )
}

export default Navbar