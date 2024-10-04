import { prisma } from "@/lib/db";
import { auth } from "../../../../auth";
import ProfilePageClient from "./ProfilePageClient";
import { Progress } from "@/components/ui/progress";
import { redirect } from "next/navigation";

export interface Admin {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
  hashPassword: string;
}

const page = async () => {
  const session = await auth(); 
  if(!session) return redirect('/auth/signin')

  const data = session?.user;
  
      const admin = await prisma.admin.findUnique({
        where: {
          email: data?.email as string,
        }
      });
      
  console.log("admin :", admin);

  if (!admin || admin == null) return <Progress /> 

  return <ProfilePageClient admin={admin as Admin} />;
};

export default page;
