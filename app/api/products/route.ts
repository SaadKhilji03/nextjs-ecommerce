// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("[GET_PRODUCTS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const body = await req.json();
    const { name, price, image, description } = body;

    if (!name || typeof price !== "number" || !description) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        image,
        description,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("[CREATE_PRODUCT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
