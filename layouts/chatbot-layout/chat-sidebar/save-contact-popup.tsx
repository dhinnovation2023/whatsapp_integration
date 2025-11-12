'use client';

import InputGroup from '@/components/ui/input-group'
import { handleCatchBlock } from '@/functions/common';
import { UpdateContactNameRequestData } from '@/functions/whatsapp/updateContactName';
import { TeamMembersModelInterface } from '@/models/team-member';
import { RiCloseLargeLine } from '@remixicon/react';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

const SaveContactPopup = ({
    defaultName,
    onClose,
    phone,
}: {
    defaultName: string,
    onClose: () => void,
    phone: string,
}) => {

    const [name, setName] = useState<string>(defaultName);
    const [users, setUsers] = useState<TeamMembersModelInterface[]>([]);

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isAssignLoading, setIsAssignLoading] = useState<boolean>(false);
    const [savingName, setSavingName] = useState<boolean>(false);

    async function handleAssignChange (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        setIsAssignLoading(true);
        try {

            const value = e.target.value;

            const requestData = {
                userId: value,
                phone,
            }

            await axios.post("/api/whatsapp/update-assigned", requestData);

            onClose();

        } catch (err) {
            const message = handleCatchBlock(err);
            window.alert(message);
        }

        setIsAssignLoading(false);
    }

    async function updateContactName () {
        setSavingName(true);
        
        try {

            const requestData: UpdateContactNameRequestData = {
                newName: name,
                phone,
            }

            await axios.post("/api/whatsapp/update-name", requestData);

            onClose();

        } catch (err) {
            const message = handleCatchBlock(err);
            window.alert(message);
        }
        
        setSavingName(false)
    }

    useEffect(() => {
        (async () => {
            setisLoading(true)

            try {

                const {
                    data
                } = await axios.post<TeamMembersModelInterface[]>('/api/teams/get');

                setUsers(data);


            } catch (err) {
                const message = handleCatchBlock(err);
                console.log(message)
            }

            setisLoading(false);
        })()
    }, [])

    return (
        <div
            className='fixed top-0 left-0 w-full h-full bg-foreground/30 z-50 pt-10'
        >
            <div
                className='max-w-[400px] min-h-[200px] bg-background m-auto rounded-2xl py-5 px-5'
            >
                <div
                    className='flex items-center justify-between mb-3 pb-3 border-b border-stroke-light'
                >
                    <h2
                        className='text-xl font-black'
                    >Settings</h2>
                    <button
                        className='shrink-0'
                        onClick={() => onClose()}
                    >
                        <RiCloseLargeLine
                            size={20}
                        />
                    </button>
                </div>

                <p
                    className='bg-stroke-light/30 rounded-2xl border border-stroke-light mb-4 p-1.5 px-3'
                ><span className='font-semibold'>Phone:</span> {phone}</p>

                <form
                    className='space-y-3 pb-5 mb-5 border-b border-stroke-light'
                >
                    <h3
                        className='font-bold text-foreground/80'
                    >Save Contact</h3>
                    <InputGroup
                        label='Contact name'
                        name='name'
                        placeholder='Contact name'
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        value={name}
                        required={true}
                    />

                    <button
                        className='py-3 px-4 bg-theme-primary rounded-2xl text-white cursor-pointer'
                        disabled={savingName}
                        onClick={updateContactName}
                    >
                        {savingName ? "Saving..." : "Save Contact"}
                    </button>

                </form>

                <div
                    className='space-y-3'
                >
                    <h3
                        className='font-bold text-foreground/80'
                    >Assign users</h3>

                    {
                        isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <InputGroup
                                label='Assign team'
                                name='assign'
                                onChange={handleAssignChange}
                                placeholder='Assign team'
                                type='select'
                                options={users.map((user) => ({ label: user.name, value: user.userId }))}
                            />
                        )
                    }

                    {
                        isAssignLoading && (
                            <p>Loading...</p>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default SaveContactPopup