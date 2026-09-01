'use client'

import {supabase} from "@/services/supabaseClient";
import { useRouter } from 'next/navigation'
import {useEffect} from "react";
import {useUser} from "@/app/provider";

export default function SignOut() {
    const router = useRouter()

    useEffect(() => {
        handleSignOut();
    }, []);

    const handleSignOut = async () => {
        // Triggers local browser storage cleanup and signs out
        const { error } = await supabase.auth.signOut({ scope: 'local' })
        console.log(error)
        if (!error) {
            // Refresh or force redirect to the login screen
            router.push('/?signOut=true')
            router.refresh()
        } else {
            console.error('Error signing out:', error.message)
        }
    }
}