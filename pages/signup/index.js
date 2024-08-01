import React from "react";
import Signuppop from "./Signuppop";
import Layout from "../layout/Layout";
import Head from "next/head";
import CheckAuth from "./CheckAuth";
export default function index() {
  return (
    <div>
      <Head>
          <title>Sign up - Quaintspaces Jaipur</title>
        </Head>
      <Signuppop />
      <CheckAuth />
    </div>
  );
}
