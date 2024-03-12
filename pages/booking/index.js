import React, { useState } from "react";
import LoginPop from "./LoginPop.js";
import Layout from "../layout/Layout.js";
export default function index() {
  return (
    <div>
      <Layout>
        <LoginPop />
      </Layout>
    </div>
  );
}
