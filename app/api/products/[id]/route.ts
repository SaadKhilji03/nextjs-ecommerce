import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET product by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("[GET_PRODUCT_BY_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT (update product)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { name, price, image } = await req.json();

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: { name, price, image },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[UPDATE_PRODUCT]", error);
    return new NextResponse("Failed to update product", { status: 500 });
  }
}

// DELETE product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await prisma.product.delete({ where: { id } });
    return new NextResponse("Product deleted", { status: 200 });
  } catch (error) {
    console.error("[DELETE_PRODUCT]", error);
    return new NextResponse("Failed to delete product", { status: 500 });
  }
}
