"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
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

export default function HypoAnalyticsPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimeBgCircle />
      </div>
      <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Project&nbsp;:&nbsp;</CardTitle>
          <CardDescription>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              You can switch hypothesis project here
            </blockquote>
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
