import { ChangeContactStatusRequestDataInterface } from '@/app/api/whatsapp/update-status/route';
import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common'
import { ContactsModelInterface } from '@/models/contacts';
import { StatusModelInterface } from '@/models/status';
import { RiArrowDownSLine, RiLoader4Line } from '@remixicon/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

const StatusSettings = ({ currentChat }: {
    currentChat: ContactsModelInterface | null,
}) => {

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const [statusList, setStatusList] = useState<StatusModelInterface[]>([]);
    const [currentStatus, setCurrentStatus] = useState<StatusModelInterface | null>(null);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            setInProgress(true);

            try {
                const response = await axios.post<StatusModelInterface[]>('/api/status/get-all');
                setStatusList(response.data);

                const currentStatus = response.data.find((item) => item.statusId === currentChat?.statusId)

                setCurrentStatus(currentStatus || null);

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }

            setInProgress(false);
        })()
    }, [currentChat?.statusId])

    async function handleStatusChange (newStatus: StatusModelInterface) {
        setInProgress(true);
        try {
            const requestData: ChangeContactStatusRequestDataInterface = {
                phone: currentChat?.phone,
                statusId: newStatus?.statusId,
            }
            await axios.post('/api/whatsapp/update-status', requestData);
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

    if (inProgress) {
        return (
            <div>
                <RiLoader4Line
                    size={20}
                    className='animate-spin'
                />
            </div>
        )
    }

    return (
        <div
            className='relative'
        >
            <button
                className='py-2 px-4 rounded-2xl cursor-pointer flex items-center gap-3 text-sm text-white'
                onClick={() => {
                    setShowPopup(prev => !prev)
                }}
                style={{
                    backgroundColor: !currentStatus ? "var(--foreground)" : currentStatus.color,
                }}
            >
                <p
                    className='line-clamp-1'
                >{currentStatus ? currentStatus.name : "-- Select Status --"}</p>
                <RiArrowDownSLine
                    size={15}
                />
            </button>

            {
                showPopup && (
                    <div
                        className='py-2 px-3 border border-stroke-light rounded-2xl absolute top-11 right-0 bg-background'
                    >
                        <div
                            className='space-y-2'
                        >
                            {statusList.map((status, index) => (
                                <button
                                    key={index}
                                    className='flex items-center py-1 px-3 text-sm rounded-2xl w-full cursor-pointer gap-2'
                                    style={{
                                        backgroundColor: `${status.color}10`,
                                        color: status.color,
                                    }}
                                    onClick={() => {
                                        setCurrentStatus(status)
                                        setShowPopup(false);
                                        handleStatusChange(status)
                                    }}
                                >
                                    <p>{status.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default StatusSettings