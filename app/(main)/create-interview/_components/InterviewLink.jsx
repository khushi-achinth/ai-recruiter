import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Clock, Copy, List} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {toast} from 'sonner'

function InterviewLink({interview_id, numOfQuestions, formData}) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/interview/' + interview_id

    const GetInterviewUrl = () => {
        return url;
    }

    const onCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        toast.info('Interview link copied', {position: "top-center"})
    }

    return (
        <div className='flex items-center justify-center flex-col mt-10'>
            <div className=''>
                <Image src={'/check.png'} alt='check'
                       width={200}
                       height={200}
                       className='w-12.5 h-12.5'
                />
            </div>
            <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
            <p className='mt-3'>Share this link with your candidates to start the interview process</p>
            <div className='w-full p-7 mt-6 rounded-lg bg-white'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold'>Interview Link</h2>
                </div>
                <div className='mt-3 flex gap-3 items-center'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                    <Button onClick={() => onCopyLink()}> <Copy/> Copy Link </Button>
                </div>
                <hr className='my-5'/>
                <div className='flex gap-5'>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock
                        className='h-4 w-4'/>{formData?.duration} </h2>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List
                        className='h-4 w-4'/> {numOfQuestions} Questions </h2>
                </div>
            </div>
        </div>
    )
}

export default InterviewLink