"use client"

import {useUser} from '@/app/provider';
import {supabase} from '@/services/supabaseClient';
import {useParams} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import InterviewDetailsContainer from './_components/InterviewDetailsContainer';
import CandidateList from "@/app/(main)/interview-results/[interview_id]/details/_components/CandidateList";

function InterviewResultDetails() {
    const {interview_id} = useParams();
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const [interviewDetails, setInterviewDetails] = useState();

    useEffect(() => {
        user && GetInterviewDetail();
    }, [user])

    const GetInterviewDetail = async () => {
        const result = await supabase.from('Interviews')
            .select(`jobPosition,jobDescription,type,questionList,duration,interview_id,created_at,
                InterviewFeedback(userEmail,userName,feedback,created_at)`)
            .eq('userEmail', user?.email)
            .eq('interview_id', interview_id)

        setInterviewDetails(result?.data[0])
        setLoading(false);
    }

    return (
        <>
            {!loading && <div className='mt-5'>
                <h2 className='font-bold text-2xl'>Interview Details</h2>
                <InterviewDetailsContainer interviewDetails={interviewDetails}/>
                <CandidateList candidateList={interviewDetails?.['InterviewFeedback']}/>
            </div>}
        </>
    )
}

export default InterviewResultDetails