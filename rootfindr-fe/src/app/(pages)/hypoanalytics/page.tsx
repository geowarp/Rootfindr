"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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

export default function HypoAnalyticsPage() {
  const searchParams = useSearchParams();
  const projectName = decodeURIComponent(
    searchParams.get("project") || "Unknown Project"
  );
  const statsMethod = decodeURIComponent(
    searchParams.get("method") || "Unknown Method"
  );

  const [dependentVar, setDependentVar] = useState<string | null>(null);
  const [independentVar, setIndependentVar] = useState<string | null>(null);
  const [tlccResults, setTlccResults] = useState<Record<number, number> | null>(
    null
  );
  const [analysisMessage, setAnalysisMessage] = useState<string>(
    "Loading analysis..."
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProjectDetails() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/internal/project-details?projectName=${encodeURIComponent(
            projectName
          )}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        setDependentVar(
          data.dependentVar?.name || "Unknown Dependent Variable"
        );
        setIndependentVar(
          data.independentVars?.name || "Unknown Independent Variable"
        );
      } catch (error) {
        console.error("Failed to fetch project details", error);
        setAnalysisMessage("Failed to fetch project details.");
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchTLCCAnalysis() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/internal/tlcc-calc?projectName=${encodeURIComponent(
            projectName
          )}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        if (data.error) {
          setAnalysisMessage(data.error);
        } else {
          setTlccResults(data.results);
          setAnalysisMessage(data.interpretation);
        }
      } catch (error) {
        console.error("Failed to fetch TLCC analysis", error);
        setAnalysisMessage("Error analyzing correlation. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (projectName !== "Unknown Project") {
      fetchProjectDetails();
      fetchTLCCAnalysis();
    }
  }, [projectName]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimeBgCircle />
      </div>
      <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              You can view the details of the analysis here
            </blockquote>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Project: {projectName}</p>
          <p className="text-lg font-semibold">
            Dependent Variable: {dependentVar || "Loading..."}
          </p>
          <p className="text-lg font-semibold">
            Independent Variable: {independentVar || "Loading..."}
          </p>
          <p className="text-lg font-semibold">Method: {statsMethod}</p>

          {isLoading ? (
            <p>Loading TLCC analysis...</p>
          ) : (
            <>
              <p className="mt-4 font-semibold text-green-700">
                {analysisMessage}
              </p>
              {tlccResults && (
                <ul className="mt-2">
                  {Object.entries(tlccResults).map(([lag, count]) => (
                    <li key={lag}>
                      Lag: {lag} seconds → Count: {count}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => window.location.reload()} className="w-full">
            Refresh Analysis
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
