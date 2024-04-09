import React from "react";
import Layout from "./layout/Layout";
import { useRouter } from "next/router";

export default function error() {
    const router=useRouter();
  return (
    <Layout>
        <body className="bg-404 mt-8">
          <section className="pd-5vw">
            <div>
              <div className="text-size-5-vh dpd-20 text-red-500">
                Under Maintenance
              </div>
              <div className="text-size-10-vh text-blue dpd-20">
                <strong>We'll Be Back Soon. </strong>
              </div>
            </div>
            <div className="text-height-1-5 text-grey text-size-18 dpd-20">
              We're busy upgrading with new technology. We apologize for the
              inconvenience.
            </div>
            <div className="text-height-1-5 text-grey text-size-18 dpd-20">
              Click the below button to go back
            </div>
            <br />
            <button 
            onClick={()=>{router.back()}}
            className="mx-auto btn sort">Go Back</button>
          </section>

          <div className="gears-img sm-hide">
            <svg
              className="machine"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 645 526"
              fill="url(#grad1)"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="gears-grd1" />
                  <stop offset="100%" className="gears-grd2" />
                </linearGradient>
              </defs>
              <g>
                <path
                  className="large-shadow"
                  d="M645 194v-21l-29-4c-1-10-3-19-6-28l25-14 -8-19 -28 7c-5-8-10-16-16-24L602 68l-15-15 -23 17c-7-6-15-11-24-16l7-28 -19-8 -14 25c-9-3-18-5-28-6L482 10h-21l-4 29c-10 1-19 3-28 6l-14-25 -19 8 7 28c-8 5-16 10-24 16l-23-17L341 68l17 23c-6 7-11 15-16 24l-28-7 -8 19 25 14c-3 9-5 18-6 28l-29 4v21l29 4c1 10 3 19 6 28l-25 14 8 19 28-7c5 8 10 16 16 24l-17 23 15 15 23-17c7 6 15 11 24 16l-7 28 19 8 14-25c9-3 18-5 28-6l4 29h21l4-29c10-1 19-3 28-6l14 25 19-8 -7-28c8-5 16-10 24-16l23 17 15-15 -17-23c6-7 11-15 16-24l28 7 8-19 -25-14c3-9 5-18 6-28L645 194zM471 294c-61 0-110-49-110-110S411 74 471 74s110 49 110 110S532 294 471 294z"
                />
              </g>
            </svg>
          </div>
        </body>
    </Layout>
  );
}
