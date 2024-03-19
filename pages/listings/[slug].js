import { Header, SingleListingBody } from "../../components";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import axios from "axios";
import { Context } from "../_app";
import Wishlist from "../../components/Wishlist";
import Layout from "../layout/Layout";
import ThingsToKnow from "./ThingsToKnow";
import Listings from "../LaravelApi/Listings";

const Listing = () => {
  const router = useRouter();
  const {slug}= router.query;
  const { wishlist, setWishlist } = useContext(Context);
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const[loading,setLoading]=useState(true);
  const [listing, setListing] = useState({
    loading: true,
    data: {},
  });
  
  useEffect(() => {
    if (slug) {
      setListing({
        loading: true,
        data: {},
      });
      const main = new Listings();
      main.PropertyDetail(slug || "").then((r)=>{
          setListing({
            loading: false,
            data: r.data.data,    
          });
      }).catch((err)=>{
        setListing({
          loading: true,
        });
        console.log(err);
      });
    }
  }, [slug]);

  return (
    <>
    <Layout>
      <Head>
        <title>
          House rent in {listing.loading ? "..." : listing.data?.title} - Aribnb
          Clone
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
      <SingleListingBody listing={listing} />
      <ThingsToKnow/>
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
