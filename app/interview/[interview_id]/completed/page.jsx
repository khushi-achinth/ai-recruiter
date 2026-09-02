"use client"

import React from 'react';
import {Send} from 'lucide-react';
import {useRouter} from 'next/navigation';
import Image from "next/image";

const InterviewCompleted = () => {
    const router = useRouter();

    return (
        <div className="bg-midnight bg-white text-black font-sans antialiased flex flex-col min-h-screen">
            <main className="grow flex flex-col items-center justify-center space-y-3 py-6">
                <div className="rounded-full bg-green-500 p-4 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-center">Interview Complete!</h1>
                <p className="text-lg text-gray-600 text-center">
                    Thank you for participating in the AI driven interview with AI-Recruiter
                </p>
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={'/interview-completed.png'}
                        alt="interview-completed"
                        className="w-full h-auto object-cover max-w-4xl"
                        height={280}
                        width={420}
                    />
                </div>
                <div className="bg-midnightLighter rounded-xl p-8 shadow-lg w-full max-w-xl space-y-4">
                    <div className="flex items-center justify-center rounded-full
                    bg-primary w-12 h-12 mx-auto">
                        <Send className='text-white'/>
                    </div>
                    <h2 className="text-2xl font-semibold text-center">What's Next?</h2>
                    <p className="text-gray-600 text-center">
                        The recruiter will review your interview responses and will contact you soon regarding the next
                        steps.
                    </p>
                    <p className="text-gray-600 text-sm text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Response within 2-3 business days
                    </p>
                </div>
            </main>
            {/* Footer */}
            <footer className="bg-midnightLighter text-gray-400 text-center py-4">
                <p>&copy; 2026 AI-Recruiter. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default InterviewCompleted;

