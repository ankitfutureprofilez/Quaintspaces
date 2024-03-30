import React from "react";
import Property from "./Property"
import AdminLayout from "../../AdminLayout";

export default function Index() {
  return (
    <AdminLayout heading="Add Property" >
        <Property/>
    </AdminLayout>
  );
}
