"use client"

import {useUser} from '@/app/provider';
import {Button} from '@/components/ui/button';
import {supabase} from '@/services/supabaseClient'
import {Phone} from 'lucide-react';
import React, {useEffect, useState} from 'react'
import InterviewCard from '../_components/InterviewCard';
import Link from 'next/link';

function InterviewResults() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultCount, setResultCount] = useState(0);

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        const result = await supabase.from('Interviews')
            .select('jobPosition,duration,interview_id,InterviewFeedback(userEmail)')
            .eq('userEmail', user?.email)
            .order('id', {ascending: false})

        setInterviewList(result.data);
        setResultCount(result.data.filter(interview => interview.InterviewFeedback.length !== 0).length);
        setLoading(false);
    }

    return (
        <div className=' mt-5'>
            <h2 className='font-bold text-2xl'>Interviews Results</h2>
            {!loading &&
                interviewList?.length === 0 &&
                <div className='p-5 flex flex-col gap-3 items-center bg-white rounded-xl mt-5 '>
                    <Phone className='h-10 w-10 text-primary'/>
                    <h2>You don't have any interview created!</h2>
                    <Link href={'/create-interview'}>
                        <Button>Create Interview</Button>
                    </Link>
                </div>}
            {!loading && interviewList &&
                <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
                    {interviewList && interviewList?.map((interview, index) => {
                        //setResultCount(prevCount => prevCount + 1);
                        return interview.InterviewFeedback.length !== 0 &&
                            <InterviewCard interview={interview} key={index}
                                           viewDetail={true}
                            />
                    })}
                </div>
            }
            {!loading && resultCount === 0 &&
                <div className='p-5 flex flex-col gap-3 items-center bg-white rounded-xl mt-5 '>
                    <Phone className='h-10 w-10 text-primary'/>
                    <h2>Candidates have taken any of the interviews</h2>
                </div>
            }
        </div>
    )
}

export default InterviewResults