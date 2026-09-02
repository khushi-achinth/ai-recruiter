"use client"

import {Progress} from '@/components/ui/progress';
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import InterviewLink from './_components/InterviewLink';
import {useUser} from '@/app/provider';
import {toast} from 'sonner';

function CreateInterview() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const [interviewId, setInterviewId] = useState();
    const [numOfQuestions, setNumOfQuestions] = useState();
    const {user} = useUser();

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const onGoToNext = () => {
        if (user?.credits <= 0) {
            toast.error("Please add credits", {position: "top-center"})
            return
        }
        if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || formData.type.length === 0) {
            toast.error("Enter values for all the fields", {position: "top-center"})
            return
        }
        setStep(step + 1);
    }

    const onCreateLink = (interview_id, numOfQuestions) => {
        setInterviewId(interview_id);
        setNumOfQuestions(numOfQuestions);
        setStep(step + 1);
    }

    return (
        <div>
            <div className='my-3 mx-1 font-bold text-2xl'>
                <h2 className='font-bold text-2xl'>Create Interview</h2>
            </div>
            <Progress value={step * 33.33} className='my-5'/>
            {step === 1 ? <FormContainer
                    onHandleInputChange={onHandleInputChange}
                    GoToNext={() => onGoToNext()}/>
                : step === 2 ? <QuestionList formData={formData}
                                             onCreateLink={(interview_id, numOfQuestions) => onCreateLink(interview_id, numOfQuestions)}/> :
                    step === 3 ?
                        <InterviewLink interview_id={interviewId}
                                       numOfQuestions={numOfQuestions}
                                       formData={formData}
                        /> : null}
        </div>
    )
}

export default CreateInterview