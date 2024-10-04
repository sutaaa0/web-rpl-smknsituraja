/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import React from 'react';
import "@/app/globals.css";
import { prisma } from '@/lib/db';
import News from '@/components/News';

// Buat interface untuk News
interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  publishedAt: Date;
  authorId: string;
  tagId: string;
  createdAt: Date;
  updatedAt: Date;
  tag: Tag;
  author: Author;
}

interface Tag {
  id: string;
  name: string;
}

interface Author {
  id: string;
  email: string;
  name: string | null;
}



// Gunakan newsApi pada page
const page = async () => {
    const data = await prisma.news.findMany({
        include: {
          author: true,
          tag: true,

        }
      });

      console.log(data)
  return (
    <div className='container flex justify-center items-center mx-auto h-screen '>
      {data.map((item: News) => (
        <div key={item.id} className="w-full h-full flex justify-center items-center">
          <News {...item} />
        </div>
      ))}
    </div>
  );
};

export default page;