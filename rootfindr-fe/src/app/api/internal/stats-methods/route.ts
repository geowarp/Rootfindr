import { NextResponse } from "next/server";
import prisma from "@/utilities/prisma";

export async function GET() {
  try {
    const methods = await prisma.statisticalMethod.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json({ methods }, { status: 200 });
  } catch (error) {
    console.error("Error fetching statistical methods:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
