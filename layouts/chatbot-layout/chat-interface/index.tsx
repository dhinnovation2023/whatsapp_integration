import InputTextarea from './input-textarea'
import ChatHistory, { ChatHistoryMessageInterface } from './chat-history'
import { Dispatch, SetStateAction, Suspense } from 'react'
import ChatHeader from './chat-header'

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
      className='w-full max-w-full max-h-screen h-[95dvh] bg-background-2/50 flex flex-col justify-end'
    >
      <ChatHeader/>
      <div
        className='h-full overflow-auto px-5 pb-4'
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
