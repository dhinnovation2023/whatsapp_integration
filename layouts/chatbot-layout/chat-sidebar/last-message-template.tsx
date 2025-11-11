'use client';

import { FormateDateInMessage } from "@/functions/common";
import { MessagesModelInterface } from "@/models/messages";

const LastMessageTemplate = ({ message }: {
    message?: MessagesModelInterface,
}) => {

return (
    <div
        className="space-y-1"
    >
        <p
            className="space-x-1 line-clamp-1 text-xs"
        >
            {
                message?.message && (
                    <>
                        <b>Message:</b>
                        <span>{message?.message}</span>
                    </>
                )
            }

            {
                message?.attachments && (
                    <>
                        <b>Attachement:</b>
                        <span>{message?.attachments?.mime_type}</span>
                    </>
                )
            }

            {
                message?.location && (
                    <>
                        <b>Loaction {message?.role === "client" ? "received" : "Sended"}</b>
                    </>
                )
            }
        </p>
        <p
            className="space-x-1 line-clamp-1 text-xs"
        >
            <b>Last chat:</b>
            <span>
                {
                    message?.role === "client" ? (
                        <FormateDateInMessage
                            timeStanp={parseInt(message?.timestamp || '0') * 1000}
                        />
                    ) : (
                        <FormateDateInMessage
                            timeStanp={parseInt(message?.timestamp || '0')}
                        />
                    )
                }
            </span>
        </p>
    </div>
)

}

export default LastMessageTemplate