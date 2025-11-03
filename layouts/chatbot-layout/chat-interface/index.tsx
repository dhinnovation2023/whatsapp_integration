import InputTextarea from './input-textarea'
import ChatHistory from './chat-history'

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
        className='h-full flex items-end'
      >
        <ChatHistory/>
      </div>
      <InputTextarea
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ChatInterface
