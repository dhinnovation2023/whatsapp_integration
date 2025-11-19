import { UpdateStatusApiRouteRequestData } from '@/app/api/status/update/route';
import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common';
import { StatusModelInterface } from '@/models/status'
import { RiLoader4Line } from '@remixicon/react';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react'

const StatusEditMode = ({ item, onClose }: {
    item: StatusModelInterface,
    onClose: () => void,
}) => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<{
        name: string,
        color: string,
    }>({
        color: item.color,
        name: item.name,
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        setInProgress(true)
        setError(null);
        try {
            const requestData: UpdateStatusApiRouteRequestData = {
                ...formData,
                statusId: item.statusId,
            }

            await axios.post('/api/status/update', requestData);
        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setInProgress(false)
        onClose();
    }

    if (error) {
        return (
            <ErrorTemplate
                error={error}
            />
        )
    }

    return (
        <form
            className='bg-background-2 py-2 px-4 flex items-center gap-5 justify-between rounded-2xl'
            onSubmit={handleFormSubmit}
        >
            <div
                className='flex items-center gap-3'
            >
                <input
                    className='min-h-2.5 min-w-2.5 rounded-full'
                    type='color'
                    value={formData.color}
                    onChange={handleInputChange}
                    name='color'
                />
                <input
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    name='name'
                />
            </div>
            <div
                className='flex items-center gap-2'
            >
                <button
                    className='min-w-max py-2 px-4 rounded-2xl bg-foreground text-background cursor-pointer'
                >
                    Save
                </button>

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
        </form>
    )
}

export default StatusEditMode