'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { ContactsModelInterface } from '@/models/contacts';
import { RiLoader4Line, RiSearchLine, RiUser6Line } from '@remixicon/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface ChatContactsInterface {
    name: string,
    lastMessage: string,
    isNew: boolean,
}

const ChatSidebar = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [contacts, setContacts] = useState<ContactsModelInterface[]>([]);

    useEffect(() => {

        (async () => {
            try {

                const {
                    data,
                } = await axios.get<ContactsModelInterface[]>('/api/whatsapp/fetch-contacts/all');
                setContacts(data);
                setIsLoading(false);

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()

    }, [])

    if (error) {
        return (
            <div
                className='min-w-[300px] shrink-0 flex flex-col p-4'
            >
                <ErrorTemplate
                    error={error}
                />
            </div>
        )
    }

    return (
        <div
            className='min-w-[300px] shrink-0 flex flex-col'
        >
            <div
                className='w-full p-3 border-b border-stroke-light/50'
            >
                <div
                    className='flex items-center gap-1 bg-background-2/70 py-3 px-4 rounded-2xl'
                >
                    <input
                        type="text"
                        className='outline-none w-full'
                        placeholder='Enter name'
                    />
                    <button
                        className='text-black/40 shrink-0'
                    >
                        <RiSearchLine />
                    </button>
                </div>
            </div>

            <div
                className='overflow-auto min-h-[200px]'
            >
                {
                    isLoading ? (
                        <div
                            className='flex items-center gap-4 py-4 px-6 text-foreground/60'
                        >
                            <RiLoader4Line
                                size={20}
                                className='shrink-0 animate-spin'
                            />
                            <p>Loading contacts</p>
                        </div>
                    ) : (
                        <div
                            className='space-y-0 min-h-max'
                        >
                            {contacts.map((chat, index) => (
                                <button
                                    key={index}
                                    className={'flex items-center gap-3 w-full py-4 px-5 cursor-pointer hover:bg-stroke-light/10 border-b border-stroke-light/50'}
                                    onClick={() => {
                                        router.push(`/app?phone=${chat.phone}`)
                                    }}
                                >
                                    <div
                                        className='w-[50px] h-[50px] bg-background-2 rounded-full flex items-center justify-center shrink-0'
                                    >
                                        <RiUser6Line
                                            size={20}
                                        />
                                    </div>
                                    <div
                                        className='space-y-0.5 w-full text-left'
                                    >
                                        <h3
                                            className='text-sm font-semibold capitalize'
                                        >{chat.name}</h3>
                                        <p
                                            className='text-xs'
                                        >Whatsapp chat</p>
                                    </div>

                                    {/* {
                                chat.isNew && (
                                    <div
                                        className='min-w-[25px] h-[25px] text-xs flex items-center justify-center rounded-full bg-green-400'
                                    >1</div>
                                )
                            } */}
                                </button>
                            ))}
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default ChatSidebar
