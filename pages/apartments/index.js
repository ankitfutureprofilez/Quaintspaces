import React from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import RoomListings from "../home/RoomListings";

export default function index() {
  return (
    <Layout>
      <div className="container mx-auto mt-10">
        <div className="flex">
          <h2 className="listing-heading text-left">Explore our Apartments</h2>
          {/* button-group CSS is available in custom.css */}
          <div className="button-group items-end">
            {/* <Link className="sort" href={"/login"}> */}
              <button className="sort btn">Sort By : Most Popular</button>
            {/* </Link> */}
            {/* <Link className="" href={"/signup"}> */}
              <button className="filter btn ">Filter</button>{" "}
            {/* </Link> */}
          </div>
        </div>
        <RoomListings/>
      </div>
    </Layout>
  );
}
