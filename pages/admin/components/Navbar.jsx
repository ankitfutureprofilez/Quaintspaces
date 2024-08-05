
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useContext } from "react";
import { Context } from "../../_app"
import { Add, SearchNormal1, SidebarLeft } from 'iconsax-react'

function Navbar({ isOpen, sidebarChange, heading }) {
    const auth = useContext(Context);
    const router = useRouter();
    function handleProperty() {
        router.push("/admin/property/add")
    }

    function handleBack() {
        router.back("-1")
    }

    return (
        <>
            <div className='bg-white border w-full fixed top-0 flex p-5 md:p-6 justify-between items-center md:h-24 z-10 z-20'>
                <div className='flex items-center justify-between gap-2 ml-7'>
                    <p className='text-xl font-bold text-black'>{heading ? heading : 'Welcome'}</p>
                </div>

                <button className='all-center text-gray-500 h-8 w-8 md:hidden'>
                    <SidebarLeft size={20} />
                </button>


                <div className='text-gray-500 hidden md:flex gap-2'>
                    <button className='h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-black rounded-lg border-2 md:flex items-center justify-center' onClick={heading ? handleBack : handleProperty}>
                        {heading ? "Add Property" : (
                            <>
                                <Add size={16} />
                                <span className='hidden md:inline'>Add Property</span>
                            </>
                        )}
                    </button>
                </div>






            </div>
            <hr className='bg-gray-400 mx-2' />
        </>
    )
}

export default Navbar
