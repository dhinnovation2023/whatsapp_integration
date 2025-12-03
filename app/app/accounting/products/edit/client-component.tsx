'use client';

import { DeleteOneProductRequestData } from '@/app/api/accounting/products/delete-one/route';
import { GetOneProductRequestData } from '@/app/api/accounting/products/get-one/route';
import ErrorTemplate from '@/components/ui-elements/error-template';
import InputGroup, { InputGroupDataInterface } from '@/components/ui/input-group'
import { UpdateOneProductRequestData } from '@/functions/accounting/products/update-one-product';
import { handleCatchBlock } from '@/functions/common';
import DashboardLayout from '@/layouts/dashboard'
import { ProductsModelInterface, ProductsType } from '@/models/accounting/products';
import { RiLoader4Line } from '@remixicon/react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const EditProductPageClient = () => {

    const [loadingProduct, setLoadingProduct] = useState<boolean>(false);

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<{
        name: string,
        price: string,
        productType: ProductsType,
    }>({
        name: '',
        price: '',
        productType: "product",
    });

    const fieldsData: InputGroupDataInterface[] = [
        {
            label: "Product Name",
            name: "name",
            onChange: handleInputChange,
            placeholder: "Product Name",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData["name"],
        },
        {
            label: "Price",
            name: "price",
            onChange: handleInputChange,
            placeholder: "Price",
            disabled: inProgress,
            required: true,
            type: "number",
            value: formData["price"],
        },
        {
            label: "Product Type",
            name: "productType",
            onChange: handleInputChange,
            placeholder: "Select Type",
            disabled: inProgress,
            options: [
                {
                    label: "Product",
                    value: "product",
                },
                {
                    label: "Service",
                    value: "service",
                },
            ],
            required: true,
            type: "select",
            value: formData["productType"],
        }
    ]

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

            for (const field of fieldsData) {
                if (field.required === true && !field.value) {
                    throw new Error(`${field.label} field is required.`);
                }
            }

            const objectId = searchParams.get('id');

            if (!objectId) {
                throw new Error("_id is required.");
            }

            const requestData: UpdateOneProductRequestData = {
                _id: objectId,
                name: formData.name,
                price: Number(formData.price),
                productType: formData.productType,
            }

            await axios.post('/api/accounting/products/update-one', requestData);

            router.push('/app/accounting/products')

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
    }

    useEffect(() => {
        (async () => {
            setLoadingProduct(true);
            try {

                const objectId = searchParams.get('id');

                if (!objectId) {
                    throw new Error("ObjectId not found!");
                }

                const requestData: GetOneProductRequestData = {
                    objectId,
                }
                const { data } = await axios.post<ProductsModelInterface>('/api/accounting/products/get-one', requestData)
                setFormData({
                    name: data.name,
                    price: data.price.toString(),
                    productType: data.productType,
                })
            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
            setLoadingProduct(false);
        })()
    }, [searchParams])

    return (
        <DashboardLayout
            pageTitle='Edit Product'
        >
            <div
                className='max-w-[800px] w-full mx-auto py-10'
            >
                {
                    loadingProduct ? (
                        <div
                            className='flex items-center gap-2'
                        >
                            <RiLoader4Line
                                size={20}
                                className='animate-spin'
                            />
                            <p>Loading Product</p>
                        </div>
                    ) : (
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
                                className='flex items-center gap-3'
                            >
                                <button
                                    className="py-3 px-4 rounded-2xl bg-foreground text-background flex items-center gap-3"
                                >
                                    {
                                        inProgress && (
                                            <RiLoader4Line
                                                size={20}
                                                className="animate-spin"
                                            />
                                        )
                                    }

                                    <p>{inProgress ? "Loading..." : "Save Changes"}</p>

                                </button>

                                <button
                                    type='button'
                                    className='py-3 px-4 rounded-2xl bg-red-600 text-white cursor-pointer'
                                    onClick={async () => {
                                        try {
                                            const objectId = searchParams.get('id');
                                            if (!objectId) {
                                                throw new Error("Object Id is required.")
                                            }

                                            const confirm = window.confirm(`Please confirm deleting ${formData.name}. Please remove the product from invoices/quotations. otherwise the invoice/quotations will be unaccessable.`)

                                            if (!confirm) {
                                                return;
                                            }

                                            const requestData: DeleteOneProductRequestData = {
                                                objectId,
                                            }

                                            await axios.post('/api/accounting/products/delete-one', requestData);

                                            router.push('/app/accounting/products');

                                        } catch (err) {
                                            const message = handleCatchBlock(err);
                                            setError(message);
                                        }
                                    }}
                                >Delete Product</button>

                            </div>

                        </form>
                    )
                }

                {
                    error && (
                        <ErrorTemplate
                            error={error}
                        />
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default EditProductPageClient