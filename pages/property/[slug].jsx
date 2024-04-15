import { Header, SingleListingBody } from "../../components/index.js";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../components/Footer.jsx";
import axios from "axios";
import { Context } from "../_app.js";
import Wishlist from "../../components/Wishlist.jsx";
import Layout from "../layout/Layout.js";
import ThingsToKnow from "./ThingsToKnow.js";
import Listings from "../api/laravel/Listings.js";
import Heading from "../elements/Heading.js";

const Listing = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { wishlist, setWishlist } = useContext(Context);
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState({
    loading: true,
    data: {},
  });

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    if (slug) {
      setLoading(true);
      setRecord({
        loading: true,
        data: {},
      });
      const main = new Listings();
      main
        .PropertyDetail(slug || "")
        .then((r) => {
          setRecord({
            loading: false,
            data: r?.data?.data,
          });
          setLoading(false);
        })
        .catch((err) => {
          setRecord({
            loading: true,
          });
          console.log(err);
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <>
      <Layout>
        <Head>
          <title>
            House rent in {record?.loading ? "..." : record?.data?.title} -
            Aribnb Clone
          </title>
        </Head>
        {/* <Header
        header="relative"
        width="max-w-[1120px] hidden lg:flex"
        setOverlay={setOverlay}
        selection={selection}
        setSelection={setSelection}
        headerSearch={headerSearch}
        setHeaderSearch={setHeaderSearch}
      /> */}
        <SingleListingBody loading={loading} listing={record} />
        <ThingsToKnow guests={record?.data?.guests} />
        {/* <Footer /> */}
        {overlay && (
          <div
            className="overlayFixed fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-40"
            onClick={() => {
              setSelection(null);
              setOverlay(false);
              setHeaderSearch(false);
            }}
          ></div>
        )}
        {/* {wishlist && <Wishlist setWishlist={setWishlist} />} */}
      </Layout>
    </>
  );
};

export default Listing;
