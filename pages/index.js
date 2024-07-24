import { useContext, useState } from "react";
import { Header, Posts } from "../components";
import Head from "next/head";
import { Context } from "./_app";
import MainPage from "./home/Page";
import NextNProgress from 'nextjs-progressbar';

const Home = () => {
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const { wishlist, setWishlist } = useContext(Context);

  return (
    <>
    <NextNProgress color="#e55500" />
      <MainPage />
    </>
  );
};

export default Home;
