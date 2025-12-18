'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import InputGroup, { InputGroupDataInterface } from '@/components/ui/input-group';
import { handleCatchBlock } from '@/functions/common';
import { UpdateCompletionCertCustomerRequestData } from '@/functions/completion-cert/customers/update-one';
import DashboardLayout from '@/layouts/dashboard';
import { CompletionCertCustomersModelInterface } from '@/models/completion-cert/customers';
import { RiArrowLeftSLine, RiCloseLine, RiLoader4Line, RiUploadLine } from '@remixicon/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';

const EditServiceCustomerForm = ({ data, brands }: {
    data: CompletionCertCustomersModelInterface,
    brands: {
        name: string,
        id: string,
    }[]
}) => {

    const router = useRouter();

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filesLoading, setFilesLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<UpdateCompletionCertCustomerRequestData>(() => {
        return ({
            ...data,
            uploads: [],
        })
    });
    const fileUploadInputRef = useRef<HTMLInputElement>(null);

    const fieldsData: InputGroupDataInterface[] = [
        {
            label: "Invoice No.",
            name: "invoiceNo",
            placeholder: "Enter Invoice No.",
            type: "text",
            required: true,
            value: formData.invoiceNo,
            onChange: handleInputOnchange,
            disabled: inProgress,
        },
        {
            label: "Brand",
            name: "brand",
            placeholder: "Select Brand",
            onChange: handleInputOnchange,
            disabled: inProgress,
            required: true,
            type: "select",
            value: formData.brand,
            options: brands.map(brand => ({ label: brand.name, value: brand.id }))
        },
        {
            label: "Product name",
            name: 'productName',
            onChange: handleInputOnchange,
            placeholder: "Enter Product Name",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.productName,
        },
        {
            label: "Customer Type",
            name: "customerType",
            onChange: handleInputOnchange,
            placeholder: "Select Customer Type",
            disabled: inProgress,
            required: true,
            type: "select",
            value: formData.customerType,
            options: [
                { label: 'Client', value: 'client' },
                { label: 'Contractor', value: 'contractor' },
            ],
        },
        {
            label: "Customer Name",
            name: "customerName",
            onChange: handleInputOnchange,
            placeholder: "Enter Customer Name",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.customerName,
        },
        {
            label: "Phone No.",
            name: "phone",
            onChange: handleInputOnchange,
            placeholder: "97150****76",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.phone,
        },
        {
            label: "Location",
            name: "location",
            onChange: handleInputOnchange,
            placeholder: "Enter Location",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.location,
        },
        {
            label: "Villa No.",
            name: "villaNo",
            onChange: handleInputOnchange,
            placeholder: "Enter Villa No.",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.villaNo,
        },
        {
            label: "Date of Completion",
            name: "dateOfCompletion",
            onChange: handleInputOnchange,
            placeholder: "Date of Completion",
            disabled: inProgress,
            required: true,
            type: "date",
            value: formData.dateOfCompletion instanceof Date ? `${formData.dateOfCompletion.getFullYear()}-${(formData.dateOfCompletion.getMonth() + 1).toString().padStart(2, '0')}-${formData.dateOfCompletion.getDate().toString().padStart(2, '0')}` : undefined,
        },
        {
            label: "Service count",
            name: "nthService",
            onChange: handleInputOnchange,
            placeholder: "Service count",
            type: "number",
            required: true,
            value: formData.nthService.toString(),
        },
    ]

    useEffect(() => {
        (async () => {
            setFilesLoading(true);
            try {
                for (const path of data.uploads) {
                    const response = await axios.get<ArrayBuffer>(`/api/whatsapp/fetch-files/${encodeURIComponent(path)}`, {
                        responseType: "arraybuffer",
                    });

                    if (!response.data) {
                        throw new Error("Image data not found!");
                    }

                    const mimeType = response.headers["Content-Type"]?.toString();
                    const filename = uuid();
                    const buffer = Buffer.from(response.data);

                    const newFile = new File(
                        [buffer],
                        filename,
                        {
                            type: mimeType,
                        }
                    )

                    setFormData(prev => ({
                        ...prev,
                        uploads: [...prev.uploads, newFile]
                    }))

                }

            } catch (err) {
                const message = handleCatchBlock(err);
                console.error(message);
            }
            setFilesLoading(false);
        })()
    }, [data])

    function handleInputOnchange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        if (event.target instanceof HTMLInputElement && event.target.type === "date" && event.target.valueAsDate) {
            setFormData(prev => ({
                ...prev,
                [event.target.name]: event.target.type === "date" ? event.target.valueAsDate : new Date(),
            }))
            return;
        }

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

            for (const field of fieldsData) {
                if (field.required && !field.value) {
                    throw new Error(`Required field ${field.label} is empty`);
                }
            }

            const requestData = new FormData();

            for (const [key, value] of Object.entries(formData)) {

                if (value && typeof value === "string") {
                    requestData.set(key, value);
                    continue;
                }

                if (value && typeof value === "number") {
                    requestData.set(key, value.toString())
                }

                if (value && value instanceof Date) {
                    requestData.set(key, value.getTime().toString());
                }

                if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
                    for (const file of value) {
                        requestData.append(key, file);
                    }
                }
            }

            await axios.post('/api/completion-cert/customers/update-one', requestData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            router.push('/app/completion-cert');

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setInProgress(false);
    }

    return (
        <DashboardLayout
            pageTitle='Edit Completion'
        >
            <div
                className='max-w-[800px] w-full mx-auto py-10 px-3 space-y-10'
            >
                <button
                    className='flex items-center gap-1 cursor-pointer'
                    onClick={() => {
                        router.back();
                    }}
                >
                    <RiArrowLeftSLine
                        size={25}
                    />
                    <p>Go Back</p>
                </button>
                <form
                    className='space-y-3'
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
                        <input
                            type="file"
                            accept='image/*'
                            multiple
                            hidden
                            ref={fileUploadInputRef}
                            onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                    const files: File[] = []
                                    for (const file of event.target.files) {
                                        files.push(file);
                                    }

                                    setFormData(prev => ({
                                        ...prev,
                                        uploads: files,
                                    }))
                                }
                            }}
                        />

                        <button
                            className='flex items-center gap-2 py-3 px-5 rounded-2xl bg-background shadow-2xl cursor-pointer'
                            type='button'
                            onClick={() => {
                                if (fileUploadInputRef.current) {
                                    fileUploadInputRef.current.click();
                                }
                            }}
                        >
                            <RiUploadLine
                                size={20}
                            />
                            <p>Upload Files</p>
                        </button>

                        <div
                            className='flex items-start gap-2'
                        >
                            {formData.uploads.map((file, index) => (
                                <div
                                    key={index}
                                    className='group relative max-w-[150px] min-h-[150px]'
                                >
                                    <Image
                                        alt='Upload'
                                        src={URL.createObjectURL(file)}
                                        width={200}
                                        height={200}
                                        className='w-full min-h-[150px] object-cover border border-foreground'
                                    />
                                    <button
                                        type='button'
                                        className='bg-foreground/50 items-center justify-center w-full h-full absolute top-0 left-0 hidden group-hover:flex cursor-pointer'
                                        onClick={() => {
                                            setFormData(prev => {
                                                const outputUploads = prev.uploads.filter((file, idx) => idx !== index);
                                                return ({
                                                    ...prev,
                                                    uploads: outputUploads,
                                                })
                                            })
                                        }}
                                    >
                                        <RiCloseLine
                                            size={20}
                                            className='w-[30px] h-[30px] bg-red-500 text-white p-1 rounded-full'
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {
                            filesLoading && (
                                <div
                                    className='flex items-center gap-2'
                                >
                                    <RiLoader4Line
                                        size={20}
                                        className='animate-spin'
                                    />
                                    <p>Loading Images</p>
                                </div>
                            )
                        }

                    </div>

                    {
                        error && (
                            <ErrorTemplate
                                error={error}
                            />
                        )
                    }

                    <div
                        className='flex items-center gap-3'
                    >
                        <button
                            className='py-3 px-4 bg-foreground text-background rounded-2xl cursor-pointer'
                        >
                            {inProgress ? "Loading..." : "Save Changes"}
                        </button>
                        <button
                            type='button'
                            className='py-3 px-4 bg-red-600 text-background rounded-2xl cursor-pointer'
                            onClick={async () => {
                                const confirm = window.confirm("Please confirm deletion");
                                if (confirm) {
                                    await axios.post('/api/completion-cert/customers/delete-one', { objectId: data._id });
                                    router.push('/app/completion-cert')
                                }
                            }}
                        >
                            Delete Warranty
                        </button>
                    </div>

                </form>
            </div>
        </DashboardLayout>
    )
}

export default EditServiceCustomerForm