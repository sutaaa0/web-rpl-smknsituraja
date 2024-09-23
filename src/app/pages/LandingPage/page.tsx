import { LpCorousel } from "@/components/LpCorousel";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import "@/app/globals.css";
import { Cover } from "@/components/ui/cover";
import { InfiniteMovingCardsDemo } from "@/components/MovingCardDemo";
import { CardTes } from "@/components/CardTes";
import { Button } from "@/components/ui/button";
import FormNews from "@/components/FormNews";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full relative dark:bg-black bg-white p-1 sm:p-6">
      <div className="mt-24 sm:mt-0 flex flex-col md:flex-row justify-between items-center w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        <h1 className="text-2xl md:text-5xl font-extrabold text-center md:text-left mb-4 md:mb-0 flex-1">
          Eksplorasi teknologi terdepan dalam Rekayasa Perangkat Lunak. Kembangkan keterampilan dan raih <Cover>kesuksesan di era digital</Cover>
        </h1>
        <div className="flex justify-center items-center w-full md:w-auto">
          <Image src={"/logo.png"} alt="Logo" width={150} height={150} className="object-contain" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center sm:justify-between w-full py-12">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Badge variant="outline" className="py-1 text-[12px] sm:text-sm">
            3 Kelas
          </Badge>
          <Badge variant="outline" className="py-1 text-[12px] sm:text-sm">
            300+ Siswa
          </Badge>
          <Badge variant="outline" className="py-1 text-[12px] sm:text-sm">
            10 Matapelajaran
          </Badge>
        </div>
        <div>
          <Badge variant="outline" className="py-1 text-[12px] sm:text-sm">
            📍Jl. Tanjung Manunggal V, Sukatali, Kec. Situraja
          </Badge>
        </div>
      </div>
      <LpCorousel />
      <div className="w-full flex justify-center items-center flex-col">
        
        <div className="mt-32 sm:mt-44 flex flex-col justify-center items-center gap-y-12 sm:gap-y-28">
          <div className="flex flex-col justify-center items-center gap-y-2 mb-5">
            <h1 className="text-2xl md:text-5xl font-extrabold">Apa Kata Mereka</h1>
            <p className="text-sm md:text-lg text-gray-400 dark:text-gray-300">Cerita dari Alumni dan Siswa RPL</p>
          </div>
          <InfiniteMovingCardsDemo />
        </div>
        <div className="mt-12">
          <Button>Helo</Button>
          <FormNews/>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
