'use client';

import ChatBotLayout from '@/layouts/chatbot-layout'
import DashboardLayout from '@/layouts/dashboard'
import { useState } from 'react';

const AppPage = () => {

  const [] = useState<boolean>();
  const [] = useState<string>();
  const [] = useState<boolean>();

  return (
    <DashboardLayout
      pageTitle='Chat Inbox'
    >
        <ChatBotLayout
          onSubmit={() => {}}
        />
    </DashboardLayout>
  )
}

export default AppPage
