import ErrorTemplate from '@/components/ui-elements/error-template';
import { FormateDateInMessage, handleCatchBlock, isDifferentDay } from '@/functions/common';
import { MessagesModelInterface } from '@/models/messages';
import { RiArrowUpLine, RiLoader4Line, RiWhatsappLine } from '@remixicon/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import SingleChatMessage from './single-chat-message';
import { ReplayContextDataInterface } from '@/app/app/client-component';
import CreateNewContactElement from '@/components/ui-elements/create-new-contact';

type ChatRole = "client" | "team";

export interface ChatHistoryMessageInterface {
    role: ChatRole,
    date: string,
    message?: string,
    attachments?: {
        path: string,
        mime_type: string,
        caption?: string,
    },
    location?: {
        latitude: number,
        longitude: number,
    },
    chatBy?: string,
    context?: {
        from: string,
        id: string,
    },
    wamid?: string,
    messageType?: "notification",
}

function createChatHistoryMessage(message: MessagesModelInterface): ChatHistoryMessageInterface {
    return ({
        date: message.timestamp,
        role: message.role,
        message: message.message ? message.message : undefined,
        attachments: message.attachments,
        location: message.location,
        chatBy: message.chatBy,
        context: message.context,
        wamid: message.wamid,
        messageType: message.messageType,
    })
}

const ChatHistory = ({
    chatHistory,
    setChatHistory,
    replayContext,
    setReplayContext,
}: {
    chatHistory: ChatHistoryMessageInterface[],
    setChatHistory: Dispatch<SetStateAction<ChatHistoryMessageInterface[]>>,
    replayContext: ReplayContextDataInterface | null,
    setReplayContext: Dispatch<SetStateAction<ReplayContextDataInterface | null>>,
}) => {

    const searchparams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [notSelected, setNotSelected] = useState<boolean>(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationInProgress, setPaginationInProgress] = useState<boolean>(false);

    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {

            setError(null)
            const phone = searchparams.get('phone');

            if (!phone) {
                setNotSelected(true);
                return;
            } else {
                setNotSelected(false);
            }

            try {
                const response = await axios.post<MessagesModelInterface[]>('/api/whatsapp/fetch-message', { phone, currentPage: 1 });
                const history: ChatHistoryMessageInterface[] = [];

                for (const message of response.data) {
                    const data = createChatHistoryMessage(message);
                    history.unshift(data);
                }

                setChatHistory(history)
                setCurrentPage(1);

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()
    }, [searchparams, setChatHistory])

    useEffect(() => {

        const phone = searchparams.get('phone');

        if (!phone) {
            return;
        }

        const evtSource = new EventSource(`/api/whatsapp/updates-event/messages?phone=${phone}`);

        evtSource.onmessage = (e) => {
            const data = JSON.parse(e.data) as {
                fullDocument: MessagesModelInterface,
            };

            setChatHistory(prev => (
                [...prev, createChatHistoryMessage(data.fullDocument)]
            ))
        };

        evtSource.onerror = (err) => {
            console.error('SSE error:', err);
            evtSource.close();
        };

        return () => evtSource.close();

    }, [searchparams, setChatHistory])

    // Scroll to bottom
    useEffect(() => {

        if (paginationInProgress) {
            return;
        }

        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [chatHistory, paginationInProgress])

    async function handleChatHistoryPagination() {
        try {
            const phone = searchparams.get('phone');
            if (!phone) {
                throw new Error("Phone number not found!");
            }

            const nextPage = currentPage + 1;
            const requestData = {
                phone,
                currentPage: nextPage,
            }

            const {
                data: response,
            } = await axios.post<MessagesModelInterface[]>('/api/whatsapp/fetch-message', requestData);

            const messages: ChatHistoryMessageInterface[] = [];

            for (const message of response) {
                const data = createChatHistoryMessage(message);
                messages.unshift(data);
            }

            setChatHistory(prev => (
                [...messages, ...prev]
            ))
        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
    }

    if (error) {
        return (
            <div>
                <ErrorTemplate
                    error={error}
                />
            </div>
        )
    }

    if (notSelected) {
        return (
            <div
                className='h-full p-5'
            >
                <div
                    className='w-full h-full bg-background/60 flex items-center flex-col gap-5 justify-center rounded-4xl shadow-xl shadow-neutral-100'
                >
                    <RiWhatsappLine
                        size={60}
                        className='text-theme-primary'
                    />
                    <div
                        className='text-center flex flex-col items-center gap-2'
                    >
                        <h2
                            className='text-xl font-semibold text-foreground'
                        >Select a Contact to Start Chatting</h2>
                        <p
                            className='text-foreground/50 max-w-[300px] text-sm'
                        >Choose a contact from your list to view messages and start a conversation.</p>

                        <div
                            className='pt-5 pb-3'
                        >
                            <CreateNewContactElement />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className='flex flex-col w-full gap-3 min-h-max'
        >
            <button
                className='py-1 px-3 bg-theme-primary rounded-full max-w-max mx-auto my-3 flex items-center gap-2 text-white font-semibold cursor-pointer'
                onClick={async () => {
                    setPaginationInProgress(true);
                    await handleChatHistoryPagination();
                    await new Promise(resolve => setTimeout(resolve, 500))
                    setPaginationInProgress(false);
                }}
            >
                {
                    paginationInProgress ? (
                        <RiLoader4Line
                            size={20}
                            className='animate-spin'
                        />
                    ) : (
                        <RiArrowUpLine
                            size={20}
                        />
                    )
                }
                <p>{paginationInProgress ? "Loading..." : "Load more"}</p>
            </button>
            {chatHistory.map((chat, index, chats) => {

                const prevDay = chats[index - 1];

                if (prevDay) {
                    const currentDate = new Date(chat.role === "client" ? parseInt(chat.date) * 1000 : parseInt(chat.date));
                    const prevDayDate = new Date(prevDay.role === "client" ? parseInt(prevDay.date) * 1000 : parseInt(prevDay.date));

                    if (isDifferentDay(currentDate, prevDayDate)) {
                        return (
                            <Fragment
                                key={chat.wamid ? chat.wamid + index : index}
                            >
                                <div
                                    className='flex items-center justify-center bg-background-2/80 rounded-2xl py-2'
                                >
                                    <p
                                        className='bg-background text-xs py-2 px-4 rounded-full font-semibold'
                                    >
                                        {FormateDateInMessage({ timeStanp: currentDate.getTime() }).split(' ')[0]}
                                    </p>
                                </div>
                                <SingleChatMessage
                                    chat={chat}
                                    lastMessageRef={(chats.length - 1) === index ? lastMessageRef : undefined}
                                    replayContext={replayContext}
                                    setReplayContext={setReplayContext}
                                />
                            </Fragment>
                        )
                    }
                }

                return (
                    <SingleChatMessage
                        key={chat.wamid ? chat.wamid + index : index}
                        chat={chat}
                        lastMessageRef={(chats.length - 1) === index ? lastMessageRef : undefined}
                        replayContext={replayContext}
                        setReplayContext={setReplayContext}
                    />
                )

            })}
        </div>
    )
}

export default ChatHistory
export { type ChatRole }
