import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Listing from "../api/Listing";
import Image from 'next/image';
import { useRouter } from "next/router";

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState({ email: "" });
    const [newotp, setNewotp] = useState({ emailotp: "" });
    const [status, setStatus] = useState(false);
    const [optStatus, setOptStatus] = useState(false);
    const [forgetpass, setForgetpass] = useState({ repassword: "", confirpass: "" });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (status) {
            setNewotp(prevState => ({ ...prevState, [name]: value }));
        } else {
            setEmails(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleForms = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const main = new Listing();
        try {
            const response = await main.forget(emails);
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                setStatus(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("error", error);
            toast.error("Something went wrong!!");
        }
        setLoading(false);
    };

    const handleotp = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const main = new Listing();
        const formData = new FormData();
        formData.append("forgot_otp", newotp.emailotp);
        formData.append("email", emails.email);
        try {
            const response = await main.forgetopt(formData);
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                setOptStatus(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("error", error);
            toast.error("Something went wrong!!");
        }
        setLoading(false);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForgetpass(prevState => ({ ...prevState, [name]: value }));
        console.table("password", forgetpass);
    };

    const handleforgetpass = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const main = new Listing();
        const formData = new FormData();
        formData.append("email", emails.email);
        formData.append("password", forgetpass && forgetpass.repassword);
        formData.append("confirm_password", forgetpass && forgetpass.confirpass);
        try {
            const response = await main.forgetpass(formData);
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                router.push("/admin");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("error", error);
            toast.error("Something went wrong!!");
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="bg-no-repeat mainadmin bg-cover bg-center relative object-cover" style={{ backgroundImage: 'url(https://get.pxhere.com/photo/villa-mansion-house-floor-interior-home-construction-residence-property-living-room-room-lighting-interior-design-hardwood-resort-windows-estate-lobby-suite-condominium-real-estate-wood-flooring-family-room-1196622.jpg)' }}>
                <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div className="flex justify-center self-center  z-10">
                        <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                            <div className="mb-4">
                                <h3 className="font-semibold text-2xl text-gray-800">Forget Password</h3>
                                <p className="text-gray-500"> Remember your password? 
                                <Link href= "/admin/login" className="text-indigo-800">
                                &nbsp;  Login here
                                </Link>
                                </p>
                            </div>

                            {status ? (
                                optStatus ? (
<>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 tracking-wide">Password </label>
                                            <input
                                                className="mt-1 p-4 border rounded-full w-full  w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                                type="password"
                                                name="repassword"
                                                onChange={handleInput}
                                                value={forgetpass.repassword}
                                                id="repassword"
                                                placeholder="Enter your new password"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 tracking-wide">Confirm Password</label>
                                            <input
                                                className="mt-1 p-4 border rounded-full w-full  w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                                type="password"
                                                name="confirpass"
                                                onChange={handleInput}
                                                value={forgetpass.confirpass}
                                                id="confirpass"
                                                placeholder="Confirm your new password"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            onClick={handleforgetpass} disabled={loading}
                                            className="w-full flex justify-center   bg-indigo-600  hover:bg-indigo-500 text-gray-100 p-3 mt-4 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                                        >
                                            {loading ? "please wait.." : "Reset Password"}
                                        </button>
                                    </div>
</>                                  
                                ) : (
                                    <>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 tracking-wide">OTP</label>
                                            <input
                                                className="mt-1 p-4 border rounded-full w-full  w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                                type="text"
                                                name="emailotp"
                                                onChange={handleInputs}
                                                value={newotp.emailotp}
                                                id="emailotp"
                                                placeholder="Enter OTP"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            onClick={handleotp} disabled={loading}
                                            className="w-full flex justify-center   bg-indigo-600  hover:bg-indigo-500 text-gray-100 p-3 mt-4 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                                        >
                                            {loading ? "please wait.." : "Submit OTP"}
                                        </button>
                                    </div>
                                    </>
                                )
                            ) : (
                            <>
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                        <input
                                            className="mt-1 p-4 border rounded-full w-full  w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            type="email"
                                            name="email"
                                            value={emails.email}
                                            onChange={handleInputs}
                                            id="email"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                    onClick={handleForms} disabled={loading}
                                        type="submit"
                                        className="w-full flex justify-center   bg-indigo-600  hover:bg-indigo-500 text-gray-100 p-3 mt-4 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                                    >
                                        {loading ? "please wait.." : "Email"}
                                    </button>
                                </div>
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
