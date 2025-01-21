import prisma from "@/utilities/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectName = searchParams.get("projectName");

    if (!projectName) {
      return Response.json(
        { error: "Missing projectName parameter" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { name: projectName },
      include: {
        dependentVariable: true,
        independentVariable: true,
      },
    });

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({
      dependentVar: project.dependentVariable.name,
      independentVars: project.independentVariable.name,
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
