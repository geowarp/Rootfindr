"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Bganime from "@/components/animation/bganime";

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

// export default function HypoForm() {
//   // ...
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       dependentVar: "",
//       independentVars: "",
//     },
//   });

//   // Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }
//   // bg-layered-waves bg-cover bg-no-repeat bg-center
//   return (
//     <>
//       <div className="absolute inset-0 -z-10">
//         <Bganime />
//       </div>

//       <div className="flex min-h-screen items-center justify-center">
//         <Card className="w-[350px]">
//           <CardHeader>
//             <CardTitle className="">Create a Hypothesis</CardTitle>
//             <CardDescription>
//               <blockquote className="mt-6 border-l-2 pl-6 italic">
//                 Deploy your hypothesis test to explore a correlation between two
//                 variables in just a few clicks!
//               </blockquote>
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 id="hypoFormId"
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-8"
//               >
//                 <FormField
//                   control={form.control}
//                   name="dependentVar"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Please specify the dependent variable for which you
//                         would like to explore a correlation
//                       </FormLabel>
//                       <FormControl>
//                         <Input placeholder="e.g. Anxiety" {...field} />
//                       </FormControl>
//                       <FormDescription className="italic">
//                         This is the target / outcome variable that you would
//                         like to investigate
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="independentVars"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Please specify an independent variable for which you
//                         believe may correlate to the dependent variable
//                       </FormLabel>
//                       <FormControl>
//                         <Input placeholder="e.g. Coffee" {...field} />
//                       </FormControl>
//                       <FormDescription className="italic">
//                         This is the predictor / feature variable that you would
//                         like to investigate for a potential correlation with the
//                         dependent variable
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </form>
//             </Form>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button
//               variant="outline"
//               type="button"
//               onClick={() => form.reset()}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" form="hypoFormId">
//               Deploy Test 🚀
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   );
// }
export default function HypoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dependentVar: "",
      independentVars: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              </form>
            </Form>
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
    </div>
  );
}
