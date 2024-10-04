// app/news/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface contextProps {
  newsId: string;
  params: any;
}

// GET single news by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {

  try {
    const news = await prisma.news.findUnique({
      where: { id: params.id },
      include: {
        author: true,
        tag: true,
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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    await prisma.news.update({
      where: { id: params.id },
      data: {
        title: body.title,
        descriptions: body.descriptions,
        content: body.content,
        tagId: body.tagId,
      },
    });

    return NextResponse.json(
      { message: "News updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json({ message: "Failed to update news" }, { status: 500 });
  }
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.news.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "News deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting news:", error);

    // Tangani kesalahan jika record tidak ditemukan
    if (error.code === 'P2025') {
      return NextResponse.json({ message: "News record not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Failed to delete news" }, { status: 500 });
  }
}

