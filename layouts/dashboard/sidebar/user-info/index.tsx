'use client';

import { getClientSession } from '@/functions/auth/getClientSession';
import { RiArrowRightSLine, RiUser6Line } from '@remixicon/react'
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const UserInfo = () => {

    const [userSession, setUserSession] = useState<Session | null>(null);

    useEffect(() => {
        (async () => {
            const session = await getClientSession();
            setUserSession(session);
            console.log(session)
        })()
    }, [])

    return (
        <div
            className='border-b border-stroke-light pb-4'
        >
            <div
                className='flex items-center gap-3'
            >
                <div
                    className='w-[50px] h-[50px] bg-background-2 rounded-full flex items-center justify-center shrink-0'
                >
                    <RiUser6Line
                        size={20}
                    />
                </div>
                <div
                    className='space-y-0.5'
                >
                    <h3
                        className='text-sm font-semibold'
                    >{userSession?.user?.name}</h3>
                    <button
                        className='flex items-center gap-1 text-xs cursor-pointer'
                        onClick={async () => {
                            await signOut();
                        }}
                    >
                        <p>Logout</p>
                        <RiArrowRightSLine
                            size={10}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
