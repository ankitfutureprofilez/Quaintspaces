import React, { useState } from "react";
import Layout from "../layout/Layout.js";
import Contact from "./Contact.js";
export default function index() {
  return (
    <div>
      <Layout>
        <Contact/>
      </Layout>
    </div>
  );
}