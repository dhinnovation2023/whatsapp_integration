import ChatSidebar from './chat-sidebar'
import ChatInterface from './chat-interface'
import { ChatHistoryMessageInterface } from './chat-interface/chat-history'
import { Dispatch, SetStateAction } from 'react'

const ChatBotLayout = ({
    onSubmit,
    chatHistory,
    setChatHistory,
    sending,
}: {
    onSubmit: (
        value: string,
        file: File | null,
    ) => void,
    chatHistory: ChatHistoryMessageInterface[],
    setChatHistory: Dispatch<SetStateAction<ChatHistoryMessageInterface[]>>,
    sending: boolean,
}) => {
    return (
        <div
            className='flex items-stretch min-h-[95dvh] max-h-[80dvh] shadow-2xl shadow-neutral-200 border border-stroke-light bg-background rounded-2xl'
        >
            <ChatSidebar />
            <ChatInterface
                onSubmit={onSubmit}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                sending={sending}
            />
        </div>
    )
}

export default ChatBotLayout
