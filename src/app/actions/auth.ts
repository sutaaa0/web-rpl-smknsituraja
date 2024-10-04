"use server";
import { prisma } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { signIn, signOut } from "../../../auth";
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

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
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return  { status: 200 };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Invalid email or password", status: 401 };
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};
