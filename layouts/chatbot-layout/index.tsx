import ChatSidebar from './chat-sidebar'
import ChatInterface from './chat-interface'

const ChatBotLayout = ({
    onSubmit
}: {
    onSubmit: (value: string) => void,
}) => {
    return (
        <div
            className='flex items-stretch min-h-[80dvh] max-h-[80dvh] shadow-2xl shadow-neutral-200 border border-stroke-light bg-background rounded-2xl'
        >
            <ChatSidebar/>
            <ChatInterface
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default ChatBotLayout
