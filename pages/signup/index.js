import React from "react";
import Signuppop from "./Signuppop";
import Layout from "../layout/Layout";
import Head from "next/head";
export default function index() {
  return (
    <div>
      <Head>
          <title>Sign up - QS Jaipur</title>
        </Head>
      <Signuppop />
    </div>
  );
}
