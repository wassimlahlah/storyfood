import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PRODUCT
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // أخذ الجزء الأخير من path
    if (!id) return NextResponse.json({ message: "ID not provided" }, { status: 400 });

    const product = await prisma.product.findUnique({ where: { id } });

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// DELETE SINGLE PRODUCT
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) return NextResponse.json({ message: "ID not provided" }, { status: 400 });

    const session = await getAuthSession();

    if (!session?.user.isAdmin) {
      return NextResponse.json({ message: "You are not allowed!" }, { status: 403 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product has been deleted!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
