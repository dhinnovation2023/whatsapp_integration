'use client';

import { UpdateTeamDataApiRouteRequestDataInterface } from '@/app/api/teams/update/route';
import ErrorTemplate from '@/components/ui-elements/error-template';
import InputGroup from '@/components/ui/input-group';
import { handleCatchBlock } from '@/functions/common';
import DashboardLayout from '@/layouts/dashboard'
import { TeamMembersModelInterface } from '@/models/team-member';
import { RiLoader4Line } from '@remixicon/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, InputHTMLAttributes, useEffect, useState } from 'react'

const EditTeamMembersClient = () => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        labelColor: string,
    }>({
        name: '',
        email: '',
        labelColor: '',
    });

    const fieldsData: {
        label: string,
        placeholder: string,
        value: string,
        name: string,
        onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
        type: InputHTMLAttributes<HTMLInputElement>["type"],
    }[] = [
            {
                label: "Name",
                placeholder: "Enter name",
                value: formData.name,
                onChange: handleInputChange,
                name: 'name',
                type: "text"
            },
            {
                label: "Email",
                placeholder: "Enter email address",
                value: formData.email,
                onChange: handleInputChange,
                name: 'email',
                type: "email"
            },
            {
                label: "Label Color",
                placeholder: "Label color",
                value: formData.labelColor,
                onChange: handleInputChange,
                name: 'labelColor',
                type: "color",
            },
        ];

    useEffect(() => {
        (async () => {
            setInitialLoading(true);
            try {

                const userId = searchParams.get('userId');

                if (!userId) {
                    throw new Error("User id not found!");
                }

                const requestData: {
                    userId: string,
                } = {
                    userId: userId,
                }

                const {
                    data: userData,
                } = await axios.post<TeamMembersModelInterface>('/api/teams/get-one-by-id', requestData)

                if (!userData) {
                    throw new Error("user data not found!");
                }

                setFormData({
                    name: userData.name,
                    email: userData.email,
                    labelColor: userData.labelColor || '',
                })

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
            setInitialLoading(false);
        })()
    }, [searchParams])

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        setError(null);
        setInProgress(true);

        try {

            for (const [key, value] of Object.entries(formData)) {
                if (!value) {
                    throw new Error(`Field ${key} is required`);
                }
            }

            const userId = searchParams.get('userId');

            if (!userId) {
                throw new Error("user id not found!");
            }

            const requestData: UpdateTeamDataApiRouteRequestDataInterface = {
                ...formData,
                userId,
            }

            await axios.post('/api/teams/update', requestData);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message)
        }

        setInProgress(false);
    }

    return (
        <DashboardLayout
            pageTitle='Edit Team'
        >
            {
                initialLoading && (
                    <div
                        className='flex items-center gap-3'
                    >
                        <RiLoader4Line
                            size={20}
                            className='animate-spin'
                        />
                        <p>Loading user details</p>
                    </div>
                )
            }
            {
                !initialLoading && (
                    <div>
                        <form
                            className='max-w-[400px] bg-background p-5 space-y-4'
                            onSubmit={handleFormSubmit}
                        >
                            {fieldsData.map((field) => (
                                <InputGroup
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={field.onChange}
                                    type={field.type}
                                    value={field.value}
                                />
                            ))}

                            <button
                                className='bg-theme-primary py-3 px-4 rounded-xl text-background'
                            >
                                {inProgress ? "Saving..." : "Save changes"}
                            </button>
                        </form>
                    </div>
                )
            }

            {
                error && (
                    <ErrorTemplate
                        error={error}
                    />
                )
            }
        </DashboardLayout>
    )
}

export default EditTeamMembersClient