import { handleCatchBlock } from '@/functions/common';
import { ContactsModelInterface } from '@/models/contacts';
import { RiLoader4Line, RiMenuLine } from '@remixicon/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SaveContactPopup from '../../chat-sidebar/save-contact-popup';
import StatusSettings from './status-settings';

const ChatHeader = ({ setIsSidebarOpen }: {
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
}) => {

    const [currentChatDetails, setCurrentChatDetails] = useState<ContactsModelInterface | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState<boolean>(false);

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
                console.log(message);
                setCurrentChatDetails(null);
            }

            setInProgress(false);
        })()
    }, [searchParams, showSettingsPopup])

    return (
        <div
            className='border-b border-stroke-light py-4 px-5 min-h-[60px] flex gap-2 items-center justify-between bg-background'
        >
            <div
                className='flex items-center gap-2'
            >
                <div
                    className='flex md:hidden'
                >
                    <button
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                    >
                        <RiMenuLine
                            size={20}
                        />
                    </button>
                </div>
                <div>
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
                                <button
                                    className='text-sm font-semibold capitalize cursor-pointer line-clamp-1 text-left'
                                    onClick={() => setShowSettingsPopup(true)}
                                >{currentChatDetails?.name}</button>
                                <p
                                    className='text-xs'
                                >{currentChatDetails?.phone}</p>
                            </div>
                        )
                    }

                    {
                        showSettingsPopup && currentChatDetails ? (
                            <SaveContactPopup
                                defaultName={currentChatDetails.name}
                                onClose={() => setShowSettingsPopup(false)}
                                phone={currentChatDetails.phone}
                            />
                        ) : null
                    }
                </div>
            </div>
            {
                !inProgress && currentChatDetails ? (
                    <StatusSettings
                        currentChat={currentChatDetails}
                    />
                ) : null
            }
        </div>
    )
}

export default ChatHeader