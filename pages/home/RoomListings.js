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
      const data = r?.data?.data;
      console.log()
      let filteredListings = [];
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (item?.status === 1) {
            filteredListings.push(item);
          }
        });
      }

      if (filteredListings.length > 0) {
        setListings(filteredListings);
        console.log(filteredListings);
      } else {
        console.log("No listings match the status and step conditions.");
      }

      setloading(false);
    }).catch((err) => {
      setloading(false);
      console.log(err);
    });
  }, []);
  return (

    <PostBody loading={loading} listings={listings} />
  );
}