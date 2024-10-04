import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const schemaTag = z.object({
  name: z.string(),
});

export async function GET() {
  try {
    const tags = await prisma.tag.findMany();

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return { error: error };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = schemaTag.parse(body);

    // Check if tag already exists
    const existingTag = await prisma.tag.findFirst({
      where: {
        name,
      },
    });
    if (existingTag) {
      return NextResponse.json(
        { error: "Tag already exists" },
        { status: 400 }
      );
    }

    const newTag = await prisma.tag.create({
      data: { name },
    });

    return NextResponse.json({ data: newTag }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}
