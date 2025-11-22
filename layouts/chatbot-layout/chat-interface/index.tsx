import InputTextarea from './input-textarea'
import ChatHistory, { ChatHistoryMessageInterface } from './chat-history'
import { Dispatch, SetStateAction, Suspense } from 'react'
import ChatHeader from './chat-header'
import { ReplayContextDataInterface } from '@/app/app/client-component'

const ChatInterface = ({
  onSubmit,
  chatHistory,
  setChatHistory,
  sending,
  replayContext,
  setReplayContext,
  setIsSidebarOpen,
}: {
  onSubmit: (
    value: string,
    file: File | null,
  ) => void,
  chatHistory: ChatHistoryMessageInterface[],
  setChatHistory: Dispatch<SetStateAction<ChatHistoryMessageInterface[]>>,
  sending: boolean,
  replayContext: ReplayContextDataInterface | null,
  setReplayContext: Dispatch<SetStateAction<ReplayContextDataInterface | null>>,
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
}) => {

  return (
    <div
      className='w-full max-w-full max-h-dvh h-dvh md:h-screen bg-background-2/50 flex flex-col justify-end'
    >
      <ChatHeader
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className='h-full overflow-auto px-5 pb-4'
      >
        <Suspense>
          <ChatHistory 
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            replayContext={replayContext}
            setReplayContext={setReplayContext}
          />
        </Suspense>
      </div>
      <InputTextarea
        onSubmit={onSubmit}
        sending={sending}
        replayContext={replayContext}
        setReplayContext={setReplayContext}
      />
    </div>
  )
}

export default ChatInterface
