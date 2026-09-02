"use client"

import {useUser} from '@/app/provider';
import {Button} from '@/components/ui/button';
import {supabase} from '@/services/supabaseClient';
import {Phone} from 'lucide-react';
import React, {useEffect, useState} from 'react'
import InterviewCard from '@/app/(main)/_components/InterviewCard';
import Link from 'next/link';

function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);
    const {user} = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        let {data: Interviews, error} = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', {ascending: false})
            .limit(6)

        setInterviewList(Interviews);
        setLoading(false);
    }

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl'>Latest Interviews</h2>
            {!loading && interviewList?.length === 0 &&
                <div className='p-5 flex flex-col gap-3 items-center bg-white rounded-xl mt-5 '>
                    <Phone className='h-10 w-10 text-primary'/>
                    <h2>You don't have any interview created!</h2>
                    <Link href={'/create-interview'}>
                        <Button>Create Interview</Button>
                    </Link>
                </div>}
            {!loading && interviewList &&
                <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index}/>
                    ))}
                </div>
            }
        </div>
    )
}

export default LatestInterviewsList