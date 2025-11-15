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
