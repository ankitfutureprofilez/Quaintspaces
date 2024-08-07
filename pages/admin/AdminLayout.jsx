
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/router";
import Listing from "./api/Listing";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

const AdminLayout = ({ children, heading, text }) => {

    const router = useRouter();
    const [content, setContent] = useState([]);
    const fetchData = () => {
        const main = new Listing();
        const response = main.Adminprofile();
        response
            .then((res) => {
                if (res.data.status) {
                    setContent(res.data.data);
                } else {
                }
            }).catch((error) => {
                console.log("error", error);
                localStorage && localStorage.removeItem("Admintoken");
                localStorage && localStorage.removeItem("admintoken");
                router.push("/admin/login");
                toast.error("Please log in first.");
            });
    }

    useEffect(() => {
        fetchData()
    }, []);


    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        fetchData(signal);
        return () => controller.abort();
    }, []);

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen((prevState) => !prevState);
    };


    return (
        <>
            <div className='admin-layout flex '>
                <div className={`sidebar mainsidebar ${isMobileSidebarOpen ? "opened-sidebar" : "closed-sidebar"}`}>
                    <Sidebar isMobileSidebarOpen={isMobileSidebarOpen} />
                </div>
                <div className='w-full relative content-bar max-h-[100vh] overflow-auto pb-6 '>
                    <Navbar toggleMobileSidebar={toggleMobileSidebar} heading={heading} />
                    <div className="pt-20 md:pt-20 px-4 " >{children}</div>
                    {text}
                </div>
            </div>
            </>
    );
};

export default AdminLayout;