import React, { useEffect, useState } from "react";
import { PostBody } from "../../components";
import Listings from './../api/laravel/Listings';

export default function RoomListings() {

  const [loading, setloading] = useState(false);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    setloading(true);
    const main = new Listings();
    main.TopPropertyListing().then((r) => {
      setloading(false)
      setListings(r?.data?.data);
    }).catch((err) => {
      setloading(false);
      console.log(err);
    });
  }, []);
  return (
    
    <PostBody loading={loading} listings={listings} />
  );
}