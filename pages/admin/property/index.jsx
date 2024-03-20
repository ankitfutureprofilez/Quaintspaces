import React from "react";
import Layout from "../layout"
import Property from "./Property"
import AuthLayout from "../../layout/AuthLayout";

export default function Index() {
  return (
    <div>
      
      <AuthLayout>
      <Property/>
      </AuthLayout>
    </div>    
  );
}
