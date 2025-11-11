'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import ChatBotLayout from '@/layouts/chatbot-layout'
import { ChatHistoryMessageInterface } from '@/layouts/chatbot-layout/chat-interface/chat-history';
import DashboardLayout from '@/layouts/dashboard'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AppPage = () => {

    const searchparams = useSearchParams();
    const [chatHistory, setChatHistory] = useState<ChatHistoryMessageInterface[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [sending, setSending] = useState<boolean>(false);

    return (
        <DashboardLayout
            pageTitle='Chat Inbox'
            hidePageHeader
        >
            {
                error && (
                    <ErrorTemplate
                        error={error}
                    />
                )
            }
            <ChatBotLayout
                sending={sending}
                onSubmit={async (value, attachment) => {
                    setSending(true);
                    setError(null)

                    try {

                        const phone = searchparams.get("phone");

                        if (!phone) {
                            throw new Error("Phone number not found");
                        }

                        if (!value && !attachment) {
                            throw new Error("Please type somthing!")
                        }

                        await axios.post('/api/whatsapp/change-to-read', { phone });

                        if (attachment) {
                            const formData = new FormData();
                            formData.append('file', attachment);
                            formData.append('phone', phone);

                            await axios.post('/api/whatsapp/send/file', formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            })
                        } else {
                            await axios.post('/api/whatsapp/send', {
                                phone,
                                text: value,
                            })
                        }

                    } catch (err) {
                        const message = handleCatchBlock(err);
                        setError(message);
                    }

                    setSending(false);

                }}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
            />
        </DashboardLayout>
    )
}

export default AppPage
