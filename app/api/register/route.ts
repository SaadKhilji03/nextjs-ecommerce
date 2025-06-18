import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  if (!email || !password || !username) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return new NextResponse("Email or username already exists", {
      status: 409,
    });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return new NextResponse("User created", { status: 201 });
}
