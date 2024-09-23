// app/news/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// Import Zod untuk validasi
import { z } from "zod";

// Validator schemas
const newsSchema = z.object({
  title: z.string().min(1),
  tag: z.string().min(1),
  content: z.string().min(1),
  publishedAt: z.string().optional(),
});

// CREATE (POST): Tambah berita baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, tag } = newsSchema.parse(body);

    const news = await prisma.news.create({
      data: {
        title,
        content,
        publishedAt: new Date(),
        authorId: "cm1bkar7w0000v8xfgzrkkxig",
        tagId: tag,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

// READ (GET): Ambil semua berita
export async function GET() {
  try {
    const news = await prisma.news.findMany();
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ message: "coudl not fetch news", status: 500 });
  }
}

// UPDATE (PUT): Perbarui berita berdasarkan ID
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id } = z.object({ id: z.string() }).parse(body);
    const { title, content, publishedAt, tag } = newsSchema.parse(body);

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        content,
        publishedAt: new Date(publishedAt || Date.now()),
        tagId: tag,
      },
    });

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
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
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ message: "News deleted" }, { status: 204 }); // No Content
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
