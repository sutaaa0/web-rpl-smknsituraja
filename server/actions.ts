
import { prisma } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function getNews() {
  try {
    const data = await prisma.news.findMany();

    return {
      data,
      status: 200,
    };
  } catch (error) {
    return { error: error };
  }
}

export const getBerita = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  const berita = data?.data;

  return {
    berita,
    isLoading,
    error,
  }
};

export async function getTags() {
  try {
    const data = await prisma.tag.findMany();
    return {
      data,
      status: 200,
    };
  } catch (error) {
    return { error: error };
  }
}


export async function getUserByEmail(email: string) {
 try {
  const user = await prisma.admin.findUnique({
    where: {
      email
    }
  });

  return user;
 } catch (error) {
  console.log(error);
  return null;
 }
}

export const logInWithCredentials = async (email: string, password: string) => {
  
  const admin = await getUserByEmail(email);

  if(admin) {
    return NextResponse.json({ error: "Admin already exists", status: 400 });
  }

  try {
    await prisma.admin.create({
      data: {
        email,
        hashPassword: password
      }
    });

  } catch (error) {
    console.log(error);
    throw error;
  }

  revalidatePath("/admin/dashboard");
}
