import React ,{useState}from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image'
export default function menu({ isOpen , record }) {


  const router = useRouter();

  const handleLogoutClick = () => {
    localStorage && localStorage.removeItem('Admintoken');
    router.push('/admin/login');
  };

  return (
    <>
       <div className={`flex items-center absolute shadow-md left-0 bottom-16 rounded-lg bg-gray-200 justify-center right-70 ${isOpen ? 'block' : 'hidden'}`}> 
        <div className="w-full min-w-[250px]  p-3 drop-shadow-xl divide-y divide-gray-300">
          <div className="flex mr-auto items-center space-x-4 mr-4">
            <Image
              src={record?.admin_profile_url}
              alt="avatar Evan You"
              className="rounded-full"
              width={35}
              height={35}
            />
            <div className="space-y-2 flex flex-col flex-1 truncate">
              <div className="font-medium relative text-xl leading-tight text-gray-900">
                <span className="flex">
                  <span className=" relative pr-8">
                    {record?.name}
                    <span
                    
                      className="absolute top-1/2 -translate-y-1/2 right-0 inline-block rounded-full"
                    >
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="py-2">
          <nav className="grid gap-1">
         <Link
              href="/admin/security"
              className="flex items-center leading-6 space-x-3 py-2 px-2 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md" >
               
               <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.72997C3.08997 5.90997 3.70998 4.97998 4.47998 4.66998L10.05 2.39001C11.3 1.88001 12.71 1.88001 13.96 2.39001L19.53 4.66998C20.29 4.97998 20.92 5.90997 20.92 6.72997L20.91 11.12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 12.5V15.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              <span>Security</span>
            </Link> 


            
            <Link
              href="/admin/profile"
              className="flex items-center leading-6 space-x-3 py-2 px-2 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
            >
      


              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-7 h-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg>
              <span>Profile </span>
            </Link>
           
          <Link
              href="/contact"
              className="flex items-center leading-6 space-x-3 py-2 px-2 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-7 h-7"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
                ></path>
                <path d="M12 16v.01"></path>
                <path
                  d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"
                ></path>
              </svg>
              <span>Helper Center</span>
            </Link> 
          </nav>
          </div>
         

          <div className="pt-2">
          <div 
          onClick={handleLogoutClick}
            className="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
          >
            <span>Logout</span>
          </div>
          </div>
        </div>
      </div>
    </>
      );
    };