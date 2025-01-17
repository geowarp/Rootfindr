"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Bganime from "@/components/animation/bganime";
import Hyporecorder from "@/app/(pages)/hyporecorder/page";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  dependentVar: z.string().min(2, {
    message: "It should be a noun1",
  }),
  independentVars: z.string().min(2, {
    message: "It should be a noun2",
  }),
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters",
  }),
});

export default function HypoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dependentVar: "",
      independentVars: "",
      projectName: "",
    },
  });

  // State to store the submitted form data for reuse
  const [storedValues, setStoredValues] = React.useState<{
    dependentVar: string;
    independentVars: string;
    projectName: string;
  } | null>(null);

  // Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setStoredValues(values); // Store form data
    console.log("Form Submitted:", values);
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-cyan-400">
        <Bganime />
      </div>

      {/* Foreground Content */}
      <div className="relative flex flex-grow items-center justify-center z-10">
        <Card className="w-[350px] bg-white/90 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create a Hypothesis</CardTitle>
            <CardDescription>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                Deploy your hypothesis test to explore a correlation between two
                variables in just a few clicks!
              </blockquote>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="hypoFormId"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Dependent Variable */}
                <FormField
                  control={form.control}
                  name="dependentVar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please specify the dependent variable for which you
                        would like to explore a correlation
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Anxiety" {...field} />
                      </FormControl>
                      <FormDescription className="italic">
                        This is the target / outcome variable that you would
                        like to investigate
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Independent Variable(s) */}
                <FormField
                  control={form.control}
                  name="independentVars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please specify an independent variable for which you
                        believe may correlate to the dependent variable
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Coffee" {...field} />
                      </FormControl>
                      <FormDescription className="italic">
                        This is the predictor / feature variable that you would
                        like to investigate for a potential correlation with the
                        dependent variable
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Project Name */}
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please name your project for this hypothesis
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Coffee-Anxiety" {...field} />
                      </FormControl>
                      <FormDescription className="italic">
                        This will allow you to easily switch between different
                        hypothesis tests
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            {storedValues?.dependentVar && (
              <Hyporecorder
                dependentVar={storedValues.dependentVar}
                independentVars={storedValues.independentVars}
                projectName={storedValues.projectName}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit" form="hypoFormId">
              Deploy Test 🚀
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Display Stored Values
      <div className="absolute bottom-10 left-10 bg-white p-4 shadow-md rounded">
        <h2 className="text-lg font-bold">Stored Values:</h2>
        <p>
          <strong>Dependent Variable:</strong>{" "}
          {storedValues?.dependentVar || "Not submitted yet"}
        </p>
        <p>
          <strong>Independent Variable:</strong>{" "}
          {storedValues?.independentVars || "Not submitted yet"}
        </p>
        <p>
          <strong>Project Name:</strong>{" "}
          {storedValues?.projectName || "Not submitted yet"}
        </p>
      </div> */}
    </div>
  );
}
