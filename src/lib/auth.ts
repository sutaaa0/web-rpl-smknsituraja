import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db"; // Sesuaikan path ke Prisma instance Anda

async function authorize(credentials: Record<"email" | "password", string> | undefined) {
  const getAdminByEmail = async (email: string) => {
    const admin = await prisma.admin.findUnique({
      where: {
        email
      }
    });
    return admin;
  };

  if (!credentials) throw new Error("No credentials");
  const { email, password } = credentials;
  const user = await getAdminByEmail(email);

  if (user && (await bcrypt.compare(password, user.hashPassword))) {
    return { id: user.id, name: user.name, email: user.email };
  }
  throw new Error("Invalid credentials");
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  pages: {
    signIn: '/auth/signin', // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.id as string;
      }
      return session;
    },
  },
};
