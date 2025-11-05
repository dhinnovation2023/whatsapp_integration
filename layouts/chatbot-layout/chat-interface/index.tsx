import InputTextarea from './input-textarea'
import ChatHistory, { ChatHistoryMessageInterface } from './chat-history'
import { Dispatch, SetStateAction, Suspense } from 'react'

const ChatInterface = ({
  onSubmit,
  chatHistory,
  setChatHistory,
  sending,
}: {
  onSubmit: (
    value: string,
    file: File | null,
  ) => void,
  chatHistory: ChatHistoryMessageInterface[],
  setChatHistory: Dispatch<SetStateAction<ChatHistoryMessageInterface[]>>,
  sending: boolean,
}) => {

  return (
    <div
      className='w-full bg-background-2/50 p-5 flex flex-col justify-end space-y-5'
    >
      <div
        className='h-full overflow-auto px-2.5'
      >
        <Suspense>
          <ChatHistory 
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </Suspense>
      </div>
      <InputTextarea
        onSubmit={onSubmit}
        sending={sending}
      />
    </div>
  )
}

export default ChatInterface
