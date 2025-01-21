"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import AnimeBgCircle from "@/components/animation/anime-bg-circle";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Hyporecorder() {
  const router = useRouter(); // Initialize router
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [dependentCounter, setDependentCounter] = useState(0);
  const [independentCounter, setIndependentCounter] = useState(0);

  const [dependentVarName, setDependentVarName] = useState<string | null>(null);
  const [independentVarName, setIndependentVarName] = useState<string | null>(
    null
  );

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const projectName = searchParams.get("projectName");

  useEffect(() => {
    if (projectName) {
      setCurrentProject(projectName);

      async function fetchProjectDetails() {
        try {
          // Fetch dependent and independent variables for the selected project
          const response = await fetch(
            `/api/internal/project-details?projectName=${projectName}`
          );
          if (!response.ok) {
            throw new Error(
              `Error fetching project details: ${response.status} ${response.statusText}`
            );
          }
          const projectData = await response.json();

          console.log("Fetched project details:", projectData);

          setDependentVarName(projectData.dependentVar);
          setIndependentVarName(projectData.independentVars);
        } catch (error) {
          console.error("Failed to fetch project details:", error);
        }
      }

      fetchProjectDetails();
    }

    async function fetchProjects() {
      try {
        const response = await fetch(`/api/internal/projects-num`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        console.log("Fetched projects:", data.projects); // Debugging
        const filteredProjects = data.projects.filter(
          (project: Project) => project.name !== projectName
        );

        setProjects(filteredProjects);
        // setProjects(data.projects); // Set state with all projects
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    }

    fetchProjects();
  }, [projectName]); // Dependency added to watch for URL changes

  const handleSelect = () => {
    if (selectedProject) {
      router.push(
        `/hyporecorder?projectName=${encodeURIComponent(selectedProject)}`
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimeBgCircle />
      </div>
      <div className="relative flex flex-col items-center justify-center z-10 gap-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>
              Project&nbsp;:&nbsp;
              {currentProject ? currentProject : "Loading..."}
            </CardTitle>
            <CardDescription>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                You can switch hypothesis projects here
              </blockquote>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor="projects">Change Project</Label> */}
                  <Select onValueChange={setSelectedProject}>
                    <SelectTrigger id="projects">
                      <SelectValue placeholder="Change Project" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {projects.length > 0 ? (
                        projects.map((project: Project) => (
                          <SelectItem key={project.id} value={project.name}>
                            {project.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No other projects
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSelect} disabled={!selectedProject}>
              Select
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Dependent Variable</CardTitle>
            <CardDescription>You are currently experiencing:</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <h1>
                    {dependentVarName
                      ? dependentVarName
                      : "Loading dependent variable..."}
                  </h1>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => setDependentCounter(dependentCounter + 1)}>
              Activate ({dependentCounter})
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Independent Variable(s)</CardTitle>
            <CardDescription>You are currently experiencing:</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <h1>
                    {independentVarName
                      ? independentVarName
                      : "Loading independent variable..."}
                  </h1>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => setIndependentCounter(independentCounter + 1)}
            >
              Activate ({independentCounter})
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Use this label when we are not inside a form
// <Label htmlFor="name">Name</Label>
// <Input id="name" placeholder="Name of your project" />
