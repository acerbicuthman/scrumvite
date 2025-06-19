"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../Components/ui/card"

const chartData = [
  { course: "Introduction to Scrum", amount: 186 },
  { course: "Advanced Scrum Techniques", amount: 305 },
  { course: "Agile Project Management", amount: 237 },
]

// Adjust max amount to normalize bar heights
const maxAmount = Math.max(...chartData.map(d => d.amount))

export default function PayoutChart() {
  return (
    <Card className="bg-[#121221] text-white border border-white/10 min-w-min ">
      <CardHeader>
        <CardTitle className="text-xl">Earnings by Course</CardTitle>
        <CardDescription className="text-white text-3xl font-semibold">
          $1,250
        </CardDescription>
      </CardHeader>

      <CardContent className="flex md:flex-row flex-col gap-6">
        {chartData.map((data, index) => {
          const heightPercent = (data.amount / maxAmount) * 100
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="bg-[#2E2E4D] md:w-[150px] w-[100px] "
                style={{
                  height: "100px",
                }}
              ></div>
                <p className="text-center text-xs text-[#9696C4] w-32 md:w-48">{data.course}</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
