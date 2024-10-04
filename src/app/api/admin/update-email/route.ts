import { request } from "http";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { email } = await request.json();
    const session = await auth();
    const admin = session?.user;

    const updateAdmin = await prisma.admin.update({
      where: {
        email: admin?.email as string,
      },
      data: {
        email,
      },
    });

    return NextResponse.json(updateAdmin, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
