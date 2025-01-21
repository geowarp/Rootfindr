import prisma from "@/utilities/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    // const userId = url.searchParams.get("userId");

    const projects = await prisma.project.findMany({
      where: {
        userId: 1,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
