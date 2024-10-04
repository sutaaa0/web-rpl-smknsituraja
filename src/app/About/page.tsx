/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React from "react";
import logo from "../assets/image.jpg";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="w-[500px] h-[450px]">
        <h1>About</h1>
        <Link href={"/admin/dashboard"}>go to admin</Link>
      </div>
    </div>
  );
};

export default page;
