import React from "react";
import Layout from "../layout/Layout.js";
import Booking from "./Booking.js";
import AuthLayout from "../layout/AuthLayout.js";
export default function index() {
  return (
    <div>
      <AuthLayout>
        <Booking />
      </AuthLayout>
    </div>
  );
}
