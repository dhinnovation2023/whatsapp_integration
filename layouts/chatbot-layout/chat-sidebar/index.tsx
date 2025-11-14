'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { RiArrowDownSLine, RiCloseLargeLine, RiCloseLine, RiEqualizer2Line, RiLoader4Line } from '@remixicon/react'
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import ContactCard from './contact-card';
import { useSearchParams } from 'next/navigation';
import { CustomContactsCardDataInterface } from '@/app/api/whatsapp/fetch-contacts/all/route';
import { FetchContactsFilterOptions } from '@/functions/whatsapp/fetchContacts';
import ContactFilter from './contacts-filter';
import { AnimatePresence } from 'framer-motion';

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
    const loadMoreElement = useRef<HTMLButtonElement>(null)

    // filter
    const [showFilter, setShowFilter] = useState<boolean>(false);
    // selected values
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<{
        value: string,
        apply: boolean,
    }>({
        value: '',
        apply: true,
    });

    const searchParams = useSearchParams();
    const [isHidden, setIsHidden] = useState(false);

    const checkIsMobile = useCallback(() => {
        const phone = searchParams.get('phone');
        const isMobile = phone && window.innerWidth < 500 ? true : false;
        return isMobile;
    }, [searchParams])

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.innerWidth > 500) {
                    setCurrentPage(prev => ++prev)
                }
            });
        })

        if (loadMoreElement.current) {
            observer.observe(loadMoreElement.current);
        }

    }, [isLoading])

    // Normal pagination ans initial fetch
    useEffect(() => {

        if (searchInput.value.length > 0 || !searchInput.apply) {
            return;
        }

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

    }, [currentPage, searchInput])

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

    async function searchContact(type?: "reset") {
        setSearchLoading(true);

        if (type === "reset") {
            setSearchInput(prev => ({
                ...prev,
                value: '',
            }))
        }

        try {
            const requestData: FetchContactsFilterOptions = {
                currentPage: 1,
                search: type === "reset" ? '' : searchInput.value,
            }

            const {
                data,
            } = await axios.post<CustomContactsCardDataInterface[]>(
                '/api/whatsapp/fetch-contacts/all',
                requestData,
            );

            setContacts(data);
            setCurrentPage(1);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setSearchLoading(false);
        setSearchInput(prev => ({
            ...prev,
            apply: true,
        }))
    }

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
                'md:max-w-[320px] w-full shrink-0 flex flex-col'
                + ` ${isHidden ? "hidden" : ""}`
            }
        >
            <div
                className='w-full p-3 border-b border-stroke-light/50'
            >
                <div
                    className='flex items-center gap-1 bg-background-2/70 py-2 pl-4 pr-2 rounded-2xl'
                >
                    <input
                        type="text"
                        className='outline-none w-full'
                        placeholder='Press enter to search'
                        value={searchInput.value}
                        onChange={(event) => {
                            setSearchInput({
                                apply: false,
                                value: event.target.value,
                            })
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                searchContact(!searchInput.value ? "reset" : undefined);
                            }
                        }}
                    />
                    {
                        searchInput.value.length > 0 && (
                            <button
                                className='text-foreground shrink-0 p-2 cursor-pointer'
                                disabled={searchLoading}
                                onClick={() => {
                                    searchContact("reset")
                                }}
                            >
                                {
                                    searchLoading ? (
                                        <RiLoader4Line
                                            size={20}
                                            className='animate-spin'
                                        />
                                    ) : (
                                        <RiCloseLargeLine
                                            size={20}
                                        />
                                    )
                                }
                            </button>
                        )
                    }
                    <button
                        className='text-foreground shrink-0 bg-background rounded-xl p-2 shadow-md cursor-pointer'
                        onClick={() => setShowFilter(prev => !prev)}
                    >
                        {
                            showFilter ? (
                                <RiCloseLine
                                    size={20}
                                />
                            ) : (
                                <RiEqualizer2Line
                                    size={20}
                                />
                            )
                        }
                    </button>
                </div>

                {/* Filters */}
                <AnimatePresence>
                    {
                        showFilter && (
                            <ContactFilter
                                onClose={() => setShowFilter(prev => !prev)}
                            />
                        )
                    }
                </AnimatePresence>
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
                                    key={chat.phone + index}
                                />
                            ))}

                            <div
                                className='p-2'
                            >
                                <button
                                    className='flex items-center justify-center py-3 px-4 gap-2 text-theme-primary text-center w-full cursor-pointer font-semibold hover:bg-theme-primary/10 transition-all rounded-xl'
                                    disabled={paginationLoading}
                                    onClick={() => setCurrentPage(prev => ++prev)}
                                    ref={loadMoreElement}
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
                                    <span>{paginationLoading ? "Loading Contacts..." : "Load more"}</span>
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
