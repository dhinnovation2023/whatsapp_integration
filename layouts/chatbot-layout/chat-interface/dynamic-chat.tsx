'use client';

import Image from 'next/image';
import { ChatHistoryMessageInterface } from './chat-history'
import { RiDownloadLine } from '@remixicon/react';

const DynamicChatContent = ({
  chat,
}: {
  chat: ChatHistoryMessageInterface,
}) => {

  if (chat.message) {
    return (
      <p
        className='wrap-break-word'
      >{chat.message}</p>
    )
  }

  if (chat.attachments && chat.attachments.mime_type.includes('image/')) {
    return (
      <div
        className='space-y-2'
      >
        <Image
          alt='Chat attachment'
          src={`/api/whatsapp/fetch-files/${encodeURIComponent(chat.attachments.path)}`}
          className='max-w-[150px] w-full rounded-2xl'
          width={500}
          height={1000}
        />

        {
          chat.attachments.caption && (
            <p
              className='text-sm wrap-break-word'
            >{chat.attachments.caption}</p>
          )
        }

      </div>
    )
  }

  if (chat.attachments && chat.attachments.mime_type.includes('audio/')) {
    return (
      <div>
        <audio
          src={`/api/whatsapp/fetch-files/${encodeURIComponent(chat.attachments.path)}`}
          controls
        />
      </div>
    )
  }

  if (chat.attachments) {
    return (
      <div>
        <a
          className='flex max-w-max items-center gap-2 py-2 px-4 bg-neutral-900 rounded-2xl text-white text-xs cursor-pointer'
          href={`/api/whatsapp/fetch-files/${encodeURIComponent(chat.attachments.path)}`}
          rel="noopener noreferrer"
          target='_blank'
        >
          <RiDownloadLine
            size={15}
          />
          <p>Open {chat.attachments?.mime_type}</p>
        </a>
      </div>
    )
  }

  if (chat.location) {
    return (
      <div>
        <iframe
          src={`https://www.google.com/maps?q=${chat.location.latitude},${chat.location.longitude}&hl=en&z=14&output=embed`}
          className='min-h-[200px] w-full rounded-2xl'
        ></iframe>
      </div>
    )
  } else {
    return (
      <p>Message type not configured.</p>
    )
  }

}

export default DynamicChatContent