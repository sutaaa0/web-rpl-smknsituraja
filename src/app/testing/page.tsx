"use server";
import News from '@/components/News';
import React from 'react'
import { getNews } from '../../../server/actions';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import "@/components/editor.css"


const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  return (
    <div className='container flex justify-center items-center mx-auto h-screen '>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <News />
      </HydrationBoundary>
    </div>
  )
}

export default page