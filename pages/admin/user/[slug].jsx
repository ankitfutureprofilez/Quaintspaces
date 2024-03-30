import React ,{useState ,useEffect} from 'react';
import Listing from "../api/Listing";
import { useRouter } from "next/router";
import AdminLayout  from "../AdminLayout"
import Element  from "../element"

function index() {

    const Router = useRouter();
    const { slug } = Router.query;
    const[record , setRecord] =useState("")

    useEffect(()=>{
        const main =  new Listing();
        const response =  main.userdetails(slug);
        response.then((res)=>{
            setRecord(res?.data?.data)
        }).catch((error)=>{
            console.log("error",error)
        })
    },[slug])
    return ( 
        <AdminLayout>
         <Element text={"USer Detilas"}/>
          <div className="p-5   text-center w-full">
            <img className="w-32 h-32 rounded-full mx-auto" src={record?.image_url ? record?.image_url : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"} alt="" />
            <div className="text-sm mt-5">
                   <div   
                     className="font-medium leading-none text-gray-900 mb-3">
                 {record?.name}
                 </div>
                <p classname = "text-sm  mt-3 font-medium ">{record?.email}</p>
            </div>
            <p className="mt-2 text-sm text-gray-900">{record?.phone_no}</p>
            <button >
                        {record.status === 0 ? (
                          <div className="flex items-center gap-1 border rounded-full p-1">
                            <p className="text-xs">Deactivate</p>{" "}
                            <svg class="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m19.53 5.53-14 14c-.02.02-.03.03-.05.04-.38-.32-.73-.67-1.05-1.05A9.903 9.903 0 0 1 2 12C2 6.48 6.48 2 12 2c2.49 0 4.77.91 6.52 2.43.38.32.73.67 1.05 1.05-.01.02-.02.03-.04.05ZM22 12c0 5.49-4.51 10-10 10-1.5 0-2.92-.33-4.2-.93-.62-.29-.74-1.12-.26-1.61L19.46 7.54c.48-.48 1.32-.36 1.61.26.6 1.27.93 2.7.93 4.2Z" fill="currentColor"></path><path d="M21.77 2.229c-.3-.3-.79-.3-1.09 0L2.23 20.689c-.3.3-.3.79 0 1.09a.758.758 0 0 0 1.08-.01l18.46-18.46c.31-.3.31-.78 0-1.08Z" fill="currentColor"></path></svg>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 border rounded-full p-1">
                            <p className="text-xs">Activate</p>{" "}
                            <svg
                              className="text-emerald-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </button>
         
         </div>
        </AdminLayout>
    );
}

export default index;
