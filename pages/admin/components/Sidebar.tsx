import React, { useContext, useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight2, Element3, Setting4, TextalignJustifycenter, Triangle } from 'iconsax-react';
import { Context } from "../../_app";
import LocalToken from "../../../hooks/LocalToken";
import { usePathname } from 'next/navigation';
import Menu from "./menu";

function Sidebar() {
    const { auth, setAuth } = useContext(Context);
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // State to control mobile sidebar visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
    const webtoken = LocalToken('Admintoken');

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(prevState => !prevState);
    };

    async function getAuth () { 
        if(webtoken){
            const main = new Listing();
           const response =  main.Adminprofile();
          response.then((res) => {
            if (res.data.status) {
              setAuth(res.data.data);
            } 
          }).catch((error) => {
            console.log("error", error);
          });
        }
      }
    
    useEffect(() => {
        getAuth();
      }, []);
    
      
    return (
        <div className={`w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden ${isSidebarOpen ? '!fixed' : 'hidden'}`}>
            <div className={`w-full h-full bg-white border-r ${isMobileSidebarOpen ? 'block' : 'hidden md:block'}`}>
                <div className='p-4 md:p-6 flex cursor-pointer group items-center gap-2 z-10' onClick={toggleSidebar}>
                    <div className='h-10 outline outline-violet-300 w-10 flex items-center bg-gradient-to-br justify-center rounded-full from-violet-500 to-violet-400 text-white'>
                        <Triangle size={24} className='relative group-hover:scale-85 duration-200' />
                    </div>
                    <div>
                        <h1 className='text-sm font-bold text-gray-800'>Admin</h1>
                        <p className='text-xs text-gray-500 font-medium'>Admin Management</p>
                    </div>
                </div>

                <hr className='bg-gray-400 mx-2' />

                <div className='flex flex-col h-full justify-between'>
                    <div className='pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-normal'>
                        <Link href={'/admin'} className={`flex ${pathname === '/admin' ? 'text-primary' : ''} hover:px-8 duration-200 rounded-md w-full py-2 px-6 items-center gap-2`}>
                            <Element3 variant='Outline' size={16} />
                            Dashboard
                        </Link>

                        <Link href={'/admin/property/add'} className={`flex ${pathname === '/admin/property/add' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 3.1875L21.4501 10.275L21.0001 11.625H20.25V20.25H3.75005V11.625H3.00005L2.55005 10.275L12 3.1875ZM5.25005 10.125V18.75H18.75V10.125L12 5.0625L5.25005 10.125Z" fill="#080341"/>
                            </svg>
                            Property Add
                        </Link>

                        <Link href={'/admin/property'} className={`flex ${pathname === '/admin/property' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <TextalignJustifycenter size={16}/>
                            Property List
                        </Link>

                        <Link href={'/admin/user'} className={`flex ${pathname === '/admin/user' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <Setting4 size={16} />
                            User List
                        </Link>
                    </div>

                    <div>
                        <hr className='bg-gray-400 mx-2 my-4' />

                        { auth ? (
                            <div className='flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200'onClick={() => setIsDropdownOpen(!isDropdownOpen)} >
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src={auth?.admin_profile_url}
                                        alt='User'
                                        width={36}
                                        height={36}
                                        className='rounded-full'
                                    />
                                    <div className=''>
                                        <p className='text-sm font-semibold text-gray-800'>{auth?.name}</p>
                                        <p className='text-xs font-medium text-gray-500'>{auth?.email}</p>
                                    </div>
                                </div>
                                <button className='text-gray-500' >
                                    <ArrowRight2 size={16} />
                                    <Menu isOpen={isDropdownOpen} record={auth}/> 
                                </button>
                            </div>
                        ) : (
                            <div className='flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200'>
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src={"https://th.bing.com/th/id/OIP.aPrAXebVFheO1nA-8qU47gHaJA?rs=1&pid=ImgDetMain"}
                                        alt='User'
                                        width={36}
                                        height={36}
                                        className='rounded-full'
                                    />
                                    <div className=''>
                                        <p className='text-sm font-semibold text-gray-800'>Steve Jobs</p>
                                        <p className='text-xs font-medium text-gray-500'>steve@adminle.com</p>
                                    </div>
                                </div>
                                <button className='text-gray-500'>
                                    <ArrowRight2 size={16} />
                                </button>
                            </div>
                        ) }
                    </div>
                </div>
            </div>

            <div className="md:hidden fixed top-0 left-0 z-50 p-4">
                <button onClick={toggleMobileSidebar}>
                    {isMobileSidebarOpen ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M18 6L6 18h12V6zm-6 10h2v-2h-2v2z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M21 19H3v-2h18v2zm0-7H3v-2h18v2zm0-7H3V3h18v2z"/>
                        </svg>
                    )}
                </button>
            </div>
           
        </div>
    )
}

export default Sidebar;
