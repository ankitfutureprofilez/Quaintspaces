import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logologin from "../../public/images/loginlogoimg.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Listings from '../api/laravel/Listings';
import { Context } from "../_app";
import LoginPop from "./LoginLogic";
import Popup from "../elements/Popup";
import LoginLogic from "./LoginLogic";

      
export default function NotLogin({openLogin}) {

  const [open, setOpen] = useState(false);
  useEffect(()=>{
      if(openLogin){
        setOpen(true);
      } else {
        setOpen(false);
      }
  });

  return (
     <Popup isOpen={open} >
      <LoginLogic isPopup={true} color={"!text-white"}  />
     </Popup>
  );
}