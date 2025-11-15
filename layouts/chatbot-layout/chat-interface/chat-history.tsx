import ErrorTemplate from '@/components/ui-elements/error-template';
import { FormateDateInMessage, handleCatchBlock, isDifferentDay } from '@/functions/common';
import { MessagesModelInterface } from '@/models/messages';
import { RiWhatsappLine } from '@remixicon/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import SingleChatMessage from './single-chat-message';
import { ReplayContextDataInterface } from '@/app/app/client-component';

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
                const response = await axios.post<MessagesModelInterface[]>('/api/whatsapp/fetch-message', { phone });
                const history: ChatHistoryMessageInterface[] = [];

                for (const message of response.data) {
                    const data: ChatHistoryMessageInterface = {
                        date: message.timestamp,
                        role: message.role,
                        message: message.message ? message.message : undefined,
                        attachments: message.attachments,
                        location: message.location,
                        chatBy: message.chatBy,
                        context: message.context,
                        wamid: message.wamid,
                    }

                    history.push(data);
                }

                setChatHistory(history)

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
                [...prev, {
                    date: data.fullDocument.timestamp,
                    role: data.fullDocument.role,
                    message: data.fullDocument.message ? data.fullDocument.message : undefined,
                    attachments: data.fullDocument.attachments || undefined,
                    location: data.fullDocument.location || undefined,
                    chatBy: data.fullDocument.chatBy,
                    context: data.fullDocument.context,
                    wamid: data.fullDocument.wamid,
                }]
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
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [chatHistory])

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
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className='flex flex-col w-full gap-3 min-h-max'
        >
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
