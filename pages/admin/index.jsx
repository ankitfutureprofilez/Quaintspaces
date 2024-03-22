import React from "react";
import Page from "./app/page";
import AuthLayout from "./adminlayout/AuthLayout"

export default function index() {
  return (
    <AuthLayout>
      <Page />
    </AuthLayout>
  );
}
