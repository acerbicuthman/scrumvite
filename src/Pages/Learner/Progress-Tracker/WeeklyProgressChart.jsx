import React from 'react'
import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer } from "../../../Components/ui/chart"

const chartData = [
  { Day: "Mon", desktop: 186 },
  { Day: "Tue", desktop: 305 },
  { Day: "Wed", desktop: 237 },
  { Day: "Thur", desktop: 73 },
  { Day: "Fri", desktop: 209 },
  { Day: "Sat", desktop: 214 },
  { Day: "Sun", desktop: 214 }
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#262645",
  },
}

const WeeklyProgressChart = () => {
  return (
    <div className='flex-1 p-3 border-2 border-[#363863] '>
        <div className='space-y-2'>
        <p>Weekly Goals vs. Actual Progress</p>
      <p className='text-3xl font-semibold'>80%</p>
      <p className='text-[#9696C4]'>This Week</p>
        </div>
     
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full px-10">
        <BarChart data={chartData}>
          <XAxis
            dataKey="Day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Bar dataKey="desktop" fill="#262645" radius={1} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default WeeklyProgressChart
