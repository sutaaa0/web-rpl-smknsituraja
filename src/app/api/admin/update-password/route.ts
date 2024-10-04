import { saltAndHashPassword } from "@/app/utils/helper";
import { prisma } from "@/lib/db";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request) => {
    try {
        const { password } = await request.json();
        const hashPassword = saltAndHashPassword(password);
        const session = await auth();
        const admin = session?.user;

        const updateAdmin = await prisma.admin.update({
            where: {
                email: admin?.email as string
            },
            data :{
                hashPassword
            }
        });

        return NextResponse.json(updateAdmin, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}