"use client";

import React, {useContext, useEffect, useState} from 'react';
import {supabase} from "@/services/supabaseClient";
import {UserDetailContext} from "@/context/UserDetailContext";

const Provider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        CreateNewUser();
    }, []);

    const CreateNewUser = () => {
        supabase.auth.getUser().then(async ({data: {user}}) => {
            let {data: users, error} = await supabase
                .from('Users')
                .select('*')
                .eq('email', user?.email);

            if (users?.length === 0 && user?.email) {
                const {data, error} = await supabase
                    .from('Users')
                    .insert([
                        {
                            email: user?.email,
                            name: user?.user_metadata?.name,
                            picture: user?.user_metadata?.picture,
                            credits: process.env.NEXT_PUBLIC_FREE_CREDITS
                        },
                    ]);
                setUser(data)
                return;
            }
            setUser(users[0]);
        })
    }

    return (
        <UserDetailContext.Provider value={{user, setUser}}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    );
};

export default Provider;

export const useUser = () => {
    return useContext(UserDetailContext);
}