'use client';

import { RiArrowDownSLine, RiCloseLargeLine, RiEqualizer2Line, RiLoader4Line } from '@remixicon/react';
import ContactCard from './contact-card';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CustomContactsCardDataInterface } from '@/app/api/whatsapp/fetch-contacts/all/route';
import { StatusModelInterface } from '@/models/status';
import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { fetchFilteredContacts } from './contacts-filter/fetchContacts';
import ContactInplaceFilter from './contacts-inplace-filter';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const ChatSidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
}) => {

    const searchParams = useSearchParams();

    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

    const [contacts, setContacts] = useState<CustomContactsCardDataInterface[]>([]);
    const [statusList, setStatusList] = useState<StatusModelInterface[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Filters
    const [searchInput, setSearchInput] = useState<string>('');
    const [teamMember, setTeamMember] = useState<string>('');
    const [statusId, setStatusId] = useState<string>('');
    const [enableNoStatus, setEnableNoStatus] = useState<boolean>(false);
    const [unreaded, setUnreaded] = useState<boolean>(false);
    const [enableDateFilter, setEnableDateFilter] = useState<boolean>(false);
    const [date, setDate] = useState<{
        start: Date,
        end: Date,
    }>(() => ({
        start: new Date(Date.now() - (86400000 * 30)),
        end: new Date(),
    }));

    useEffect(() => {
        (async () => {
            try {

                const statusId = searchParams.get('statusId');

                if (statusId) {
                    setStatusId(statusId);
                }

                const noStatus = searchParams.get("no-status");

                if (noStatus === "true") {
                    setEnableNoStatus(true);
                }

                const contacts = await fetchFilteredContacts({
                    currentPage: 1,
                    statusId: statusId || undefined,
                    noStatus: noStatus === "true" || enableNoStatus ? true : false,
                })
                setContacts(contacts);
                setInitialLoading(false)
            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()

        // eslint-disable-next-line
    }, [searchParams.get])

    // useEffect for Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const element = entry.target as HTMLButtonElement;
                    element.click();
                }
            }
        })

        if (loadMoreButtonRef.current) {
            observer.observe(loadMoreButtonRef.current);
        }
    }, [initialLoading])

    // Load all status list
    useEffect(() => {
        (async () => {
            try {
                const {
                    data: statusList,
                } = await axios.post('/api/status/get-all');
                setStatusList(statusList);
            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()
    }, [])

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

    async function handlePagination(target?: number) {
        setInProgress(true);
        try {

            let targetPage: number | null = null;

            if (target) {
                targetPage = target;
            } else {
                const nextPage = currentPage + 1;
                targetPage = nextPage;
            }

            const contacts = await fetchFilteredContacts({
                currentPage: targetPage,
                assigned: teamMember,
                date: enableDateFilter ? ({
                    start: date.start.getTime(),
                    end: date.end.getTime(),
                }) : undefined,
                search: searchInput,
                statusId,
                unread: unreaded,
                noStatus: enableNoStatus,
            })

            setContacts(prev => target ? contacts : [...prev, ...contacts]);
            setCurrentPage(targetPage)

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setInProgress(false);
    }

    if (error) {
        return (
            <ErrorTemplate
                error={error}
            />
        )
    }

    return (
        <div
            className={
                'md:max-w-[400px] md:w-1/2 shrink md:flex flex-col transition-all z-999 md:z-0 fixed md:relative left-0 top-0 bg-background shadow-2xl md:shadow-none max-h-full overflow-hidden' +
                ` ${isSidebarOpen ? "max-w-[320px] flex" : "max-w-0 hidden"}`
            }
        >
            <div
                className='w-full p-3 border-b border-stroke-light/50 space-y-3'
            >
                {
                    isSidebarOpen && (
                        <button
                            className='fixed top-[15px] right-[15px] bg-foreground text-background shadow-md rounded-full w-10 h-10 flex items-center justify-center'
                            onClick={() => setIsSidebarOpen(prev => !prev)}
                        >
                            <RiCloseLargeLine
                                size={20}
                            />
                        </button>
                    )
                }
                <div
                    className='flex items-center gap-1 bg-background-2/70 py-2 pl-4 pr-2 rounded-2xl'
                >
                    <input
                        type="text"
                        className='outline-none w-full'
                        placeholder='Press enter to search'
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handlePagination(1);
                            }
                        }}
                    />
                    <button
                        className='text-foreground shrink-0 bg-background rounded-xl p-2 shadow-md cursor-pointer'
                        onClick={() => {
                            setShowFilter(prev => !prev);
                        }}
                    >
                        <RiEqualizer2Line
                            size={20}
                        />
                    </button>
                </div>

                <AnimatePresence>
                    {
                        showFilter && (
                            <ContactInplaceFilter
                                key={"conteact-filter-inplace"}
                                date={date}
                                enableDateFilter={enableDateFilter}
                                setDate={setDate}
                                setEnableDateFilter={setEnableDateFilter}
                                setTeamMember={setTeamMember}
                                teamMember={teamMember}
                                statusId={statusId}
                                setStatusId={setStatusId}
                                unreaded={unreaded}
                                setUnreaded={setUnreaded}
                                onFilterSubmit={async (event) => {
                                    if (event) {
                                        event.preventDefault();
                                    }
                                    await handlePagination(1);
                                    setShowFilter(false);
                                }}
                                setEnableNoStatus={setEnableNoStatus}
                            />
                        )
                    }
                </AnimatePresence>

            </div>

            <div
                className='overflow-auto min-h-[200px] max-h-full'
            >
                {
                    initialLoading ? (
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
                                    statusList={statusList}
                                />
                            ))}

                            <div
                                className='p-2'
                            >
                                <button
                                    className='flex items-center justify-center py-3 px-4 gap-2 text-theme-primary text-center w-full cursor-pointer font-semibold hover:bg-theme-primary/10 transition-all rounded-xl'
                                    ref={loadMoreButtonRef}
                                    onClick={() => {
                                        handlePagination()
                                    }}
                                >
                                    {
                                        inProgress ? (
                                            <RiLoader4Line
                                                size={25}
                                                className='shrink-0 animate-spin'
                                            />
                                        ) : (
                                            <RiArrowDownSLine
                                                size={25}
                                                className='shrink-0'
                                            />
                                        )
                                    }
                                    <span>{inProgress ? "Loading..." : "Load more"}</span>
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