import InputTextarea from './input-textarea'
import ChatHistory from './chat-history'
import { Suspense } from 'react'

const ChatInterface = ({
  onSubmit,
}: {
  onSubmit: (value: string) => void,
}) => {

  return (
    <div
      className='w-full bg-background-2/50 p-5 flex flex-col justify-end space-y-5'
    >
      <div
        className='h-full overflow-auto'
      >
        <Suspense>
          <ChatHistory />
        </Suspense>
      </div>
      <InputTextarea
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ChatInterface
