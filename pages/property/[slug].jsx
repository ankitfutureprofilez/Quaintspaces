import { useState, useEffect } from "react";
import { useRouter } from "next/router.js";
import { Header, SingleListingBody } from "../../components/index.js";
import Head from "next/head";
import Footer from "../../components/Footer.jsx";
import axios from "axios";
import { Context } from "../_app.js";
import Wishlist from "../../components/Wishlist.jsx";
import Layout from "../layout/Layout.js";
import ThingsToKnow from "./ThingsToKnow.js";
import Listings from "../api/laravel/Listings.js";
import Heading from "../elements/Heading.js";

const Listing = (props) => {
  const { record, failed } = props;
  console.log("props",props)
  const router = useRouter();
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);

  useEffect(() => {
    if (!record && !failed) {
      fetchData();
    }
  }, []);

  const [fetchedRecord, setFetchedRecord] = useState(record);
  const [fetchFailed, setFetchFailed] = useState(failed);

  const fetchData = async () => {
    try {
      const main = new Listings();
      const response = await main.PropertyDetail(router.query.slug || "");
      setFetchedRecord({
        loading: false,
        data: response?.data?.data || {},
      });
    } catch (error) {
      console.error("Error fetching property detail:", error);
      setFetchFailed(error.message);
    }
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{fetchedRecord?.loading ? "..." : fetchedRecord?.data?.name}</title>
        </Head>
        <SingleListingBody loading={fetchedRecord?.loading} listing={fetchedRecord} />
        <ThingsToKnow guests={fetchedRecord?.data?.guests} />
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
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const main = new Listings();
  const response = main.PropertyDetail(slug || "");
  const data = response.then((res)=>{
    let record = {
      loading: false,
      data: res?.data?.data || {},
    };
    return {
      props: {
        props_status :true,
        entries : record
      },
    };

  }).catch(()=>{
    return {
      props: {
        props_status :false,
        entries : null
      },
    }
  });
  return data
}

export default Listing;
