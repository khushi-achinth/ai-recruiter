"use client"

import React from 'react'
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {Phone} from "lucide-react"
import {useUser} from '@/app/provider'
import PayButton from './_components/PayButton'

function Billing() {
    const {user} = useUser();

    return (
        <div className="flex-1 p-4 md:p-6">
            <div className="mx-auto grid max-w-6xl gap-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Your Remaining Credits</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="rounded-lg border bg-card p-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <Phone className="h-5 w-5 text-blue-600"/>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-blue-600">{user?.credits} interviews
                                            left</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Purchase Credits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card className="text-center">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Basic</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$5</div>
                                        <p className="text-sm text-foreground">20 interviews</p>
                                        <p className="text-sm text-muted-foreground pb-4">($0.25/interview)</p>
                                        <PayButton amount={5} credits={20}/>
                                    </CardContent>
                                </Card>
                                <Card className="text-center">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Standard</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$10</div>
                                        <p className="text-sm text-foreground">50 interviews</p>
                                        <p className="text-sm text-muted-foreground pb-4">($0.20/interview)</p>
                                        <PayButton amount={10} credits={50}/>
                                    </CardContent>
                                </Card>
                                <Card className="text-center">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Pro</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$30</div>
                                        <p className="text-sm text-foreground">200 interviews</p>
                                        <p className="text-sm text-muted-foreground pb-4">($0.15/interview)</p>
                                        <PayButton amount={30} credits={200}/>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Billing