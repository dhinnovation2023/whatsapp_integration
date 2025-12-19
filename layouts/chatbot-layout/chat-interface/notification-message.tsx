import { FormateDateInMessage } from '@/functions/common'
import { ChatHistoryMessageInterface } from './chat-history'

const NotificationMessage = ({ chat }: {
    chat: ChatHistoryMessageInterface,
}) => {
    return (
        <div
            className='flex items-center justify-center py-2 px-2 bg-theme-primary/10 rounded-2xl'
        >  

            <div
                className='max-w-max bg-theme-primary py-2 px-5 shadow-sm rounded-full text-sm font-semibold text-white'
            >
                <p>
                    {chat.message} | 
                    &nbsp;<FormateDateInMessage timeStanp={Number(chat.date)}/>
                </p>
            </div>

        </div>
    )
}

export default NotificationMessage