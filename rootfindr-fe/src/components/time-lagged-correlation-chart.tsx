"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for time-lagged cross-correlation
const correlationData = [
  { lag: -10, correlation: -0.1 },
  { lag: -9, correlation: -0.05 },
  { lag: -8, correlation: 0 },
  { lag: -7, correlation: 0.1 },
  { lag: -6, correlation: 0.2 },
  { lag: -5, correlation: 0.3 },
  { lag: -4, correlation: 0.4 },
  { lag: -3, correlation: 0.5 },
  { lag: -2, correlation: 0.7 },
  { lag: -1, correlation: 0.9 },
  { lag: 0, correlation: 1 },
  { lag: 1, correlation: 0.9 },
  { lag: 2, correlation: 0.7 },
  { lag: 3, correlation: 0.5 },
  { lag: 4, correlation: 0.4 },
  { lag: 5, correlation: 0.3 },
  { lag: 6, correlation: 0.2 },
  { lag: 7, correlation: 0.1 },
  { lag: 8, correlation: 0 },
  { lag: 9, correlation: -0.05 },
  { lag: 10, correlation: -0.1 },
];

const chartConfig = {
  correlation: {
    label: "Correlation",
    color: "hsl(var(--chart-1))",
  },
};

export function TimeLaggedCrossCorrelationChart() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Time-Lagged Cross-Correlation</CardTitle>
        <CardDescription>Correlation coefficient vs. time lag</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={correlationData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="lag"
                label={{
                  value: "Time Lag",
                  position: "insideBottomRight",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "Correlation Coefficient",
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={[-1, 1]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="correlation"
                stroke="var(--color-correlation)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
