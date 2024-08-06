
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useContext } from "react";
import { Context } from "../../_app"
import { Add, SearchNormal1, SidebarLeft } from 'iconsax-react'
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar({ isOpen, toggleMobileSidebar, heading }) {
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
            <div className='bg-white border w-full fixed top-0 flex px-5 py-4 justify-between items-center  z-20'>
                <div className='flex items-center justify-between 1ps-8 11md:ps-0'>
                    <p className='text-xl font-bold text-black'>{heading ? heading : 'Welcome'}</p>
                </div>

                <div className="absolute top-[0px] right-0 z-50 p-4">
                    <button className='menutoggle menytoggle' onClick={toggleMobileSidebar}>
                        <RxHamburgerMenu size={28} />
                    </button>
                </div>

                {/* <div className='text-gray-500 hidden md:flex gap-2 me-8'>
                    <button className='h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-black rounded-lg border-2 md:flex items-center justify-center' onClick={heading ? handleBack : handleProperty}>
                        {heading ? "Add Property" : (
                            <>
                                <Add size={16} />
                                <span className='hidden md:inline'>Add Property</span>
                            </>
                        )}
                    </button>
                </div> */}
            </div>
            <hr className='bg-gray-400 mx-2' />
        </>
    )
}

export default Navbar
