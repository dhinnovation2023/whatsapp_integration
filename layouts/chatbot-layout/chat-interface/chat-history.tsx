import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { MessagesModelInterface } from '@/models/messages';
import { RiDownloadLine } from '@remixicon/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type ChatRole = "client" | "team";

export interface ChatHistoryMessageInterface {
    role: ChatRole,
    date: string,
    message?: string,
    attachments?: {
        path: string,
        mime_type: string,
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

    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {

            setError(null)
            const phone = searchparams.get('phone');

            if (!phone) {
                setError("Phone number is required!");
                return;
            }

            try {
                const response = await axios.post<MessagesModelInterface[]>('/api/whatsapp/fetch-message', { phone });
                const history: ChatHistoryMessageInterface[] = [];

                for (const message of response.data) {
                    const data: ChatHistoryMessageInterface = {
                        date: "11-11-2023",
                        role: message.role,
                        message: message.message ? message.message : undefined,
                        attachments: message.attachments,
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
            // eslint-disable-next-line
            setError("Phone is required");
            return;
        }

        const evtSource = new EventSource(`/api/whatsapp/updates-event/messages?phone=${phone}`);

        evtSource.onmessage = (e) => {
            const data = JSON.parse(e.data) as {
                fullDocument: MessagesModelInterface,
            };

            console.log(data);
            setChatHistory(prev => (
                [...prev, {
                    date: "11-11-2023",
                    role: data.fullDocument.role,
                    message: data.fullDocument.message ? data.fullDocument.message : undefined,
                    attachments: data.fullDocument.attachments || undefined,
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

    return (
        <div
            className='flex flex-col w-full gap-3 min-h-max'
        >
            {chatHistory.map((chat, index, chats) => (
                <div
                    key={index}
                    className={'min-w-[40%] w-max space-y-2 bg-background py-3 px-5 rounded-xl' + ` ${chat.role === "client" ? "self-start" : " self-end"}`}
                    ref={(chats.length - 1) === index ? lastMessageRef : undefined}
                >
                    <p
                        className='text-foreground/60 text-xs'
                    >{chat.role === "team" ? "Abhilash" : "Client"}</p>

                    {
                        chat.message && (
                            <p>{chat.message}</p>
                        )
                    }

                    {
                        chat.attachments && chat.attachments.mime_type.includes('image/') ? (
                            <div>
                                <Image
                                    alt='Chat attachment'
                                    src={`/api/whatsapp/fetch-files/${encodeURIComponent(chat.attachments.path)}`}
                                    className='max-w-[150px] w-full rounded-2xl'
                                    width={500}
                                    height={1000}
                                />
                            </div>
                        ) : chat.attachments ? (
                            <div>
                                <a
                                    className='flex max-w-max items-center gap-2 py-2 px-4 bg-neutral-900 rounded-2xl text-white text-xs cursor-pointer'
                                    href={`/api/whatsapp/fetch-files/${encodeURIComponent(chat.attachments.path)}`}
                                    rel="noopener noreferrer"
                                    target='_blank'
                                >
                                    <RiDownloadLine
                                        size={15}
                                    />
                                    <p>Open {chat.attachments?.mime_type}</p>
                                </a>
                            </div>
                        ) : null
                    }

                    <p
                        className='text-xs text-foreground/60 text-right'
                    >{chat.date.split('-').join('/')}</p>
                </div>
            ))}
        </div>
    )
}

export default ChatHistory
export { type ChatRole }
