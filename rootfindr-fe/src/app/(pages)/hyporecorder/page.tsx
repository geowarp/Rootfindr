// "use client";
// import React from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// export default function Hyporecorder() {
//   return (
//     <div>
//       <h1>Hyporecorder</h1>
//       <DotLottieReact
//         src="https://lottie.host/e1ec47e3-8200-468f-8859-8e610f02233c/yrR8D1pxLq.lottie"
//         loop
//         autoplay
//       />
//     </div>
//   );
// }

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Hyporecorder() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
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
                  <Label htmlFor="profiles">Current Profile</Label>
                  <Select>
                    <SelectTrigger id="profiles">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="dv1">Headache</SelectItem>
                      <SelectItem value="dv2">Anxiety</SelectItem>
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
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Dependent Variable</CardTitle>
            <CardDescription>You are currently experiencing:</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <h1>Anxiety</h1>
                  {/* <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" /> */}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Activate</Button>
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
                  <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">
                                  {/* {index + 1} */}
                                  <h1>Coffee</h1>
                                </span>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  {/* <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" /> */}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Activate</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
