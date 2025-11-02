'use client';

import ChatBotLayout from '@/layouts/chatbot-layout'
import DashboardLayout from '@/layouts/dashboard'

const AppPage = () => {
  return (
    <DashboardLayout
      pageTitle='Chat Inbox'
    >
        <ChatBotLayout
          chatContacts={
            [
              {
                name: "Vishnu",
                isNew: false,
                lastMessage: "Hello",
              },
              {
                name: "Abhilash",
                isNew: true,
                lastMessage: "Hello",
              },
              {
                name: "Soumya",
                isNew: true,
                lastMessage: "Hello",
              }
            ]
          }
          onSubmit={() => {}}
        />
    </DashboardLayout>
  )
}

export default AppPage
