'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { RiArrowDownSLine, RiLoader4Line, RiSearchLine } from '@remixicon/react'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import ContactCard from './contact-card';
import { useSearchParams } from 'next/navigation';
import { CustomContactsCardDataInterface } from '@/app/api/whatsapp/fetch-contacts/all/route';
import { FetchContactsFilterOptions } from '@/functions/whatsapp/fetchContacts';

export interface ChatContactsInterface {
    name: string,
    lastMessage: string,
    isNew: boolean,
}

const ChatSidebar = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [contacts, setContacts] = useState<CustomContactsCardDataInterface[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const [isHidden, setIsHidden] = useState(false);

    const checkIsMobile = useCallback(() => {
        const phone = searchParams.get('phone');
        const isMobile = phone && window.innerWidth < 500 ? true : false;
        return isMobile;
    }, [searchParams])

    useEffect(() => {

        (async () => {
            setPaginationLoading(true);
            try {

                const requestData: FetchContactsFilterOptions = {
                    currentPage,
                }

                const {
                    data,
                } = await axios.post<CustomContactsCardDataInterface[]>(
                    '/api/whatsapp/fetch-contacts/all',
                    requestData,
                );

                setContacts(prev => [...prev, ...data]);
                setIsLoading(false);

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }

            setPaginationLoading(false)
        })()

    }, [currentPage])

    useEffect(() => {
        const event = new EventSource(`/api/whatsapp/updates-event/contacts`);

        (async () => {

            if (Notification.permission !== "granted") {
                await Notification.requestPermission();
            }

            event.onmessage = (event) => {
                const data = JSON.parse(event.data) as { fullDocument: CustomContactsCardDataInterface }

                if (Notification.permission === "granted" && data.fullDocument.unread !== null) {
                    new Notification(
                        "New notification!",
                        {
                            body: `You have ${data.fullDocument.unread} unread messages.`,
                        }
                    )
                }

                setContacts(prevContacts => {
                    const filtered = prevContacts.filter(contact => contact.phone !== data.fullDocument.phone);
                    const newContacts = [data.fullDocument, ...filtered];
                    return newContacts;
                })
            }

            event.onerror = (err) => {
                console.log("SSE Error:", err);
            }
        })()

        return () => event.close();

    }, [])

    useEffect(() => {
        const isMobile = checkIsMobile();
        (() => { setIsHidden(isMobile); })()
    }, [checkIsMobile])

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
            className={
                'md:max-w-[300px] w-full shrink-0 flex flex-col'
                + ` ${isHidden ? "hidden" : ""}`
            }
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

                            <div
                                className='p-2'
                            >
                                <button
                                    className='flex items-center justify-center py-3 px-4 gap-2 text-theme-primary text-center w-full cursor-pointer font-semibold hover:bg-theme-primary/10 transition-all rounded-xl'
                                    disabled={paginationLoading}
                                    onClick={() => setCurrentPage(prev => ++prev)}
                                >
                                    {
                                        paginationLoading ? (
                                            <RiLoader4Line
                                                size={25}
                                                className='animate-spin'
                                            />
                                        ) : (
                                            <RiArrowDownSLine
                                        size={25}
                                        className='shrink-0'
                                    />
                                        )
                                    }
                                    <span>Load more</span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default ChatSidebar
