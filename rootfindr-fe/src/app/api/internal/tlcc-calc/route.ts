import prisma from "@/utilities/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectName = searchParams.get("projectName");

    if (!projectName) {
      return new Response(
        JSON.stringify({ error: "Missing projectName parameter" }),
        { status: 400 }
      );
    }

    // Fetch project details from the database
    const project = await prisma.project.findUnique({
      where: { name: projectName },
      include: {
        dependentVariable: true,
        independentVariable: true,
      },
    });

    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }

    // Retrieve timestamps of events for dependent and independent variables
    const dependentEvents = await prisma.variableEvent.findMany({
      where: { projectId: project.id, variableId: project.dependentVariableId },
      orderBy: { timestamp: "asc" },
    });

    const independentEvents = await prisma.variableEvent.findMany({
      where: {
        projectId: project.id,
        variableId: project.independentVariableId,
      },
      orderBy: { timestamp: "asc" },
    });

    if (dependentEvents.length === 0 || independentEvents.length === 0) {
      return new Response(
        JSON.stringify({ error: "Not enough event data for analysis" }),
        { status: 400 }
      );
    }

    // Convert timestamps to arrays of numbers (milliseconds to seconds)
    const dependentTimestamps = dependentEvents.map((event) =>
      Math.floor(new Date(event.timestamp).getTime() / 1000)
    );
    const independentTimestamps = independentEvents.map((event) =>
      Math.floor(new Date(event.timestamp).getTime() / 1000)
    );

    // Perform simple cross-correlation analysis in JavaScript
    const resultsMap: Record<number, number> = {};

    for (let i = 0; i < dependentTimestamps.length; i++) {
      for (let j = 0; j < independentTimestamps.length; j++) {
        const lag = dependentTimestamps[i] - independentTimestamps[j];
        resultsMap[lag] = (resultsMap[lag] || 0) + 1;
      }
    }

    // Interpret the correlation result
    let maxCorrelation = 0;
    let maxLagValue = 0;

    for (const [lag, count] of Object.entries(resultsMap)) {
      if (count > maxCorrelation) {
        maxCorrelation = count;
        maxLagValue = parseInt(lag);
      }
    }

    let interpretation = "";
    if (maxCorrelation > 50) {
      interpretation = `The independent variable appears to significantly influence the dependent variable with a peak correlation at a lag of ${maxLagValue} seconds.`;
    } else {
      interpretation = `There is no strong correlation detected between the independent and dependent variables.`;
    }

    // Store the analysis result in the database
    const savedTest = await prisma.hypothesisTest.create({
      data: {
        projectId: project.id,
        statisticalMethodId: 1, // Replace with the correct method ID for TLCC
        result: JSON.stringify({ resultsMap, interpretation }),
      },
    });

    console.log(resultsMap);
    return new Response(
      JSON.stringify({
        message: `TLCC analysis completed for project "${projectName}".`,
        interpretation,
        maxLag: maxLagValue,
        maxCorrelation,
        results: resultsMap,
        testId: savedTest.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing TLCC analysis:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
