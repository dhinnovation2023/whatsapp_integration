import { Ref } from 'react'
import { ChatHistoryMessageInterface } from './chat-history'
import DynamicChatContent from './dynamic-chat'

const SingleChatMessage = ({
    chat,
    lastMessageRef,
}: {
    chat: ChatHistoryMessageInterface,
    lastMessageRef?: Ref<HTMLDivElement>,
}) => {
    return (
        <div
            className={'min-w-[100px] w-max max-w-full md:max-w-[600px] space-y-2 bg-background py-3 px-5 rounded-xl' + ` ${chat.role === "client" ? "self-start" : " self-end"}`}
            ref={lastMessageRef}
        >
            <p
                className='text-foreground/60 text-xs'
            >{chat.role === "team" ? chat.chatBy ? chat.chatBy : "not-set" : "Client"}</p>

            {
                <DynamicChatContent
                    chat={chat}
                />
            }

            <p
                className='text-xs text-foreground/60 text-right'
            >
                {
                    chat.role === "client" ? (
                        <FormateDateInMessage
                            timeStanp={parseInt(chat.date) * 1000}
                        />
                    ) : (
                        <FormateDateInMessage
                            timeStanp={parseInt(chat.date)}
                        />
                    )
                }
            </p>
        </div>
    )
}

export default SingleChatMessage

function FormateDateInMessage({ timeStanp }: {
    timeStanp: number
}) {
    const date = new Date(timeStanp)

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const formattedDate = `${day}/${month}/${year} ${formattedTime}`;
    return formattedDate;

}