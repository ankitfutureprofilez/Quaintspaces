import { useContext, useState } from "react";
import { Header, Posts } from "../components";
import Head from "next/head";
import { Context } from "./_app";
import MainPage from "./home/Page";

const Home = () => {
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const { wishlist, setWishlist } = useContext(Context);

  return (
    <>
      <MainPage />
    </>
  );
};

export default Home;
