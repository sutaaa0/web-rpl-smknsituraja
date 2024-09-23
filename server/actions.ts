
import { prisma } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { NextResponse } from "next/server";

export async function getNews() {
  try {
    const data = await prisma.news.findMany();

    return {
      data,
      status: 200,
    };
  } catch (error) {
    return { error: error };
  }
}

export const getBerita = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  const berita = data?.data;

  return {
    berita,
    isLoading,
    error,
  }
};

export async function getTags() {
  try {
    const data = await prisma.tag.findMany();
    return {
      data,
      status: 200,
    };
  } catch (error) {
    return { error: error };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, publishedAt } = body;

    const news = await prisma.news.create({
      data: {
        title,
        content,
        publishedAt: new Date(publishedAt),
        authorId: "2233223322",
        tagId: "1222122",
      },
    });
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
