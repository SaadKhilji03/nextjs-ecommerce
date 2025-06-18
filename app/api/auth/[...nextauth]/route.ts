import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"; // use bcryptjs for Next.js compatibility
import { prisma } from "@/lib/db";

type ExtendedUser = {
  id: string;
  email: string;
  role: string;
  username: string;
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No user found");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as ExtendedUser;
        token.id = u.id;
        token.role = u.role;
        token.username = u.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
