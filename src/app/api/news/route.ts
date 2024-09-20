// app/news/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// CREATE (POST): Tambah berita baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, publishedAt, authorId, tags } = body;

    const news = await prisma.news.create({
      data: {
        title,
        content,
        publishedAt: new Date(publishedAt),
        authorId,
        tags,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}

// READ (GET): Ambil semua berita
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: {
        author: true,
      },
    });

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// UPDATE (PUT): Perbarui berita berdasarkan ID
// app/news/route.ts
export async function PUT(req: Request) {
    try {
      const body = await req.json();
      const { id, title, content, publishedAt, tags } = body;
      console.log(body)
  
      const updatedNews = await prisma.news.update({
        where: { id },
        data: {
          title,
          content,
          publishedAt: new Date(publishedAt),
          tags,
        },
      });
  
      return NextResponse.json(updatedNews, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
    }
  }
  
// DELETE: Hapus berita berdasarkan ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ message: "News deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}
