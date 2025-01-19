"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
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

type HypoDashbrdPageProps = {
  projectName: string;
};

export default function HypoDashbrdPage({ projectName }: HypoDashbrdPageProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimeBgCircle />
      </div>
      <div className="relative flex flex-grow items-center justify-center z-10">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Hypothesis Repo(s)</CardTitle>
            <CardDescription>
              Select your project to view more details about it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="profiles">{projectName}</Label>
                  <Select>
                    <SelectTrigger id="profiles">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="dv1">Project #1</SelectItem>
                      <SelectItem value="dv2">Project #2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Select</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
