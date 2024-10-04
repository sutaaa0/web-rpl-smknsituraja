// app/news/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// Import Zod untuk validasi
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "../../../../auth";

// Validator schemas
const newsSchema = z.object({
  title: z.string().min(1),
  descriptions: z.string().min(5).max(200),
  tag: z.string().min(1),
  content: z.string().min(1),
  publishedAt: z.string().optional(),
});

// CREATE (POST): Tambah berita baru
export async function POST(req: Request) {

  const session = await auth();
  const authorId = session?.user?.id;

  try {
    const body = await req.json();
    const { title, descriptions, content, tag } = newsSchema.parse(body);

    const news = await prisma.news.create({
      data: {
        title,
        content,
        descriptions,
        publishedAt: new Date(),
        authorId,
        tagId: tag,
      } as unknown as Prisma.NewsCreateInput, // Add this type cast
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
    const news = await prisma.news.findMany({
      include: {
        author: true,
        tag: true,
      },
    });
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
        ...{ tagId: tag },
      } as Prisma.NewsUncheckedUpdateInput,
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
