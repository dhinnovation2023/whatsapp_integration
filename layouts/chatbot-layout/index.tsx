'use client';

import ChatInterface from './chat-interface'
import { ChatHistoryMessageInterface } from './chat-interface/chat-history'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ChatSidebar from './chat-sidebar'
import { ReplayContextDataInterface } from '@/app/app/client-component'
import { useSearchParams } from 'next/navigation';

const ChatBotLayout = ({
    onSubmit,
    chatHistory,
    setChatHistory,
    sending,
    replayContext,
    setReplayContext,
}: {
    onSubmit: (
        value: string,
        file: File | null,
    ) => void,
    chatHistory: ChatHistoryMessageInterface[],
    setChatHistory: Dispatch<SetStateAction<ChatHistoryMessageInterface[]>>,
    sending: boolean,
    replayContext: ReplayContextDataInterface | null,
    setReplayContext: Dispatch<SetStateAction<ReplayContextDataInterface | null>>,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [searchParams])

    return (
        <div
            className='flex flex-col md:flex-row items-stretch min-h-dvh max-h-screen md:min-h-[95dvh] md:max-h-[80dvh] shadow-2xl shadow-neutral-200 border border-stroke-light bg-background md:rounded-2xl overflow-hidden'
        >
            <ChatSidebar 
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <ChatInterface
                onSubmit={onSubmit}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                sending={sending}
                replayContext={replayContext}
                setReplayContext={setReplayContext}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        </div>
    )
}

export default ChatBotLayout
