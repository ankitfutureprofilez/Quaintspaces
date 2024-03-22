import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Listing from "../api/Listing";
export default function AuthLayout({ children }) {
  const router = useRouter();
  const [content, setContent] = useState([]);
  
  useEffect(() => {
    const auth = localStorage.getItem("token");
    const main = new Listing();
    const response =  main.Adminprofile();
    response
      .then((res) => {
        console.log("res", res);
        if (res.data.status) {
          setAuth(res?.data?.data);
          setContent(res.data.data);
        } else {
        }
      })
      .catch((error) => {
        console.log("error", error);
        router.push("/admin/login");
        toast.error("Please log in first.");
      });
  }, []);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
