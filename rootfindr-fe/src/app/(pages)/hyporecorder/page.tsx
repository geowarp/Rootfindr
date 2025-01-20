"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AnimeBgCircle from "@/components/animation/anime-bg-circle";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HyporecorderProps = {
  dependentVar: string;
  independentVars: string;
};

export default function Hyporecorder({
  dependentVar,
  independentVars,
}: HyporecorderProps) {
  const [dependentCounter, setDependentCounter] = useState(0);
  const [independentCounter, setIndependentCounter] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimeBgCircle />
      </div>
      <div className="relative flex flex-col items-center justify-center z-10 gap-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Dependent Variable</CardTitle>
            <CardDescription>You are currently experiencing:</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <h1>{dependentVar}</h1>
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
                  <h1>{independentVars}</h1>
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
