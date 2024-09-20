/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React from "react";
import logo from "../assets/image.jpg";

const page = () => {
  return (
    <div>
      <div className="w-[500px] h-[450px]">
        <Image alt="image" fill className="w-full h-screen object-cover" src={"/image.jpg"} />
      </div>
    </div>
  );
};

export default page;
