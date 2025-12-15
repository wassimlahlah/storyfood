import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const body = await req.json();
    await prisma.order.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json({ message: "Order has been updated!" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}