import React from 'react'

type ChatRole = "client" | "team";

export interface ChatHistoryMessageInterface {
    role: ChatRole,
    message: string,
    date: string,
}

const ChatHistory = ({
    chatHistory,
}: {
    chatHistory: ChatHistoryMessageInterface[],
}) => {
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
