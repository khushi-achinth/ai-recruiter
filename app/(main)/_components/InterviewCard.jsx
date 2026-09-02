import {Button} from '@/components/ui/button'
import {ArrowRight, Copy, Phone} from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import {toast} from 'sonner'

function InterviewCard({interview, viewDetail = false}) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/interview/" + interview?.interview_id

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast.info('Interview link copied', {position: "top-center"})
    }

    return (
        <div className='p-5 bg-white rounded-lg border'>
            <div className='flex items-center justify-between'>
                <Phone className='p-3 fill-blue-500 bg-blue-50 rounded-lg h-12 w-12'/>
                <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
            </div>
            <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
            <h2 className='mt-2 flex justify-between text-gray-500'>{interview?.duration}
                {viewDetail &&
                    <span className='text-green-700'>{interview['InterviewFeedback']?.length} Candidate(s)</span>}
            </h2>
            {!viewDetail ? <div className='flex gap-3 w-full mt-5'>
                    <Button variant='outline' className={'w-full text-primary'} onClick={copyLink}> <Copy/> Copy
                        Link</Button>
                </div>
                :
                <Link href={`/interview-results/` + interview?.interview_id + `/details`}>
                    <Button className="mt-5 w-full" variant="outline">View Results<ArrowRight/> </Button>
                </Link>
            }
        </div>
    )
}

export default InterviewCard