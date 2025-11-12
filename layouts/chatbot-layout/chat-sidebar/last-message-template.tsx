'use client';

import { FormateDateInMessage } from "@/functions/common";
import { MessagesModelInterface } from "@/models/messages";

const LastMessageTemplate = ({ message }: {
    message?: MessagesModelInterface,
}) => {

return (
    <div
        className="space-y-1 flex justify-between gap-3"
    >
        <p
            className="space-x-1 line-clamp-1 text-xs group-hover:hidden"
        >
            {
                message?.message && (
                    <>
                        <span>{message?.message}</span>
                    </>
                )
            }

            {
                message?.attachments && (
                    <>
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
            className="space-x-1 line-clamp-1 text-xs font-semibold text-right text-nowrap hidden group-hover:block min-w-max"
        >
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