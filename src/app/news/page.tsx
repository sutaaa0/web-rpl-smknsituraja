"use server";
import React from 'react'
import "@/app/globals.css"
import { prisma } from '@/lib/db';

async function getNews() {
    const data = await prisma.news.findMany();
    return data;
};

const page = async () => {
    const data = await getNews();


    return (
        <div className='container flex justify-center items-center mx-auto h-screen '>
            {data.map((item: any) => (
                <div key={item.id} className="w-full h-full flex justify-center items-center">
                    <h1>{item.title}</h1>
                </div>
            ))}
        </div>
    )
}

export default page