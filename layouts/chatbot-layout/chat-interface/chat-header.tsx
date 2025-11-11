import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { ContactsModelInterface } from '@/models/contacts';
import { RiLoader4Line } from '@remixicon/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

const ChatHeader = () => {

    const [currentChatDetails, setCurrentChatDetails] = useState<ContactsModelInterface | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        (async () => {

            setInProgress(true);
            try {

                const phone = searchParams.get('phone');
                const { data } = await axios.post<ContactsModelInterface>("/api/whatsapp/fetch-contacts/get-one-by-phone", { phone })

                setCurrentChatDetails(data);

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }

            setInProgress(false);
        })()
    }, [searchParams])

    if (error) {
        return (
            <ErrorTemplate
                error={error}
            />
        )
    }

    return (
        <div
            className='border-b border-stroke-light py-4 px-5 min-h-[60px] flex items-center'
        >
            {
                inProgress ? (
                    <div
                        className='flex items-center gap-3'
                    >
                        <RiLoader4Line
                            size={25}
                            className='animate-spin'
                        />
                        <p>Loading Chat...</p>
                    </div>
                ) : (
                    <div>
                        <p
                            className='text-sm font-semibold capitalize'
                        >{currentChatDetails?.name}</p>
                        <p
                            className='text-xs'
                        >{currentChatDetails?.phone}</p>
                    </div>
                )
            }
        </div>
    )
}

export default ChatHeader