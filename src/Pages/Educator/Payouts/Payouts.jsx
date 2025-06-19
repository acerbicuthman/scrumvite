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
<div className='flex text-white min-h-screen bg-[#121221] mt-20 w-full'>
      <aside>
        <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
      </aside>
      <main  className={`p-6 transition-all bg-[#121221] duration-300 ${collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-100px)]'} `}>
        <div className='md:pr-10 pr-0 '>
            <div className='my-2'>
            <h1 className='text-3xl my-2 font-semibold'>Payouts</h1>
                <p className='text-[#9696C4]'>View your earnings and upcoming payouts</p>
            </div>
          
                <div className='w-full bg-[#262645] h-[110px] rounded p-5'>
                    <p>Total Earnings</p>
                    <p className='font-semibold text-3xl my-4'>$1250</p>
            </div>
            <div className='mt-10 '>
                <p className='text-2xl my-2 font-semibold'>Upcoming Payouts</p>
                 <table className=" w-full text-left border border-[#363863] rounded-full">
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
                <td className='p-4 whitespace-nowrap text-[#9696C4]'> {Date}</td>
                <td className='p-4 whitespace-nowrap text-[#9696C4]'> {Amount}</td>
                <td className='p-4  '> <div className='bg-[#262645] w-1/2 text-center rounded-md py-1'>{Status}</div></td>
            </tr>
           ))}
      </tbody>
                 </table>
                

               
            </div>
            <div className='mt-10'>
            <p className='text-2xl font-semibold'>Earnings Breakdown</p>
                <div className='mt-2 border border-[#363863] w-full'>
              
                <PayoutChart/>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default Payouts
