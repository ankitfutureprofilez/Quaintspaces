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
  const { wishlist, setWishlist } = useContext(Context);
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const[loading,setLoading]=useState(true);
  const [listing, setListing
  ] = useState({
    loading: true,
    data: {},
  });
  
  // useEffect(() => {
  //   setloading(true);
  //     const main = new Listings();
  //     main.PropertyListing().then((r)=>{
  //       setloading(false)
  //       setListings(r.data.data);
  //     }).catch((err)=>{
  //       setloading(false);
  //       console.log(err);
  //     });
  // }, [router.query]);

  useEffect(() => {
    if (router.query.slug) {
      setListing({
        loading: true,
        data: {},
      });
      (async () => {
        const main = new Listings();
      main.PropertyDetail(router.query.slug).then((r)=>{
        // console.log("Data",r.data.data);
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
        // const { data } = await axios(`/api/listings/${router.query.slug}`);
        // if (data.success) {
        //   setListing({
        //     loading: false,
        //     data: data.data[2],
        //   });
        //   console.log("listing",listing.data);
        // }
      })();
    }
  }, [router.query]);

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
