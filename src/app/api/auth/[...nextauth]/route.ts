import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

// Named export untuk metode POST
export async function POST(request: Request) {
  return NextAuth(authOptions);
}

// Named export untuk metode GET
export async function GET(request: Request) {
  return NextAuth(authOptions);
}
