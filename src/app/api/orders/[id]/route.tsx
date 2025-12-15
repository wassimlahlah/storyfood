import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// PUT method
export async function PUT(req: NextRequest) {
  try {
    // استخراج id من URL مباشرة
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // يأخذ الجزء الأخير من path
    if (!id) return NextResponse.json({ message: "ID not provided" }, { status: 400 });

    const body = await req.json();

    await prisma.order.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json({ message: "Order has been updated!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

// DELETE method
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) return NextResponse.json({ error: "ID not provided" }, { status: 400 });

    await prisma.order.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
