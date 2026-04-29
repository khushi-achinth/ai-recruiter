"use client"

import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {supabase} from "@/services/supabaseClient";

const Login = () => {

    const signInWithGoogle = async() => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <div className={'flex flex-col items-center justify-center h-screen'}>
            <div className={'flex flex-col items-center border rounded-2xl p-8'}>
                <Image
                    src={'/logo.png'}
                    alt={'logo'}
                    width={400}
                    height={100}
                    className={'w-45'}
                    loading={'eager'}
                />
                <div className={'flex flex-col items-center'}>
                    <Image
                        src={'/login.png'}
                        alt={'login'}
                        width={600}
                        height={400}
                        className={'w-100 h-62.5 rounded-2xl'}
                        loading={'eager'}
                    />
                    <h2 className={'text-2xl font-bold text-center'}>Welcome to AI-Recruiter</h2>
                    <h4 className={'text-xl text-blue-500 text-center'}>Automate your recruitment</h4>
                    <Button onClick={signInWithGoogle}
                        className={'mt-7 w-full cursor-pointer'}
                    >Login With Google</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;