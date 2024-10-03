"use client";

import AdvocatesTable from "@/components/AdvocatesTable";
import Image from "next/image";
import logo from "../../public/logoSolace.svg";

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-4 rounded-3xl h-screen ">
      <Image src={logo} alt="logo" width={150} />
      <div className="pt-3" />
      <AdvocatesTable />
    </main>
  );
}
