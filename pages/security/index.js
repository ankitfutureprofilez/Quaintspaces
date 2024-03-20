import React from "react";
import Layout from "../layout/Layout";
import Security from "./Security";
import AuthLayout from "../layout/AuthLayout";
export default function index() {
  return (
    <div>
      <AuthLayout>
      <Security />
      </AuthLayout>
    </div>
  );
}
