import { prisma } from "@/lib/db";

export async function GET(req: Request, email: string) {
    try{
        const data = await prisma.admin.findUnique({
            where: {
                email
            }
        })

    return data;
    }catch (error) {
        console.log(error);
    }
}