import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// PUT /api/orders/[id]
export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) return NextResponse.json({ message: "ID not provided" }, { status: 400 });

    const body = await req.json();
    if (!body.status) return NextResponse.json({ message: "Status not provided" }, { status: 400 });

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

// DELETE /api/orders/[id]
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) return NextResponse.json({ error: "ID not provided" }, { status: 400 });

    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
