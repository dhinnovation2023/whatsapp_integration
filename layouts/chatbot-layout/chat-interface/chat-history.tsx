import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { MessagesModelInterface } from '@/models/messages';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type ChatRole = "client" | "team";

export interface ChatHistoryMessageInterface {
    role: ChatRole,
    message?: string,
    date: string,
}

const ChatHistory = () => {

    const searchparams = useSearchParams();

    const [chatHistory, setChatHistory] = useState<ChatHistoryMessageInterface[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {

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
                        message: message.message,
                        role: message.role,
                    }

                    history.push(data);
                }

                setChatHistory(history)

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()
    }, [searchparams])

    useEffect(() => {

        const phone = searchparams.get('phone');

        if (!phone) {
            setError("Phone is required");
            return;
        }

        const evtSource = new EventSource(`/api/whatsapp/updates-event/messages?phone=${phone}`);

        evtSource.onmessage = (e) => {
            const data = JSON.parse(e.data) as {
                fullDocument: MessagesModelInterface,
            };
            setChatHistory(prev => (
                [...prev, {
                    date: "11-11-2023",
                    role: data.fullDocument.role,
                    message: data.fullDocument.message,
                }]
            ))
        };

        evtSource.onerror = (err) => {
            console.error('SSE error:', err);
            evtSource.close();
        };

        return () => evtSource.close();

    }, [searchparams])

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
            {chatHistory.map((chat, index) => (
                <div
                    key={index}
                    className={'min-w-[40%] w-max space-y-2 bg-background py-3 px-5 rounded-xl' + ` ${chat.role === "client" ? "self-start" : " self-end"}`}
                >
                    <p
                        className='text-foreground/60 text-xs'
                    >{chat.role === "team" ? "Abhilash" : "Client"}</p>

                    <p>{chat.message}</p>

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
