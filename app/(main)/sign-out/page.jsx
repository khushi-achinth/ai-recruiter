'use client'

import {supabase} from "@/services/supabaseClient";
import {useRouter} from 'next/navigation'
import {useEffect} from "react";

export default function SignOut() {
    const router = useRouter()

    useEffect(() => {
        handleSignOut();
    }, []);

    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut({scope: 'local'})
        if (!error) {
            router.push('/?signOut=true')
            router.refresh()
        } else {
            console.error(error)
        }
    }
}