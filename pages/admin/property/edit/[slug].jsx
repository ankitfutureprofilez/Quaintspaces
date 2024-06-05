import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import Property from "../add/Property";

export default function Edit() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState({
    loading: true,
    data: {},
  });

  const fetchProperty = async (slug) => {
    if (slug) {
      setLoading(true);
      const main = new Listing();
      try {
        const response = await main.viewproperty(slug || "");
        setRecord({
          loading: false,
          data: response?.data?.data,
        });
      } catch (err) {
        setRecord({
          loading: true,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProperty(slug);
  }, [slug]);



  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        
        <Property
          fetchProperties={() => fetchProperty(slug)}
          isEdit={true}
          stepdata={false}
          p={record.data}
        />
      )}
    </>
  );
}
