"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
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

export default function HypoRecorderPage() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [dependentCounters, setDependentCounters] = useState<{
    [key: string]: number[];
  }>({});
  const [independentCounters, setIndependentCounters] = useState<{
    [key: string]: number[];
  }>({});

  const [dependentVarName, setDependentVarName] = useState<string | null>(null);
  const [independentVarName, setIndependentVarName] = useState<string | null>(
    null
  );

  const [projects, setProjects] = useState<Project[]>([]);
  const [dependentVarId, setDependentVarId] = useState<string | null>(null);
  const [independentVarId, setIndependentVarId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [statsMethods, setStatsMethods] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

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
          console.log("API Response:", projectData);

          setProjectId(projectData?.projectId || null);
          setDependentVarId(projectData?.dependentVar?.id || null);
          setIndependentVarId(projectData?.independentVars?.id || null);
          setDependentVarName(projectData.dependentVar?.name || "Unknown");
          setIndependentVarName(projectData.independentVars?.name || "Unknown");
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

    async function fetchVariableEventCounts() {
      if (!projectName) return;

      try {
        const response = await fetch(
          `/api/internal/variable-events?projectName=${encodeURIComponent(
            projectName
          )}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching event counts: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setDependentCounters((prev) => ({
          ...prev,
          [projectName]: new Array(data.dependentEvents).fill(1),
        }));

        setIndependentCounters((prev) => ({
          ...prev,
          [projectName]: new Array(data.independentEvents).fill(1),
        }));
      } catch (error) {
        console.error("Failed to fetch variable event counts:", error);
      }
    }
    fetchVariableEventCounts();
  }, [projectName]); // Dependency added to watch for URL changes

  const handleSelect = () => {
    if (selectedProject) {
      router.push(
        `/hyporecorder?projectName=${encodeURIComponent(selectedProject)}`
      );
      // Reset selected project to null to disable the button and reset placeholder
      setSelectedProject(null);
    }
  };

  const handleDeploy = () => {
    if (!currentProject) {
      alert("No project selected. Please try again.");
      return;
    }

    if (!selectedMethod) {
      alert("Please select a statistical method.");
      return;
    }

    router.push(
      `/hypoanalytics?project=${encodeURIComponent(
        currentProject
      )}&method=${encodeURIComponent(selectedMethod)}`
    );
  };

  const logVariableEvent = async (
    variableType: "dependent" | "independent"
  ) => {
    console.log("Logging event for:", variableType);
    console.log("Project ID:", projectId);
    console.log("Dependent Var ID:", dependentVarId);
    console.log("Independent Var ID:", independentVarId);
    if (currentProject) {
      try {
        const variableId =
          variableType === "dependent" ? dependentVarId : independentVarId;

        if (!variableId || !projectId) {
          throw new Error("Variable ID or Project ID is missing");
        }

        const response = await fetch("/api/internal/log-variable-event", {
          method: "POST",
          body: JSON.stringify({
            projectId: projectId,
            variableId: variableId,
            userId: 1, // Replace with actual user ID
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to log variable event");

        const result = await response.json();
        console.log("Event logged:", result);

        // Update local state to reflect the new event count
        if (variableType === "dependent") {
          setDependentCounters((prev) => ({
            ...prev,
            [currentProject]: [...(prev[currentProject] || []), Date.now()],
          }));
        } else {
          setIndependentCounters((prev) => ({
            ...prev,
            [currentProject]: [...(prev[currentProject] || []), Date.now()],
          }));
        }
      } catch (error) {
        console.error("Error logging event:", error);
      }
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
            <div className="flex items-center justify-between">
              <CardTitle>
                Project: {currentProject ? currentProject : "Loading..."}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 bg-slate-300"
                onClick={() => router.push("/hypoinquiry/1")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Select
                    onValueChange={(value) => {
                      setSelectedProject(value);
                      router.push(
                        `/hyporecorder?projectName=${encodeURIComponent(value)}`
                      );
                    }}
                    value={selectedProject || ""}
                  >
                    <SelectTrigger id="projects">
                      <SelectValue
                        placeholder={currentProject || "Select Project"}
                      />
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
            {/* <Button onClick={handleSelect} disabled={!selectedProject}>
              Select
            </Button> */}
          </CardFooter>
        </Card>
        <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm">
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
            <Button onClick={() => logVariableEvent("dependent")}>
              Activate Dependent (
              {currentProject
                ? dependentCounters[currentProject]?.length || 0
                : 0}
              )
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm">
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
            <Button onClick={() => logVariableEvent("independent")}>
              Activate Independent (
              {currentProject
                ? independentCounters[currentProject]?.length || 0
                : 0}
              )
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm]">
          <CardHeader>
            <CardTitle>Evaluate</CardTitle>
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
