import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utilities/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { dependentVar, independentVars, projectName, userId } = req.body;

    // Always create new variables (avoid checking for existing ones)
    const dependentVariable = await prisma.variable.create({
      data: {
        name: dependentVar,
        type: "dependent",
      },
    });

    const independentVariable = await prisma.variable.create({
      data: {
        name: independentVars,
        type: "independent",
      },
    });

    // Create the project entry with new variables
    const project = await prisma.project.create({
      data: {
        name: projectName,
        dependentVariableId: dependentVariable.id,
        independentVariableId: independentVariable.id,
        userId: userId,
      },
    });

    res
      .status(201)
      .json({ message: "Hypothesis created successfully", project });
  } catch (error) {
    console.error("Error creating hypothesis:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/utilities/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const { dependentVar, independentVars, projectName, userId } = req.body;

//     // Check if the dependent and independent variables exist, otherwise create them
//     const dependentVariable = await prisma.variable.upsert({
//       where: { name: dependentVar },
//       update: {},
//       create: {
//         name: dependentVar,
//         type: "dependent",
//       },
//     });

//     const independentVariable = await prisma.variable.upsert({
//       where: { name: independentVars },
//       update: {},
//       create: {
//         name: independentVars,
//         type: "independent",
//       },
//     });

//     // Create the project entry
//     const project = await prisma.project.create({
//       data: {
//         name: projectName,
//         dependentVariableId: dependentVariable.id,
//         independentVariableId: independentVariable.id,
//         userId: userId,
//       },
//     });

//     res
//       .status(201)
//       .json({ message: "Hypothesis created successfully", project });
//   } catch (error) {
//     console.error("Error creating hypothesis:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
