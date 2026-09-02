import {List, NotebookPen, Phone} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function DashboardOptions() {
    return (
        <div className='grid grid-cols-3 gap-5'>
            <Link href={'/dashboard/create-interview'}
                  className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
            >
                <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
                <h2 className='font-bold'>Create New Interview</h2>
                <p className='text-gray-500'>Create AI Interviews to share with candidates</p>
            </Link>
            <Link href={'/interview-results'}
                  className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
            >
                <NotebookPen className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
                <h2 className='font-bold'>Interview Results</h2>
                <p className='text-gray-500'>View the AI feedback reports of completed interviews</p>
            </Link>
            <Link href={'/all-interviews'}
                  className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
            >
                <List className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
                <h2 className='font-bold'>All Interviews</h2>
                <p className='text-gray-500'>View all interviews that you have previously created</p>
            </Link>
        </div>
    )
}

export default DashboardOptions