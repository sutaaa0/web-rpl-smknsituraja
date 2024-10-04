"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input-search'
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const pathName = usePathname();

  if (pathName === "/admin/create" || pathName === "/admin/dashboard" || pathName === "/admin/settings" || pathName === "/admin/profile" || pathName === "/admin") {
    return null
  }

  return (
    <div className='container mx-auto flex flex-col md:flex-row justify-between items-start w-full gap-6 sm:gap-12 p-4 sm:p-14 dark:bg-black bg-white text-black dark:text-white text-sm'>
      <div className='flex flex-col justify-center items-start gap-y-6'>
        <div className='flex flex-col justify-center items-start gap-y-3'>
          <Image
            alt='logo'
            src='/logo.png'
            width={60}
            height={60}
            className='object-contain'
          />
          <h1 className='text-xl font-bold'>RPL SMKN SITURAJA</h1>
        </div>
        <div className='flex flex-col gap-y-6'>
          <p className='text-gray-400'>
            Parsinta is an online learning platform intended for web developers. Through series such as Laravel, Reactjs, Vuejs, InertiaJs, HTML, Bootstrap, Tailwind CSS, and more.
          </p>
          <div className='flex gap-x-4'>
            <Instagram className='w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer' />
            <Facebook className='w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer' />
            <Youtube className='w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer' />
            <Twitter className='w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer' />
          </div>
        </div>
      </div>
      <div className='flex w-full gap-6 sm:gap-12'>
        <div className='flex flex-col flex-grow sm:w-[200px] gap-y-6'>
          <h2 className='text-gray-400'>Index</h2>
          <ul className='flex flex-col gap-y-4'>
            <li className='hover:text-gray-300 transition-colors cursor-pointer'>Mata Pelajaran</li>
            <li className='hover:text-gray-300 transition-colors cursor-pointer'>Guru Pengajar</li>
            <li className='hover:text-gray-300 transition-colors cursor-pointer'>Portofolio Siswa</li>
          </ul>
        </div>
        <div className='flex flex-col flex-grow sm:w-[200px] gap-y-6'>
          <h2 className='text-gray-400'>Tambahan</h2>
          <ul className='flex flex-col gap-y-4'>
            <li className='hover:text-gray-300 transition-colors cursor-pointer'>Kegiatan dan Ekstrakulikuler</li>
            <li className='hover:text-gray-300 transition-colors cursor-pointer'>Lowongan Kerja</li>
            <li className='hover:text-gray-300 transition-colors cursor-pointer'>Berita dan Artikel</li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col w-full sm:w-[800px] gap-y-6 mt-6 sm:mt-0'>
        <h2 className='text-gray-400'>Newsletter</h2>
        <p className='text-gray-400'>
          Bergabunglah dengan 23.000+ lainnya dan jangan pernah ketinggalan screencast, tips, tutorial, dan lainnya.
        </p>
        <div className='flex gap-x-3 border border-gray-900 p-2 rounded-full'>
          <Input type="text" placeholder='Email Address' className='border-none' />
          <Button className='rounded-full'>Subscribe</Button>
        </div>
        <p className='text-gray-400'>
          Parsinta is a Trademark of Irsyad A. Panjaitan. © Copyright 2015-2024 Parsinta. All rights reserved. Yes, all of them 000371291.
          All the design stuff's crafted by Just D.
        </p>
      </div>
    </div>
  )
}

export default Footer
