import React from "react";
import Page from "./page"
import AdminLayout from "../AdminLayout"
export default function Index() {
  return (
    <div>
      <AdminLayout>
      <Page/>
      </AdminLayout>
    </div>
  );
}
