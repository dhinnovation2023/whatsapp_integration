'use client';

import ErrorTemplate from "@/components/ui-elements/error-template";
import { MessagesModelInterface } from "@/models/messages";
import { RiCloseLargeLine, RiLoader4Line } from "@remixicon/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DynamicChatContent from "./dynamic-chat";
import { ChatHistoryMessageInterface } from "./chat-history";
import { FormateDateInMessage, handleCatchBlock } from "@/functions/common";
import { FetchReplayMessageApiRouteMessage } from "@/app/api/whatsapp/fetch-replay-message/route";
import axios from "axios";
import { ReplayContextDataInterface } from "@/app/app/client-component";
import { useSearchParams } from "next/navigation";

const SelectedReplayMessage = ({ wamid, setReplayContext }: {
  wamid: string,
  setReplayContext: Dispatch<SetStateAction<ReplayContextDataInterface | null>>,
}) => {

  const [replayMessage, setReplayMessage] = useState<ChatHistoryMessageInterface | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setInProgress(true);
      try {
        const requestData: FetchReplayMessageApiRouteMessage = {
          wamid,
        }

        const { data } = await axios.post<MessagesModelInterface>('/api/whatsapp/fetch-replay-message', requestData);

        const message: ChatHistoryMessageInterface = {
          date: data.timestamp,
          role: data.role,
          message: data.message ? data.message : undefined,
          attachments: data.attachments,
          location: data.location,
          chatBy: data.chatBy,
          context: data.context,
          wamid: data.wamid,
        }

        setReplayMessage(message);

      } catch (err) {
        const message = handleCatchBlock(err);
        setError(message);
      }
      setInProgress(false);
    })()
  }, [wamid])

  useEffect(() => {
    (() => {
      if (initialLoad) {
        setInitialLoad(false);
        return;
      }

      setReplayContext(null);

    })()
    // eslint-disable-next-line
  }, [searchParams])

  if (inProgress) {
    return (
      <div
        className="flex items-center py-3 px-4"
      >
        <RiLoader4Line
          size={20}
          className="animate-spin"
        />
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorTemplate
        error={error}
      />
    )
  }

  if (replayMessage) {
    return (
      <div
        className="py-3"
      >
        <div
          className="shadow-md bg-background rounded-2xl py-3 px-4 space-y-2 flex items-center justify-between"
        >
          <div>
            <p
              className="text-xs text-theme-primary"
            >Message from: <b>{replayMessage.role === "client" ? "Client" : "You"}</b></p>
            <DynamicChatContent
              chat={replayMessage}
              hideTranslate={true}
            />
            <p
              className="text-xs"
            >
              <FormateDateInMessage
                timeStanp={replayMessage.role === "client" ? parseInt(replayMessage.date) * 1000 : parseInt(replayMessage.date)}
              />
            </p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => {
              setReplayContext(null);
            }}
          >
            <RiCloseLargeLine
              size={20}
            />
          </button>
        </div>
      </div>
    )
  }
}

export default SelectedReplayMessage