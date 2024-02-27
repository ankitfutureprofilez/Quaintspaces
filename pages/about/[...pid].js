import React from "react";
import BtnPrimary from "../../components/Button/BtnPrimary";
import { useRouter } from "next/router";
import Link from "next/link";

export default function about() {
  const router = useRouter();
  const givenRoute = router.query;
  console.log(givenRoute);
  return (
    <div>
      <h1>
        This is a about page
        {/* {givenRoute.pid && givenRoute.map((item)=>(
          <span className="ml-2">
        {item}
        </span> 
          ))} */}
      </h1>

      <BtnPrimary
        style={{ fontSize: "1rem", width: "fit-content" }}
        onClick={() => router.push("/about/details")}
      >
        Detail About sadsad
      </BtnPrimary>
    </div>
  );
}
