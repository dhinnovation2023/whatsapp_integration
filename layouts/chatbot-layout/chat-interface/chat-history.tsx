import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { MessagesModelInterface } from '@/models/messages';
import { RiWhatsappLine } from '@remixicon/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import SingleChatMessage from './single-chat-message';

type ChatRole = "client" | "team";

export interface ChatHistoryMessageInterface {
    role: ChatRole,
    date: string,
    message?: string,
    attachments?: {
        path: string,
        mime_type: string,
    },
    location?: {
        latitude: number,
        longitude: number,
    }
}

const ChatHistory = ({
    chatHistory,
    setChatHistory,
}: {
    chatHistory: ChatHistoryMessageInterface[],
    setChatHistory: Dispatch<SetStateAction<ChatHistoryMessageInterface[]>>,
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
            {chatHistory.map((chat, index, chats) => (
                <SingleChatMessage
                    key={index}
                    chat={chat}
                    lastMessageRef={(chats.length - 1) === index ? lastMessageRef : undefined}
                />
            ))}
        </div>
    )
}

export default ChatHistory
export { type ChatRole }
