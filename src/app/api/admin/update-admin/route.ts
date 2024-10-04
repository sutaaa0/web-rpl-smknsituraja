import { prisma } from "@/lib/db";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { name } = await request.json();
    const session = await auth();
    const admin = session?.user;

    const updateAdmin = await prisma.admin.update({
      where: {
        email: admin?.email as string,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updateAdmin, { status: 200 });
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
