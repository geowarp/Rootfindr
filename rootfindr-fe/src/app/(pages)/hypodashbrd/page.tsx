"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Hypothesis Recorder</CardTitle>
          <CardDescription>
            Choose your profile to continue your investigation
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
                    <SelectItem value="dv1">Profile #1</SelectItem>
                    <SelectItem value="dv2">Profile #2</SelectItem>
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
      ;
    </>
  );
}
