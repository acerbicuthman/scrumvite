"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../Components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../Components/ui/chart"

const chartData = [
  { course: "Introduction to Scrum", amount: 186 },
  { course: "Advanced Scrum Techniques", amount: 305 },
  { course: "Agile Project Management", amount: 237 },

]

const chartConfig = {
  amount: {
    label: "amount",
    color: "6",
  },
}

export default function PayoutChart() {
  return (
    <Card className="bg-[#121221] text-white border-none">
      <CardHeader>
        <CardTitle className="text-2xl ">Earnings by Course</CardTitle>
        <CardDescription className="text-white text-3xl font-semibold">$1,250</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="course"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div> */}
      </CardFooter>
    </Card>
  )
}
