import { Header, SingleListingBody } from "../../components/index.js";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Context } from "../_app.js";
import Layout from "../layout/Layout.js";
import ThingsToKnow from "./ThingsToKnow.js";
import Listings from "../api/laravel/Listings.js";
// {listingData,listingID}
const Listing = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { wishlist, setWishlist } = useContext(Context);
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const[customlink, setCustomlink] =useState("")
  const [record, setrecord] = useState({
    loading: true,
    data: {},
  });
  useEffect(() => {
    if (slug) {
      setLoading(true);
      const main = new Listings();
      main
        .PropertyDetail(slug || "")
        .then((r) => {
          setrecord({
            loading: false,
            data: r?.data?.data,
          });
          setCustomlink(r?.data?.data?.custom_link)
          setLoading(false);
        })
        .catch((err) => {
          setrecord({
            loading: true,
          });
          console.log(err);
          setLoading(false);
        });
    }
  }, [slug]);

  return (
    <>
      <Layout>
        <Head>
          <title>
            House rent in {record?.loading ? "..." : record?.data?.name} -
            Quaintspaces Jaipur
          </title>
        </Head>
        <SingleListingBody loading={loading} listing={record} />
        <ThingsToKnow record={record} />
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

export default Listing;

// export async function getServerSideProps(context) {
//   const { listingID } = context.query;
//   const main = new Listings();
//   const listingData = await main.PropertyDetail(listingID);
//   return {
//     props: {
//       listingData: listingData?.data?.data || null,
//       listingID,
//     },
//   };
// }