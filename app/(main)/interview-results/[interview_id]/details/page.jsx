"use client"

import {ArrowLeft} from "lucide-react";
import {useUser} from '@/app/provider';
import {supabase} from '@/services/supabaseClient';
import {useParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {Button} from '@/components/ui/button'
import CandidateList from "@/app/(main)/interview-results/[interview_id]/details/_components/CandidateList";
import InterviewDetails from "@/app/(main)/interview-results/[interview_id]/details/_components/InterviewDetails";

function InterviewResultS() {
    const router = useRouter()
    const {interview_id} = useParams();
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const [interviewDetails, setInterviewDetails] = useState();

    useEffect(() => {
        user && GetInterviewDetails();
    }, [user])

    const GetInterviewDetails = async () => {
        const result = await supabase.from('Interviews')
            .select(`jobPosition,jobDescription,type,questionList,duration,interview_id,created_at,
                InterviewFeedback(userEmail,userName,feedback,created_at)`)
            .eq('userEmail', user?.email)
            .eq('interview_id', interview_id)

        setInterviewDetails(result?.data[0])
        setLoading(false);
    }

    return (
        <div>
            {!loading && <div className='mt-5'>
                <h2 className='font-bold text-2xl'>Interview Details</h2>
                <InterviewDetails interviewDetails={interviewDetails}/>
                <CandidateList candidateList={interviewDetails?.['InterviewFeedback']}/>
            </div>}
            {!loading &&
                <div className='flex w-full gap-5 justify-between mt-6'>
                    <Button variant='outline' onClick={() => router.back()}> <ArrowLeft/> Back </Button>
                </div>}
        </div>
    )
}

export default InterviewResultS