'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { StatusModelInterface } from '@/models/status'
import { RiLoader4Line } from '@remixicon/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import StatusEditMode from './edit-mode';

const StatusListItem = ({
  item,
}: {
  item: StatusModelInterface,
}) => {

  const [error, setError] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [mode, setMode] = useState<"edit" | "view">("view");
  const router = useRouter();

  async function handleDeleteStatus() {

    const confirm = window.confirm(`Please confirm to delete ${item.name}`);

    if (!confirm) {
      return;
    }

    setInProgress(true);
    try {
      const requestData: { statusId: string } = {
        statusId: item.statusId,
      }

      await axios.post('/api/status/delete', requestData);
    } catch (err) {
      const message = handleCatchBlock(err);
      setError(message);
    }
    setInProgress(false);
    router.refresh();
  }

  if (error) {
    return (
      <ErrorTemplate
        error={error}
      />
    )
  }

  if (mode === "edit") {
    return (
      <StatusEditMode
        item={item}
        onClose={() => {
          setMode("view");
          router.refresh();
        }}
      />
    )
  }

  return (
    <div
      className='bg-background-2 py-2 px-4 flex items-center gap-5 justify-between rounded-2xl'
    >
      <div
        className='flex items-center gap-3'
      >
        <div
          className='min-h-2.5 min-w-2.5 rounded-full'
          style={{
            background: `${item.color}`,
          }}
        />
        <p
          className='font-semibold'
        >{item.name}</p>
      </div>
      <div
        className='flex items-center gap-2'
      >
        {
          [
            {
              label: "Edit",
              onClick: () => {
                setMode("edit")
              },
            },
            {
              label: "Delete",
              onClick: handleDeleteStatus,
            }
          ].map((item, index) => (
            <button
              onClick={item.onClick}
              key={index}
              className='min-w-max py-2 px-4 rounded-2xl bg-foreground text-background cursor-pointer'
            >
              {item.label}
            </button>
          ))
        }

        {
          inProgress && (
            <div>
              <RiLoader4Line
                size={20}
                className='animate-spin'
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default StatusListItem