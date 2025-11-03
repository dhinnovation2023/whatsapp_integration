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
                onSubmit={async (value) => {
                    setSending(true);

                    try {

                        const phone = searchparams.get("phone");

                        if (!phone) {
                            throw new Error("Phone number not found");
                        }

                        if (!value) {
                            throw new Error("Please type somthing!")
                        }

                        await axios.post('/api/whatsapp/send', {
                            phone,
                            text: value,
                        })

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
