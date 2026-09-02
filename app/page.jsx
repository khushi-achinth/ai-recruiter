"use client"

import {Button} from "@/components/ui/button";
import {Clock, Users} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useUser} from "./provider";
import React, {useEffect} from "react";
import {redirect, useSearchParams} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
    const {user} = useUser();
    const searchParams = useSearchParams();
    const signOut = searchParams.get('signOut');

    useEffect(() => {
        if (signOut === 'true') {
            // Perform a hard reload of the current window URL
            window.location.href = window.location.pathname;
        }
        if (user) {
            redirect('/dashboard');
        }
    }, [signOut, user]);

    return (
        <div>
            <header className="border-b w-full">
                <div className="px-10 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src={'/logo.png'} alt="logo" width={140} height={200}/>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#features" className="text-sm font-medium hover:underline">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium hover:underline">
                            How It Works
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium hover:underline">
                            Pricing
                        </Link>
                    </nav>
                    <div>
                        {user?.email ?
                            <Link href={'/dashboard'}>
                                <Button>Dashboard</Button>
                            </Link>
                            :
                            <Link href={'/auth'}>
                                <Button>Sign In</Button>
                            </Link>
                        }
                    </div>
                </div>
            </header>
            <main className="flex-1 items-center justify-center">
                <section
                    className="py-20 flex items-center justify-center w-full md:py-28 bg-linear-to-b from-blue-50 to-white">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 items-center">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2 text-center">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                        AI-Powered <span className="text-primary"> Interview Assistant </span> for
                                        Modern Recruiters
                                    </h1>
                                    <p className="text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Let our AI voice agent conduct candidate interviews while you focus on finding
                                        the perfect match.
                                        Save time, reduce bias, and improve your hiring process.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="py-16 md:py-24 flex items-center justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
                                <p className="mx-auto max-w-175 text-gray-500 md:text-xl/relaxed">
                                    AI-Recruiter helps you save time and find better candidates with our advanced AI
                                    interview technology.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 mt-12">
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <Clock className="h-12 w-12 text-primary"/>
                                <h3 className="text-xl font-bold">Save Time</h3>
                                <p className="text-center text-gray-500">
                                    Automate initial screening interviews and focus on final candidates.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <Users className="h-12 w-12 text-primary"/>
                                <h3 className="text-xl font-bold">Reduce Bias</h3>
                                <p className="text-center text-gray-500">
                                    Standardised interviews help eliminate unconscious bias in the hiring process.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="how-it-works" className="flex items-center justify-center py-16 md:py-24 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It
                                    Works</h2>
                                <p className="mx-auto max-w-175 text-gray-500 md:text-xl/relaxed">
                                    Three simple steps to transform your recruitment process
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
                            <div className="flex flex-col items-center space-y-4">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                                    <span className="text-xl font-bold">1</span>
                                </div>
                                <h3 className="text-xl font-bold">Create Interview</h3>
                                <p className="text-center text-gray-500">
                                    Set up your job requirements and generate interview questions.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                                    <span className="text-xl font-bold">2</span>
                                </div>
                                <h3 className="text-xl font-bold">Share with Candidates</h3>
                                <p className="text-center text-gray-500">
                                    Send interview links to candidates to complete at their convenience.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                                    <span className="text-xl font-bold">3</span>
                                </div>
                                <h3 className="text-xl font-bold">Review Results</h3>
                                <p className="text-center text-gray-500">
                                    Get AI analyzed results to help filter out candidates.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="pricing" className="py-16 md:py-24 flex items-center justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Pricing</h2>
                                <p className="mx-auto max-w-175 text-gray-500 md:text-xl/relaxed">
                                    Buy credits as per your requirements.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-1 mt-12">
                            <Card className="md:col-span-2 border-0 shadow-none">
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <Card className="text-center">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-xl font-bold text-primary">Basic</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-xl font-bold">$5</div>
                                                <p className="text-sm text-foreground">20 interviews</p>
                                                <p className="text-sm text-muted-foreground">($0.25/interview)</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="text-center">
                                            <CardHeader className="pb-2">
                                                <CardTitle
                                                    className="text-xl font-bold text-primary">Standard</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-xl font-bold">$10</div>
                                                <p className="text-sm text-foreground">50 interviews</p>
                                                <p className="text-sm text-muted-foreground">($0.20/interview)</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="text-center">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-xl font-bold text-primary">Pro</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-xl font-bold">$30</div>
                                                <p className="text-sm text-foreground">200 interviews</p>
                                                <p className="text-sm text-muted-foreground">($0.15/interview)</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="py-16 flex items-center justify-center md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Ready to Transform Your Hiring Process?
                                </h2>
                                <p className="mx-auto max-w-175 text-gray-500 md:text-xl/relaxed">
                                    Join hundreds of companies already using AI-Recruiter to find the best talent.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href={'/auth'}>
                                    <Button size="lg" className="bg-primary hover:bg-blue-700">
                                        Get Started for Free
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t flex items-center justify-center bg-gray-50">
                <div
                    className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
                    <div className="text-sm text-gray-500">© 2026 AI-Recruiter. All rights reserved.</div>
                    <nav className="flex flex-wrap gap-4 md:gap-6">
                        <Link href="#" className="text-sm hover:underline">
                            Terms
                        </Link>
                        <Link href="#" className="text-sm hover:underline">
                            Privacy
                        </Link>
                        <Link href="#" className="text-sm hover:underline">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
