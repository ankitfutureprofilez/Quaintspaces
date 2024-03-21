import React from "react";
import Property from "./Property"
import AuthLayout from "../../adminlayout/AuthLayout";
import Layout from "../../layout";

export default function Index() {
  return (
    <div>
      <AuthLayout>
        <Layout>
      <Property/>
      </Layout>
      </AuthLayout>
    </div>    
  );
}
