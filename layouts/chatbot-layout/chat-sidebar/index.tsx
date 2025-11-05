'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { ContactsModelInterface } from '@/models/contacts';
import { RiLoader4Line, RiSearchLine } from '@remixicon/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import ContactCard from './contact-card';

export interface ChatContactsInterface {
    name: string,
    lastMessage: string,
    isNew: boolean,
}

const ChatSidebar = () => {

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

    useEffect(() => {
        const event = new EventSource(`/api/whatsapp/updates-event/contacts`);
        event.onmessage = (event) => {
            const data = JSON.parse(event.data) as { fullDocument: ContactsModelInterface }
            setContacts(prevContacts => {
                const filtered = prevContacts.filter(contact => contact.phone !== data.fullDocument.phone);
                const newContacts = [data.fullDocument, ...filtered];
                return newContacts;
            })
        }

        event.onerror = (err) => {
            console.log("SSE Error:", err);
        }

        return () => event.close();

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
                                <ContactCard
                                    chat={chat}
                                    key={index}
                                />
                            ))}
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default ChatSidebar
