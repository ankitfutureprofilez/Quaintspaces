
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/router";
import Listing from "./api/Listing";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

const AdminLayout = ({ children, heading }) => {

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

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <AnimatePresence>

                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.3, type: 'spring', bounce: 0.25 }}
                    className='fixed md:hidden z-30 top-0 left-0'>
                    <Sidebar />
                </motion.div>

            </AnimatePresence>

            <div className='grid md:grid-cols-[240px_1fr]'>
                <div className='hidden md:block'>
                    <Sidebar />
                </div>
                <div className='w-full overflow-x-auto '>
                    <Navbar heading={heading} />
                    <div className="pt-20 md:pt-24 px-4" >{children}</div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminLayout;
