import React from "react";
import AuthLayout from "../layout/AuthLayout.js";
import Profile from "./Profile.js";

export default function index() {
  return (
    <div>
      <AuthLayout>
        <Profile />
      </AuthLayout>
    </div>
  );
}
