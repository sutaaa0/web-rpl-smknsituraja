// app/news/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET single news by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
