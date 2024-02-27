import React from "react";
import BtnPrimary from "../../components/Button/BtnPrimary";
import { useRouter } from "next/router";
import Link from "next/link";

export default function about() {
  const router = useRouter();
  return (
    <div>
      <h1>This is a about page</h1>
      <Link href="/about/details">
        <BtnPrimary style={{ fontSize: "1rem", width: "fit-content" }}>
          Detail About
        </BtnPrimary>
      </Link>
    </div>
  );
}
