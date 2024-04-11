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
import { useState } from "react";
import { useRouter } from "next/router.js";

const Listing = ({ record , failed}) => {
  const router=useRouter();
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  return (
    <>
      <Layout>
        <Head>
          <title>
           {record?.loading ? "..." : record?.data?.name}
          </title>
        </Head>
        <SingleListingBody loading={record?.loading} listing={record} />
        <ThingsToKnow guests={record?.data?.guests}/>
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
  let failed=null;
  let record = {
    loading: true,
    data: {},
  };
  try {
    const main = new Listings();
    const response = await main.PropertyDetail(slug || "");
    record = {
      loading: false,
      data: response?.data?.data || {},
    };
  } catch (error) {
    console.error("Error fetching property detail:", error);
    failed=error.message;
  }

  return {
    props: {
      record,failed
    },
  };
}

export default Listing;
