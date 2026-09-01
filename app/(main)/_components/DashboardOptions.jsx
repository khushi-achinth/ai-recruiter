import { Phone, List, Calendar } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function DashboardOptions() {
    return (
        <div className='grid grid-cols-3 gap-5'>
            <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
            >
                <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                <h2 className='font-bold'>Create New Interview</h2>
                <p className='text-gray-500'>Create AI Interviews and schedule then with Candidates</p>
            </Link>
            <Link href={'/scheduled-interviews'} className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
            >
                <Calendar className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                <h2 className='font-bold'>Scheduled Interviews</h2>
                <p className='text-gray-500'>View the forthcoming interview schedule</p>
            </Link>
            <Link href={'/scheduled-interviews'} className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
            >
                <List className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                <h2 className='font-bold'>All Interviews</h2>
                <p className='text-gray-500'>View all interviews created by you</p>
            </Link>
        </div>
    )
}

export default DashboardOptions