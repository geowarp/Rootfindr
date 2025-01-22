import { NextResponse } from "next/server";
import prisma from "@/utilities/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectName = searchParams.get("project");
    const method = searchParams.get("method");

    if (!projectName || !method) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Find the project by name
    const project = await prisma.project.findUnique({
      where: { name: projectName },
      include: {
        dependentVariable: true,
        independentVariable: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Count events for the dependent and independent variables
    const dependentEventsCount = await prisma.variableEvent.count({
      where: {
        projectId: project.id,
        variableId: project.dependentVariableId,
      },
    });

    const independentEventsCount = await prisma.variableEvent.count({
      where: {
        projectId: project.id,
        variableId: project.independentVariableId,
      },
    });

    return NextResponse.json({
      project: projectName,
      method,
      dependentEvents: dependentEventsCount,
      independentEvents: independentEventsCount,
    });
  } catch (error) {
    console.error("Error fetching variable events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
