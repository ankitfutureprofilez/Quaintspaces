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
                     className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
                 {record?.name}
                 </div>
                <p>{record?.email}</p>
            </div>
            <p className="mt-2 text-sm text-gray-900">Lorem ipsum dolor sit amet, consecte adipisicing elit. Voluptatibus quia
                Maiores et perferendis eaque.</p>
            <div className="flex mt-4 justify-center">
                <a href="#" className="w-6 mx-1">
                    <svg className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600" width="100%" height="100%"
                        viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve">
                        <path id="Twitter" d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
                        5.373,-12 12,-12c6.627,0 12,5.373 12,12Zm-6.465,-3.192c-0.379,0.168
                        -0.786,0.281 -1.213,0.333c0.436,-0.262 0.771,-0.676
                        0.929,-1.169c-0.408,0.242 -0.86,0.418 -1.341,0.513c-0.385,-0.411
                        -0.934,-0.667 -1.541,-0.667c-1.167,0 -2.112,0.945 -2.112,2.111c0,0.166
                        0.018,0.327 0.054,0.482c-1.754,-0.088 -3.31,-0.929
                        -4.352,-2.206c-0.181,0.311 -0.286,0.674 -0.286,1.061c0,0.733 0.373,1.379
                        0.94,1.757c-0.346,-0.01 -0.672,-0.106 -0.956,-0.264c-0.001,0.009
                        -0.001,0.018 -0.001,0.027c0,1.023 0.728,1.877 1.694,2.07c-0.177,0.049
                        -0.364,0.075 -0.556,0.075c-0.137,0 -0.269,-0.014 -0.397,-0.038c0.268,0.838
                        1.048,1.449 1.972,1.466c-0.723,0.566 -1.633,0.904 -2.622,0.904c-0.171,0
                        -0.339,-0.01 -0.504,-0.03c0.934,0.599 2.044,0.949 3.237,0.949c3.883,0
                        6.007,-3.217 6.007,-6.008c0,-0.091 -0.002,-0.183 -0.006,-0.273c0.413,-0.298
                        0.771,-0.67 1.054,-1.093Z"></path>
                    </svg>
                </a>
                {/* Other social media icons */}
            </div>
        </div>
        </AdminLayout>
    );
}

export default index;
