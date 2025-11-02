import ChatSidebar, { ChatContactsInterface } from './chat-sidebar'
import ChatInterface from './chat-interface'

const ChatBotLayout = ({
    chatContacts,
    onSubmit
}: {
    chatContacts: ChatContactsInterface[],
    onSubmit: (value: string) => void,
}) => {
    return (
        <div
            className='flex items-stretch min-h-[80dvh] max-h-[80dvh] shadow-2xl shadow-neutral-200 border border-stroke-light bg-background rounded-2xl'
        >
            <ChatSidebar
                chatContacts={chatContacts}
            />
            <ChatInterface
                onSubmit={onSubmit}
                chatHistory={[
                    {
                        role: "client",
                        date: "12-11-2003",
                        message: "Test message"
                    },
                    {
                        role: "team",
                        date: "12-11-2003",
                        message: "Test message"
                    },
                    {
                        role: "client",
                        date: "12-11-2003",
                        message: "Test message"
                    },
                ]}
            />
        </div>
    )
}

export default ChatBotLayout
