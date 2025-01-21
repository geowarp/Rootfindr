import prisma from "@/utilities/prisma";

export async function POST(request: Request) {
  try {
    const { projectId, variableId, userId } = await request.json();

    if (!projectId || !variableId || !userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new VariableEvent entry
    const event = await prisma.variableEvent.create({
      data: {
        projectId: Number(projectId),
        variableId: Number(variableId),
        userId: Number(userId),
      },
    });

    return Response.json(
      { message: "Variable event logged successfully", event },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error logging variable event:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
