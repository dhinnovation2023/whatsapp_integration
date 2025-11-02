import React from 'react'
import InputTextarea from './input-textarea'
import ChatHistory, { ChatHistoryMessageInterface } from './chat-history'

const ChatInterface = ({
  chatHistory,
  onSubmit,
}: {
  onSubmit: (value: string) => void,
  chatHistory: ChatHistoryMessageInterface[],
}) => {
  return (
    <div
      className='w-full bg-background-2/50 p-5 flex flex-col justify-end space-y-5'
    >
      <div
        className='h-full flex items-end'
      >
        <ChatHistory
          chatHistory={chatHistory}
        />
      </div>
      <InputTextarea
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ChatInterface
