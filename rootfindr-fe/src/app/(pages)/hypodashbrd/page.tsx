"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
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

export default function HypoDashbrdPage() {
  const router = useRouter(); // Initialize router
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const projectName = searchParams.get("projectName");

  useEffect(() => {
    if (projectName) {
      setCurrentProject(projectName);
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
        `/hypodashbrd?projectName=${encodeURIComponent(selectedProject)}`
      );
      // Reset selected project to null to disable the button and reset placeholder
      setSelectedProject(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimeBgCircle />
      </div>
      <div className="relative flex flex-col items-center justify-center z-10 gap-8">
        <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>
              Project&nbsp;:&nbsp;
              {currentProject ? currentProject : "Loading..."}
            </CardTitle>
            <CardDescription>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                You can switch hypothesis project here
              </blockquote>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor="projects">Change Project</Label> */}
                  <Select
                    onValueChange={setSelectedProject}
                    value={selectedProject || ""}
                  >
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
        <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm]">
          <CardHeader>
            <CardTitle>Evaluation</CardTitle>
            <CardDescription>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                Test your hypothesis by choosing an analytical approach
              </blockquote>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="profiles">Statistical Method</Label>
                  <Select>
                    <SelectTrigger id="profiles">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="dv1">
                        Time-Lagged Cross-Correlation
                      </SelectItem>
                      <SelectItem value="dv2">
                        Granger Causality Test
                      </SelectItem>
                      <SelectItem value="dv3">
                        Event Sequence Analysis (ESA)
                      </SelectItem>
                      <SelectItem value="dv4">
                        Survival Analysis (Time-to-Event Analysis)
                      </SelectItem>
                      <SelectItem value="dv5">
                        Conditional Probability Analysis
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Deploy 🚀</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
