"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
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
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [statsMethods, setStatsMethods] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`/api/internal/projects-num`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    }
    fetchProjects();
    async function fetchStatsMethods() {
      try {
        const response = await fetch(`/api/internal/stats-methods`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setStatsMethods(data.methods);
      } catch (error) {
        console.error("Failed to fetch statistical methods", error);
      }
    }

    fetchStatsMethods();
  }, []);

  const handleDeploy = () => {
    if (!selectedProject || !selectedMethod) {
      alert("Please select both a project and a statistical method.");
      return;
    }

    router.push(
      `/hypoanalytics?project=${encodeURIComponent(
        selectedProject
      )}&method=${encodeURIComponent(selectedMethod)}`
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimeBgCircle />
      </div>
      <div className="relative flex flex-col items-center justify-center z-10 gap-8">
        <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm]">
          <CardHeader>
            <CardTitle>Evaluate a Hypothesis</CardTitle>
            <CardDescription>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                Please choose a project hypothesis to evaluate
              </blockquote>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="projects">Project</Label>
                  <Select
                    onValueChange={setSelectedProject}
                    value={selectedProject || ""}
                  >
                    <SelectTrigger id="projects">
                      <SelectValue placeholder="Select" />
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
            <blockquote className="mt-6 border-l-2 pl-6 italic text-sm text-muted-foreground">
              Test your hypothesis by choosing an analytical approach
            </blockquote>
          </CardContent>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="profiles">Statistical Method</Label>
                  <Select
                    onValueChange={setSelectedMethod}
                    value={selectedMethod || ""}
                  >
                    <SelectTrigger id="profiles">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {statsMethods.length > 0 ? (
                        statsMethods.map((method) => (
                          <SelectItem key={method.id} value={method.name}>
                            {method.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No statistical methods available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleDeploy}>Deploy 🚀</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
