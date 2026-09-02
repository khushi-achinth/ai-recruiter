"use client"

import React, {useContext, useEffect, useState} from 'react'
import Image from 'next/image'
import {Clock, Info, Loader2Icon, Video} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {useParams, useRouter} from 'next/navigation'
import {supabase} from '@/services/supabaseClient'
import {toast} from 'sonner'
import {InterviewDataContext} from '@/context/InterviewDataContext'

function Interview() {
    const {interview_id} = useParams();
    const [interviewData, setInterviewData] = useState();
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const router = useRouter();

    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id])

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            let {data: interviews, error} = await supabase
                .from('Interviews')
                .select("jobPosition,jobDescription,duration,type")
                .eq('interview_id', interview_id)
            setInterviewData(interviews[0]);
            setLoading(false);
            if (interviews?.length === 0) {
                toast.error('Incorrect interview link', {position: "top-center"})
            }
        } catch (e) {
            setLoading(false);
            toast.error('Incorrect interview link', {position: "top-center"})
        }
    }

    const onJoinInterview = async () => {
        if (!formData?.userName || !formData?.userEmail) {
            toast.error("Enter values for all the fields", {position: "top-center"})
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData?.userEmail)) {
            toast.error("Enter a valid email address", {position: "top-center"})
            return
        }
        setLoading(true);
        let {data: interviews, error} = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id);

        setInterviewInfo({
            userName: formData?.userName,
            userEmail: formData?.userEmail,
            interviewData: interviews[0]
        });
        router.push('/interview/' + interview_id + '/start')
        setLoading(false);
    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7  pb-20'>
            <div className='flex flex-col items-center
             justify-center border rounded-lg bg-white
             p-7 lg:px-33 xl:px-52  mb-20 pb-15'>
                <Image src={'/logo.png'} alt='logo' width={200} height={100}
                       className='w-35'
                />
                <h2 className='mt-3'>AI-Powered Interview Platform</h2>
                <Image src={'/interview.png'} alt='interview'
                       width={500}
                       height={500}
                       className='w-70 my-6'
                />
                <h2 className='font-bold text-xl '>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'>
                    <Clock className='h-4 w-4'/> {interviewData?.duration}</h2>
                <div className='w-full'>
                    <h2>Enter your full name</h2>
                    <Input placeholder='e.g. John Smith'
                           onChange={(event) => onHandleInputChange('userName', event.target.value)}/>
                </div>
                <div className='w-full mt-4'>
                    <h2>Enter your Email</h2>
                    <Input placeholder='e.g. john.smith@gmail.com' type="email"
                           onChange={(event) => onHandleInputChange('userEmail', event.target.value)}/>
                </div>
                <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-6'>
                    <Info className='text-primary'/>
                    <div>
                        <h2 className='font-bold'>Before you begin</h2>
                        <ul className=''>
                            <li className='text-sm text-primary'>- Test your speakers and microphone</li>
                            <li className='text-sm text-primary'>- Ensure you have a stable internet connection</li>
                            <li className='text-sm text-primary'>- Find a quiet place for the interview</li>
                        </ul>
                    </div>
                </div>
                <Button className={'mt-5 w-full font-bold'}
                        onClick={() => onJoinInterview()}
                >
                    <Video/> {loading && <Loader2Icon className='animate-spin'/>} Join Interview</Button>
            </div>
        </div>
    )
}

export default Interview