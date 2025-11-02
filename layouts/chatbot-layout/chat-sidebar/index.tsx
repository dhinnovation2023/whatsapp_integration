import { RiSearchLine, RiUser6Line } from '@remixicon/react'

export interface ChatContactsInterface {
    name: string,
    lastMessage: string,
    isNew: boolean,
}

const ChatSidebar = ({ chatContacts }: {
    chatContacts: ChatContactsInterface[],
}) => {
    return (
        <div
            className='min-w-[400px] shrink-0 flex flex-col'
        >
            <div
                className='w-full p-3 border-b border-stroke-light/50'
            >
                <div
                    className='flex items-center gap-1 bg-background-2/70 py-3 px-4 rounded-2xl'
                >
                    <input
                        type="text"
                        className='outline-none w-full'
                        placeholder='Enter name'
                    />
                    <button
                        className='text-black/40 shrink-0'
                    >
                        <RiSearchLine />
                    </button>
                </div>
            </div>

            <div
                className='overflow-auto'
            >
                <div
                    className='space-y-0 min-h-max'
                >
                    {chatContacts.map((chat, index) => (
                        <button
                            key={index}
                            className={'flex items-center gap-3 w-full py-4 px-5 cursor-pointer hover:bg-stroke-light/10 border-b border-stroke-light/50'}
                        >
                            <div
                                className='w-[50px] h-[50px] bg-background-2 rounded-full flex items-center justify-center shrink-0'
                            >
                                <RiUser6Line
                                    size={20}
                                />
                            </div>
                            <div
                                className='space-y-0.5 w-full text-left'
                            >
                                <h3
                                    className='text-sm font-semibold'
                                >Abhilash</h3>
                                <p
                                    className='text-xs'
                                >Manager</p>
                            </div>

                            {
                                chat.isNew && (
                                    <div
                                        className='min-w-[25px] h-[25px] text-xs flex items-center justify-center rounded-full bg-green-400'
                                    >1</div>
                                )
                            }
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ChatSidebar
