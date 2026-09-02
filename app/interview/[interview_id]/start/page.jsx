"use client"

import {InterviewDataContext} from '@/context/InterviewDataContext'
import {Loader2Icon, PhoneOff, Timer} from 'lucide-react';
import Image from 'next/image';
import React, {useContext, useEffect, useMemo, useState} from 'react'
import Vapi from "@vapi-ai/web";
import AlertConfirmation from './_components/AlertConfirmation';
import {toast} from 'sonner';
import TimerComponent from './_components/TimerComponent';
import axios from 'axios';
import {supabase} from '@/services/supabaseClient';
import {useParams, useRouter} from 'next/navigation';

function StartInterview() {
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const vapi = useMemo(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY), []);
    const [activeUser, setActiveUser] = useState(false);
    const [conversation, setConversation] = useState();
    const {interview_id} = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState();
    const [callEnd, setCallEnd] = useState(false);

    useEffect(() => {
        //interviewInfo && startCall();
    }, [interviewInfo])

    const startCall = () => {
        let questionList;
        interviewInfo?.interviewData?.questionList.forEach((item, index) => (
            questionList = item?.question + "," + questionList
        ));
        const assistantOptions = {
            name: "AI-Recruiter",
            firstMessage: "Hi " + interviewInfo?.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPosition,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "vapi",
                voiceId: "Savannah",
                version: 2,
                language: "en"
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates the provided interview questions and assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ` + interviewInfo?.interviewData?.jobPosition + ` interview. Let’s get started with the questions"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions, ask them one by one:
Questions: ` + questionList + `
Do not provide the correct answer or long feedback to the candidate's answer to the question.
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After all the questions, wrap up the interview smoothly. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note: "Thanks for chatting! Hope to see you crushing projects soon!"
Also, you must mention at the end of the interview that the candidate needs to click the End Call button to end the interview.
Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural, like a real conversation
`.trim(),
                    },
                ],
            },
        };
        vapi.start(assistantOptions)
        setCallEnd(false);

    }

    const stopInterview = async () => {
        await vapi.stop();
        setCallEnd(true);
        GenerateFeedback();
    }

    useEffect(() => {
        const handleMessage = (message) => {
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                setConversation(convoString);
            }
        };
        vapi.on("message", handleMessage);
        vapi.on("call-start", () => {
            toast.info('Call connected...')
        });
        vapi.on("speech-start", () => {
            setActiveUser(false);
        });
        vapi.on("speech-end", () => {
            setActiveUser(true);
        });
        vapi.on("call-end", () => {
            toast.info('Interview ended. Please wait...');
            GenerateFeedback();
        });

        // Clean up the listener
        return () => {
            vapi.off("message", handleMessage);
            vapi.off('call-start', () => {
            });
            vapi.off('speech-start', () => {
            });
            vapi.off('speech-end', () => {
            });
            vapi.off('call-end', () => {
            });
        };
    }, []);

    const GenerateFeedback = async () => {
        setLoading(true);
        if (!conversation) {
            return;
        }
        const result = await axios.post('/api/ai-feedback', {
            conversation: conversation
        });
        const Content = result.data.content;
        const FINAL_CONTENT = Content.replace('```json', '').replace('```', '')
        const feedbackJSON = JSON.parse(FINAL_CONTENT);
        const {data, error} = await supabase
            .from('InterviewFeedback')
            .insert([
                {
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    interview_id: interview_id,
                    feedback: feedbackJSON.feedback,
                    recommended: feedbackJSON.feedback.recommended
                },
            ])
            .select();
        router.replace('/interview/' + interview_id + "/completed");
        setLoading(false);
    }

    return (
        <div className='p-20 lg:px-48 xl:px-56'>
            <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
                <span className='flex gap-2 items-center'>
                    <Timer/>
                    <TimerComponent start={true}/>
                </span>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div
                    className='bg-white h-100 rounded-lg border flex relative flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {!activeUser &&
                            <span className="absolute  inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"/>}
                        <Image src={'/ai.png'} alt='ai'
                               width={100}
                               height={100}
                               className='w-15 h-15 rounded-full object-cover'
                        />
                    </div>
                    <h2>AI-Recruiter</h2>
                </div>
                <div className='bg-white h-100 rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {activeUser &&
                            <span className="absolute  inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"/>}
                        <h2 className='text-2xl text-white bg-primary  p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
                    </div>
                    <h2>{interviewInfo?.userName}</h2>
                </div>
            </div>
            <div className='flex items-center gap-5 justify-center mt-7'>
                <AlertConfirmation stopInterview={() => {
                    stopInterview()
                }}>
                    {!loading ? <PhoneOff className='h-15 w-15 p-4 bg-red-500 text-white rounded-2xl cursor-pointer'
                    /> : <Loader2Icon className='animate-spin'/>}
                </AlertConfirmation>
            </div>
        </div>
    )
}

export default StartInterview