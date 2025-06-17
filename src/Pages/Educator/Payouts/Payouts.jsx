import React, { useState } from 'react'
import AsideTutor from '../Dashboard/AsideTutor'
import PayoutChart from './PayoutChart'
import StackedPayChart from './StackedPayChart'

const Payouts = () => {
    const [collapsed, setCollapse] = useState(false)
    const Table_Heads = ["Date", "Amount", "Status"]
    const payOut_table = [{
        Date: "July 15, 2024",
        Amount: "$350",
        Status: "Scheduled"
    },
    {
        Date: "July 15, 2024",
        Amount: "$350",
        Status: "Scheduled"
    },
    {
        Date: "July 15, 2024",
        Amount: "$350",
        Status: "Scheduled"
    }]
  return (
<div className='flex text-white min-h-screen bg-#121221] mt-20 overflow-x-auto'>
      <aside>
        <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
      </aside>
      <main  className={`p-6 transition-all duration-300 ${collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-100px)]'}`}>
        <div>
            <h1>Payouts</h1>
            <p>View your earnings and upcoming payouts</p>
                <div className='w-full bg-[#262645] h-[110px] rounded p-5'>
                    <p>Total Earnings</p>
                    <p>$1250</p>
            </div>
            <div>
                <p>Upcoming Payouts</p>
                 <table className="min-w-[600px] w-full text-left border border-[#363863] rounded-full">
                 <thead>
      <tr className="bg-[#1C1C30] ">
      {Table_Heads.map((head) => (
                    <th key={head}  className="text-white p-4 whitespace-nowrap">
                            {head}
                        </th>
      ))}
      </tr>
      </thead>
      <tbody>
        {payOut_table.map(
           ( {Date, Amount, Status }, index )=> (
            <tr key={index} className='border-t'>
                <td className='p-4 whitespace-nowrap'> {Date}</td>
                <td className='p-4 whitespace-nowrap'> {Amount}</td>
                <td className='p-4  '> <div className='bg-[#262645] w-1/2 text-center rounded-md py-1'>{Status}</div></td>
            </tr>
           ))}
      </tbody>
                 </table>
                

               
            </div>
            <div>
                <p>Earnings Breakdown</p>
                <div className='mt-10 border border-[#363863]'>
               
                <PayoutChart/>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default Payouts
