'use client';

import Image from 'next/image';
import { ChatHistoryMessageInterface } from './chat-history'
import { RiDownloadLine, RiMicFill, RiMultiImageFill } from '@remixicon/react';
import { useState } from 'react';

const DynamicChatContent = ({
  chat,
}: {
  chat: ChatHistoryMessageInterface,
}) => {

  const [loadAttachment, setLoadAttachment] = useState<boolean>(false);

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
        <div>
          {
            loadAttachment ? (
              <Image
                alt='Chat attachment'
                src={`/api/whatsapp/fetch-files/${encodeURIComponent(chat.attachments.path)}`}
                className='max-w-[150px] w-full rounded-2xl'
                width={500}
                height={1000}
              />
            ) : (
              <div
                className='space-y-2'
              >
                <RiMultiImageFill
                  size={20}
                  className='w-[50px] h-[50px] rounded-xl p-3 bg-black/5'
                />
                <button
                  className='text-theme-primary font-semibold text-sm cursor-pointer'
                  onClick={() => setLoadAttachment(true)}
                >
                  Load image
                </button>
              </div>
            )
          }
        </div>

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
        {
          loadAttachment ? (
            <audio
              src={`/api/whatsapp/fetch-files/${encodeURIComponent(chat.attachments.path)}`}
              controls
            />
          ) : (
            <div
              className='flex items-center gap-3'
            >
              <RiMicFill
                size={20}
                className='shrink-0'
              />
              <button
                className='text-theme-primary font-semibold text-sm cursor-pointer'
                onClick={() => setLoadAttachment(true)}
              >Load voice record</button>
            </div>
          )
        }
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