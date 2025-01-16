"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
});

export default function HypoForm() {
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dependentVar: "",
      independentVars: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create a Hypothesis</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="myFormId"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="dependentVar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Please specify the dependent variable for which you would
                      like to explore a correlation
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Anxiety" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the target / outcome variable that you would like
                      to investigate
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input placeholder="Coffee" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the predictor / feature variable that you would
                      like to investigate for a potential correlation with the
                      dependent variable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" form="myFormId">
            Investigate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { IHypothesis } from "@/types/type";

// export default function HypoInquiryPage() {
//   return (
//     <>
//       <div>
//         <h1>
//           {/* {hypothesis.length === 0 ? (
//             <p>No hypothesis have been created yet</p>
//           ) : (
//             <p>Click on a hypothesis to view more details</p>
//           )} */}
//         </h1>
//         <h3>Create a Hypothesis</h3>
//         <p>
//           Please input the dependent/target/outcome variable that you would like
//           to investigate
//         </p>
//         <p>
//           Please input independent/predictor/feature variables that you would
//           like to investigate for a potential correlation with the dependent
//           variable
//         </p>
//       </div>
//     </>
//   );
// }
