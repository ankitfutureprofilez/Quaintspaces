import React from "react";
import Property from "./Property"
import AdminLayout from "../../AdminLayout";
import Metatag from "../../hook/Metatag"

export default function Index() {
  return (
    <>
    <Metatag/>
    <AdminLayout heading="Add Property" >
        <Property/>
    </AdminLayout>
    </>
  );
}
