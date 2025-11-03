import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { MessagesModelInterface } from '@/models/messages';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type ChatRole = "client" | "team";

export interface ChatHistoryMessageInterface {
    role: ChatRole,
    message: string,
    date: string,
}

const ChatHistory = () => {

    const searchparams = useSearchParams();

    const [chatHistory] = useState<ChatHistoryMessageInterface[]>([]);
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
                console.log(response.data)
            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()
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
            className='flex flex-col w-full gap-3'
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
