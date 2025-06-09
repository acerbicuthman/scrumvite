import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer } from "../../../Components/ui/chart"


const chartData = [
  { Day: "Modules", desktop: 186 },
  { Day: "Quizzes", desktop: 305 },

]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#262645",
  },
}
  const CompletedModulesChart = () => {
    return (
        <div className='flex-1 p-3 border-2 border-[#363863]'>
            <div className='space-y-2'>
            <p>Completed Modules & Quizzes</p>
          <p className='text-3xl font-semibold'>15</p>
          <p className='text-[#9696C4]'>Total</p>
            </div>
         
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full px-10">
            <BarChart data={chartData}>
              <XAxis
                dataKey="Day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar dataKey="desktop" fill="#262645" radius={1} />
            </BarChart>
          </ChartContainer>
        </div>
    )
  }
  
  export default CompletedModulesChart
  