'use client'

import {supabase} from "@/services/supabaseClient";
import React from "react";
import {useUser} from '@/app/provider'
import {Card, CardContent} from '@/components/ui/card'
import Image from 'next/image';
import {useRouter} from "next/navigation";
import {LogOut} from "lucide-react";
import AlertConfirmation from "@/app/_components/AlertConfirmation";

function UserProfile() {
    const {user} = useUser();
    const router = useRouter()

    const signOut = async () => {
        const {error} = await supabase.auth.signOut({scope: 'local'})
        if (!error) {
            router.push('/?signOut=true')
            router.refresh()
        } else {
            console.error(error)
        }
    }

    return (
        <div className="flex-1 p-4 md:p-6">
            <div className="mx-auto grid max-w-6xl gap-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">User Profile</h1>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                    <Card className="md:col-span-1 lg:col-span-1">
                        <CardContent className="grid gap-6">
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start gap-4">
                                <Image src={user?.picture} alt='user' width={100} height={100}
                                       className='w-17.5 h-17.5 rounded-full'
                                />
                                <div className="flex flex-col items-center sm:items-start">
                                    <h3 className="text-lg font-medium">{user?.name}</h3>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <AlertConfirmation title='Sign Out' text='Are you sure you want to sign out?'
                                                   handleContinue={() => {
                                                       signOut()
                                                   }}>
                                    <div
                                        className="font-bold flex text-[16px] bg-primary rounded-sm px-4 py-2 text-white cursor-pointer">
                                        <LogOut/>&nbsp;Sign Out
                                    </div>
                                </AlertConfirmation>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserProfile