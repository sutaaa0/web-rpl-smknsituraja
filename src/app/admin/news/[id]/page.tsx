import { prisma } from "@/lib/db";
import "@/app/globals.css";
import React from 'react'
import "@/app/globals.css"
import DetailsNews from "@/components/DetailsNews";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}


const page: React.FC<NewsDetailPageProps> = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if(!session) return redirect('/auth/signin')

  const getNews = async (id: string) => {
  try {
    const news = prisma.news.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        tag: true,
        author: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    return news;
  } catch (error) {
    throw error;
  }
};

const news = await getNews(params.id);

if (!news) {
  return <div>No news found</div>;
}


  return (
  <div className="flex w-full h-auto px-4 py-12 md:px-12 lg:px-24 xl:px-64 2xl:px-[450px] overflow-y-scroll no-scrollbar">
    {news && <DetailsNews news={news} />}  
  </div>
  
  )
}

export default page