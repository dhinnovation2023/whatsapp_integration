'use client';

import { FormateDateInMessage } from "@/functions/common";
import { MessagesModelInterface } from "@/models/messages";
import { JSX, ReactElement, useState } from "react";

const LastMessageTemplate = ({ message }: {
    message?: MessagesModelInterface,
}) => {

    let MessageElement: () => JSX.Element;

    if (message?.message) {
        MessageElement = () => (
            <>
                <b>Message:</b>
                <span>{message?.message}</span>
            </>
        )
    }

    else if (message?.attachments) {
        MessageElement = () => (
            <>
                <b>Attachement:</b>
                <span>{message?.attachments?.mime_type}</span>
            </>
        )
    }

    else if (message?.location) {
        MessageElement = () => (
            <>
                <b>Loaction {message?.role === "client" ? "received" : "Sended"}</b>
            </>
        )
    }

    else {
        MessageElement = () => (
            <>
                New message.
            </>
        )
    }


    return (
        <div
            className="space-y-1"
        >
            <p
                className="space-x-1 line-clamp-1 text-xs"
            >
                <MessageElement />
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