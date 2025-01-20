import prisma from "@/utilities/prisma";

export async function POST(request: Request) {
  try {
    // Parse JSON request body
    const body = await request.json();
    const { dependentVar, independentVars, projectName, userId } = body;

    // Validate required fields
    if (!dependentVar || !independentVars || !projectName || !userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure that the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return Response.json(
        { error: "User not found. Please provide a valid user." },
        { status: 404 }
      );
    }

    // Check if the project name already exists
    const existingProject = await prisma.project.findUnique({
      where: { name: projectName },
    });

    if (existingProject) {
      return Response.json(
        { error: "Project with this name already exists" },
        { status: 409 }
      );
    }

    // Create dependent variable
    const dependentVariable = await prisma.variable.create({
      data: {
        name: dependentVar,
        type: "dependent",
      },
    });

    // Create independent variable
    const independentVariable = await prisma.variable.create({
      data: {
        name: independentVars,
        type: "independent",
      },
    });

    // Create the project entry with the newly created variables
    const newProject = await prisma.project.create({
      data: {
        name: projectName,
        dependentVariableId: dependentVariable.id,
        independentVariableId: independentVariable.id,
        userId: userId,
      },
    });

    // use the following to inspect the received data receivedData: {},
    return Response.json(
      { message: "Project created successfully", project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
    // return Response.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}
