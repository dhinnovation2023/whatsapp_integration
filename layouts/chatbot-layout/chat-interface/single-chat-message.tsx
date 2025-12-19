'use client';

import { Dispatch, Ref, SetStateAction, useEffect, useState } from 'react'
import { ChatHistoryMessageInterface } from './chat-history'
import DynamicChatContent from './dynamic-chat'
import { FormateDateInMessage, handleCatchBlock } from '@/functions/common'
import { MessagesModelInterface } from '@/models/messages';
import axios from 'axios';
import { FetchReplayMessageApiRouteMessage } from '@/app/api/whatsapp/fetch-replay-message/route';
import { ReplayContextDataInterface } from '@/app/app/client-component';
import NotificationMessage from './notification-message';

const SingleChatMessage = ({
    chat,
    lastMessageRef,
    setReplayContext,
}: {
    chat: ChatHistoryMessageInterface,
    lastMessageRef?: Ref<HTMLDivElement>,
    replayContext: ReplayContextDataInterface | null,
    setReplayContext: Dispatch<SetStateAction<ReplayContextDataInterface | null>>
}) => {

    const [replayMessage, setReplayMessage] = useState<MessagesModelInterface | null>(null);

    useEffect(() => {
        (async () => {
            try {

                if (chat.context) {
                    const requestData: FetchReplayMessageApiRouteMessage = { wamid: chat.context?.id }
                    const {
                        data,
                    } = await axios.post("/api/whatsapp/fetch-replay-message", requestData);

                    setReplayMessage(data);
                }

            } catch (err) {
                const message = handleCatchBlock(err);
                window.alert(message);
            }
        })()
    }, [chat.context])

    if (chat.messageType === "notification") {
        return (
            <NotificationMessage
                chat={chat}
            />
        )
    }

    return (
        <div
            className={'min-w-[100px] w-max max-w-full md:max-w-[600px] space-y-2 bg-background py-3 px-5 rounded-xl' + ` ${chat.role === "client" ? "self-start" : " self-end"}`}
            ref={lastMessageRef}
        >
            <div
                className='flex items-center justify-between gap-4'
            >
                <p
                    className='text-foreground/60 text-xs'
                >{chat.role === "team" ? chat.chatBy ? chat.chatBy : "not-set" : "Client"}</p>
                <button
                    className='text-xs font-semibold cursor-pointer'
                    onClick={() => {
                        setReplayContext(chat.wamid ? ({wamid: chat.wamid}) : null);
                    }}
                >
                    Replay
                </button>
            </div>

            {
                replayMessage && (
                    <div
                        className='py-3 px-4 bg-background-2/50 rounded-xl border border-stroke-light'
                    >
                        <p
                            className='text-xs text-foreground/70 mb-1'
                        >Replay:</p>
                        <DynamicChatContent
                            chat={{
                                ...replayMessage,
                                date: 'nothing'
                            }}
                        />
                    </div>
                )
            }

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

