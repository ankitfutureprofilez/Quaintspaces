import React, { useEffect, useState } from "react";
import { PostBody } from "../../components";
import axios from "axios";

export default function RoomListings() {
  const [listings, setListings] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    (async () => {
      setListings({ loading: true, data: [] });
      const { data } = await axios("/api/listings");
      setListings({ loading: false, data: data.data });
    })();
  }, []);
  return (
      <PostBody data={listings} />
  );
}
