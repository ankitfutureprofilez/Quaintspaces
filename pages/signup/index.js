import React from "react";
import Signuppop from "./Signuppop";
import Popup from "../elements/Popup";
import Layout from "../layout/Layout";
export default function index() {
  return (
    <div>
      {/* <Popup contentComponent={<Signuppop/>}/> */}
      <Layout>
      <Signuppop />
      </Layout>
    </div>
  );
}
