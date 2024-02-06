import React from "react";
import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("./adminApp"), {
  ssr: false,
});

export default function Admin() {
  return <AdminApp />;
}
