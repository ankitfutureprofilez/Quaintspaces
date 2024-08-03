import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Listings from '../api/laravel/Listings';

export default function CheckAuth() {
   const router = useRouter();

   useEffect(() => {
      const main = new Listings();
      const response =  main.GetUserProfile();
      response.then((res) => {
         if (res.data.status) {
            router.push("/");
         } 
      }).catch((error) => {
         console.log("error", error);
      });
   }, []);
  return (
    <div>
    </div>
  )
}
