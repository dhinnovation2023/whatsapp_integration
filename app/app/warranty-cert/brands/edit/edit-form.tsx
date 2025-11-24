'use client';
import ErrorTemplate from '@/components/ui-elements/error-template'
import TiptapEditor from '@/components/ui-elements/rich-textarea'
import InputGroup, { InputGroupDataInterface } from '@/components/ui/input-group'
import { handleCatchBlock } from '@/functions/common';
import { UpdateWarrantyBrandRequestData } from '@/functions/warranty/update-one-brand';
import DashboardLayout from '@/layouts/dashboard'
import { RiLoader4Line } from '@remixicon/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react'

const EditWarrantyBrandPage = (data: {
    name: string,
    content: string,
    objectId: string,
}) => {

    const router = useRouter();

    const [inProgress, setInProgress] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [clearContent, setClearContent] = useState<number>(0);
    const [formData, setFormData] = useState<{
        name: string,
        content: string,
    }>(data);

    const fieldsData: InputGroupDataInterface[] = [
        {
            label: "Name",
            name: "name",
            placeholder: "Enter brand name",
            onChange: handleInputChange,
            disabled: inProgress,
            required: true,
            value: formData["name"],
            type: "text",
        },
    ]

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    async function handleFormSubmit (event: FormEvent) {

        event.preventDefault();

        setInProgress(true);
        setError(null);

        try {
            const requestData: UpdateWarrantyBrandRequestData = {
                ...formData,
                objectId: data.objectId,
            }

            await axios.post('/api/warranty/brand/update-one', requestData);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        router.push('/app/warranty-cert/brands');

        setInProgress(false);
    }

    return (
        <DashboardLayout
            pageTitle='Add Warranty Brands'
        >
            <div
                className='max-w-[800px] w-full mx-auto py-10'
            >
                <form
                    className='space-y-6'
                    onSubmit={handleFormSubmit}
                >
                    {fieldsData.map((field, index) => (
                        <InputGroup
                            {...field}
                            key={index}
                        />
                    ))}

                    <div
                        className='space-y-2'
                    >
                        <p
                            className='text-sm font-semibold'
                        >
                            Brand Content
                            &nbsp;<span className='text-red-600'>*</span>
                        </p>
                        <TiptapEditor
                            value={data.content}
                            setValue={(html) => {
                                setFormData(prev => ({
                                    ...prev,
                                    content: html,
                                }))
                            }}
                            reset={clearContent}
                            disableEmptyOnClick={true}
                        />
                    </div>

                    <div>
                        <button
                            className='py-3 px-5 bg-foreground text-background rounded-2xl cursor-pointer flex items-center gap-2'
                        >
                            {
                                inProgress && (
                                    <RiLoader4Line
                                        size={20}
                                        className='animate-spin'
                                    />
                                )
                            }
                            <p>{inProgress ? "Saving..." : "Save Brand"}</p>
                        </button>
                    </div>

                    {
                        error && (
                            <ErrorTemplate
                                error={error}
                            />
                        )
                    }

                </form>
            </div>
        </DashboardLayout>
    )
}

export default EditWarrantyBrandPage